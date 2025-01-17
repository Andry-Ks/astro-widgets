const axios = require('axios');

module.exports = async (req, res) => {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const query = 'astronomy%20OR%20cosmos%20OR%20planets%20OR%20telescope%20OR%20asteroid%20OR%20aurora';

    try {
        const response = await axios.get
        (`https://gnews.io/api/v4/top-headlines?category=science&q=${query}&lang=en&max=25&apikey=${NEWS_API_KEY}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from News API');
    }
};