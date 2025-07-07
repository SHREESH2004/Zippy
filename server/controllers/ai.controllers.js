import { getZippyChatResponse } from "../services/ai.services.js";

export const handleZippyChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: 'Prompt is required.' });
    }

    const response = await getZippyChatResponse(prompt);
    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error('Error in handleZippyChat:', error.message);
    return res.status(500).json({ success: false, message: 'Failed to generate chatbot response.' });
  }
};
