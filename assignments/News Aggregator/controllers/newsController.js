// src/controllers/newsController.js
const axios = require('axios');
const apiKey = 'b5d63f5e441246258a13a141590184a6'; 
const User = require('../models/user');


async function getUserPreferences(req, res) {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.json(user.userPreferences || []);
  } catch (error) {
    res.status(500).send('Error fetching user preferences');
  }
}

async function updateUserPreferences(req, res) {
  const { email } = req.user;
  const userPreferences = req.body.preferences || [];
  console.log(userPreferences)
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { userPreferences },
      { new: true }
    );
    console.log(user)
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.send('Preferences updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user preferences');
  }
}

async function getNewsArticles(req, res) {
  console.log(req)

  const { email } = req.user;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.userPreferences || user.userPreferences.length === 0) {
      res.status(400).send('No preferences set');
      return;
    }
    const sources = user.userPreferences;
    const randomIndex = Math.floor(Math.random() * sources.length);
    const randomValue = sources[randomIndex];
    const url = `https://newsapi.org/v2/top-headlines?sources=${randomValue}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      res.json(response.data.articles);
    } catch (error) {
      res.status(500).send('Error fetching news articles');
    }
  } catch (error) {
    res.status(500).send('Error fetching user preferences');
  }
}

module.exports = {
  getUserPreferences,
  updateUserPreferences,
  getNewsArticles,
};
