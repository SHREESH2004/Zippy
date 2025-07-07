import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_AI_KEY;
if (!apiKey) {
  console.error('Google AI API key is missing.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  responseMimeType: 'application/json',
  temperature: 0.4,
  systemInstruction: `
You are Zippy, the AI shopping assistant for Zippy Stores. Help users find products from the catalog. Never hallucinate. Always filter based on:
- category: Men, Women, Unisex
- brand
- keywords
- price (if provided)

If nothing is found, politely say so.

Respond ONLY in a JSON structure:
{
  "message": "string",
  "products": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "price": number,
      "salePrice": number,
      "image": "url"
    }
  ]
}

Return at most 5 products. Format clearly.
If the query is generic or a greeting (e.g. "hello", "what is Zippy?"), just respond with a friendly message about Zippy and an empty products list.
`,
});

// 🧠 Basic heuristics to detect generic questions or greetings
const isGeneralQuery = (prompt) => {
  const generalKeywords = [
    'hello', 'hi', 'hey', 'help', 'how are you', 'how can you help',
    'what is zippy', 'who are you', 'about you', 'about zippy', 'zippy?'
  ];
  const promptLower = prompt.toLowerCase();
  return generalKeywords.some((keyword) => promptLower.includes(keyword));
};

export const getZippyChatResponse = async (prompt) => {
  try {
    // 🤖 Handle general questions without product filtering
    if (isGeneralQuery(prompt)) {
      return {
        message:
          "👋 Hi! I'm Zippy, your smart shopping assistant. I help you find the perfect products across our Men, Women, and Unisex collections. You can ask me things like 'Show me casual shoes under ₹1500' or 'Nike T-shirts for Men'.",
        products: [],
      };
    }

    // 🛍 Fetch all available products
    const { data } = await axios.get('http://localhost:3000/admin/products/products/all');
    const allProducts = data?.data || [];

    // 💸 Attempt to extract price filter
    const priceMatch = prompt.match(/(?:₹|\$)?\s*(\d+)\s*(?:₹|\$)?/);
    const extractedMaxPrice = priceMatch ? parseInt(priceMatch[1]) : undefined;

    // 🧠 Use Gemini to classify filters from prompt
    const classifyPrompt = `Extract filters from this query: "${prompt}". Respond only in valid JSON like:
{
  "category": "optional",
  "brand": "optional",
  "maxPrice": ${extractedMaxPrice || "optional"},
  "keywords": ["list", "of", "keywords"]
}`;

    const classification = await model.generateContent(classifyPrompt);
    let rawText = classification.response.text().trim();
    if (rawText.startsWith('```json')) rawText = rawText.replace(/^```json/, '').replace(/```$/, '').trim();
    else if (rawText.startsWith('```')) rawText = rawText.replace(/^```/, '').replace(/```$/, '').trim();

    const filters = JSON.parse(rawText);

    // ⛔ Normalize optional fields
    if (filters.brand === 'optional' || filters.brand === null) filters.brand = undefined;
    if (filters.category === 'optional' || filters.category === null) filters.category = undefined;
    if (filters.maxPrice === 'optional' || filters.maxPrice === null) filters.maxPrice = undefined;
    if (!Array.isArray(filters.keywords)) filters.keywords = [];

    // 🔍 Filter products
    const filteredProducts = allProducts.filter((product) => {
      const matchCategory =
        !filters.category || product.category.toLowerCase() === filters.category.toLowerCase();
      const matchBrand =
        !filters.brand || product.brand.toLowerCase().includes(filters.brand.toLowerCase());
      const matchPrice = !filters.maxPrice || product.salePrice <= filters.maxPrice;
      const matchKeywords =
        filters.keywords.length === 0 ||
        filters.keywords.some((keyword) =>
          product.title.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase())
        );

      return matchCategory && matchBrand && matchPrice && matchKeywords;
    });

    // 🚫 No matches found
    if (filteredProducts.length === 0) {
      return {
        message:
          "😕 Sorry, I couldn't find any products matching your request. Try changing your category, brand, or price range!",
        products: [],
      };
    }

    // ✅ Return top 5 matches
    const topProducts = filteredProducts.slice(0, 5).map((prod) => ({
      _id: prod._id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
      salePrice: prod.salePrice,
      image: prod.image,
    }));

    return {
      message: "🎉 Here are some products you might like:",
      products: topProducts,
    };
  } catch (error) {
    console.error('Zippy AI Service Error:', error.message);
    return {
      message: '🚨 Oops! Something went wrong while searching for products.',
      products: [],
    };
  }
};
