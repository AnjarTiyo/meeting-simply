# Meeting Simply

A web application for managing and processing meeting-related tasks.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd meeting-simply
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
OPENAI_API_KEY=your_openai_api_key
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000` (or the port specified in your server configuration).

## Project Structure

- `server.js` - Main server file
- `openai.js` - OpenAI API integration
- `prompt.js` - Prompt templates
- `pages/` - Frontend pages
- `public/` - Static assets
- `uploads/` - File upload directory

## Dependencies

- express - Web framework
- dotenv - Environment variable management
- multer - File upload handling
- openai - OpenAI API client
- nodemon - Development server with auto-reload

## License

ISC 