const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 80;
const MARVEL_API_URL = "https://lereacteur-marvel-api.herokuapp.com";
const API_KEY = process.env.API_KEY;

app.use(cors());

// Route to fetch characters list
app.get("/characters", async (req, res) => {
  try {
    const { limit = 100, skip = 0, name } = req.query;
    const response = await axios.get(`${MARVEL_API_URL}/characters`, {
      params: { apiKey: API_KEY, limit, skip, name },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching characters." });
  }
});

// Route to fetch comics list
app.get("/comics", async (req, res) => {
  try {
    const { limit = 100, skip = 0, title } = req.query;
    const response = await axios.get(`${MARVEL_API_URL}/comics`, {
      params: { apiKey: API_KEY, limit, skip, title },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching comics." });
  }
});

// Route to fetch comic details
app.get("/comic/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;
    const response = await axios.get(`${MARVEL_API_URL}/comics/${comicId}`, {
      params: { apiKey: API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching comic details." });
  }
});

app.get("/comic/:characterId", async (req, res) => {
  try {
    const { characterId } = req.params;
    const response = await axios.get(`${MARVEL_API_URL}/comic/${characterId}`, {
      params: { apiKey: API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching comic character id details.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
