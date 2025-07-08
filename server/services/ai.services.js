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
- description (if given explicitly)
- category, brand, price (optional)
Respond ONLY in:
{
  "message": "string",
  "products": [
    {
      "title": "string",
      "description": "string",
      "price": number,
      "salePrice": number,
      "image": "url"
    }
  ]
}
Return at most 5 products.
If query is like "hello", respond only: "Hi, I'm Zippy AI."
`,
});

// Greeting detection
const isGreetingQuery = (prompt) => {
  const greetings = ['hello', 'hi', 'hey', 'zippy?', 'what is zippy', 'who are you'];
  return greetings.some((g) => prompt.toLowerCase().includes(g));
};

// Check for explicit description filter
const isDescriptionPrompt = (prompt) => {
  return prompt.toLowerCase().startsWith('description:');
};

export const getZippyChatResponse = async (prompt) => {
  try {
    if (isGreetingQuery(prompt)) {
      return {
        message: "Hi, I'm Zippy AI.",
        products: [],
      };
    }

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const { data } = await axios.get(`${SERVER_URL}/admin/products/products/all`);

    const allProducts = data?.data || [];

    // Handle "description: football studs" prompt
    if (isDescriptionPrompt(prompt)) {
      const descValue = prompt.slice('description:'.length).trim().toLowerCase();
      const filtered = allProducts.filter((product) =>
        product.description.toLowerCase().includes(descValue)
      );

      if (filtered.length === 0) {
        return {
          message: "😕 Couldn't find any products with that in the description.",
          products: [],
        };
      }

      const top = filtered.slice(0, 5).map((p) => ({
        title: p.title,
        description: p.description,
        price: p.price,
        salePrice: p.salePrice,
        image: p.image,
      }));

      return {
        message: "🔍 Products found by description:",
        products: top,
      };
    }

    // Otherwise, use Gemini to extract filters
    const priceMatch = prompt.match(/(?:₹|\$)?\s*(\d+)\s*(?:₹|\$)?/);
    const extractedMaxPrice = priceMatch ? parseInt(priceMatch[1]) : undefined;

    const classifyPrompt = `Extract filters from this query: "${prompt}". Respond in JSON:
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
    if (!Array.isArray(filters.keywords)) filters.keywords = [];
    if (filters.brand === 'optional' || !filters.brand) filters.brand = undefined;
    if (filters.category === 'optional' || !filters.category) filters.category = undefined;
    if (filters.maxPrice === 'optional' || !filters.maxPrice) filters.maxPrice = undefined;

    const filteredProducts = allProducts.filter((product) => {
      const matchCategory = !filters.category || product.category.toLowerCase() === filters.category.toLowerCase();
      const matchBrand = !filters.brand || product.brand.toLowerCase().includes(filters.brand.toLowerCase());
      const matchPrice = !filters.maxPrice || product.salePrice <= filters.maxPrice;
      const matchKeywords = filters.keywords.every((kw) =>
        product.title.toLowerCase().includes(kw.toLowerCase()) ||
        product.description.toLowerCase().includes(kw.toLowerCase())
      );
      return matchCategory && matchBrand && matchPrice && matchKeywords;
    });

    if (filteredProducts.length === 0) {
      return {
        message: "😕 No matching products found. Try different filters.",
        products: [],
      };
    }

    const topProducts = filteredProducts.slice(0, 5).map((prod) => ({
      title: prod.title,
      description: prod.description,
      price: prod.price,
      salePrice: prod.salePrice,
      image: prod.image,
    }));

    return {
      message: "🎯 Products matching your query:",
      products: topProducts,
    };
  } catch (err) {
    console.error("Zippy AI Error:", err.message);
    return {
      message: "🚨 Something went wrong. Try again later.",
      products: [],
    };
  }
};
