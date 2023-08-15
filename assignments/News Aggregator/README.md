# News API with MongoDB

The News API allows authenticated users to fetch news articles from multiple sources based on their preferences. It provides endpoints for user registration, login, setting news preferences, and fetching news articles.

## Installation

1. Clone the repository: `git clone https://github.com/yourusername/news-api-mongodb.git`
2. Navigate to the project directory: `cd news-api-mongodb`
3. Install dependencies: `npm install`

## Usage

1. Start MongoDB: Ensure MongoDB is running locally on `mongodb://localhost:27017`.
2. Start the server: `npm start`
3. The API server will run on `http://localhost:3000`

## API Endpoints

### User Registration

**POST** `/register`


**POST** `/signin`

Logs in a user and returns a JWT token.

### Retrieve News Preferences
**GET** `/api/preferences`

### Retrieves the news preferences for the logged-in user.

### Update News Preferences
**PUT**  `/news/preferences`
Updates the news preferences for the logged-in user.

Request Body:

json
Copy code
{
  "preferences": ["sports", "entertainment"]
}

###  Fetch News Articles
**GET** /news

Fetches news articles based on the logged-in user's preferences.

