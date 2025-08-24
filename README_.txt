Urvann – Mini Plant Store (Frontend + Backend)

A simple full-stack app to browse and filter plants, built for the Urvann assignment.

What It Does
------------
- Shows a catalog of plants with name, price, categories, and stock availability.
- Lets users search and filter by category, stock, and price.
- Backend serves a REST API for plant data.
- Frontend provides a clean user interface using React and Vite.

Tech Stack
----------
Frontend: React 18, Vite, Axios
Backend: Node.js, Express, MongoDB (Mongoose), dotenv, cors
Database: MongoDB (local or Atlas)

Project Structure
-----------------
mini-plant-store/
  backend/
    server.js
    src/
      models/Plant.js
      routes/plants.js
      controllers/plants.js
    .env (from .env.example)
    package.json
  frontend/
    index.html
    src/
      App.jsx
      components/
      services/api.js
    vite.config.js
    package.json

How to Run
----------
1. Clone and Install
   git clone <your-repo-url> mini-plant-store
   cd mini-plant-store

   # backend setup
   cd backend
   npm install

   # frontend setup
   cd ../frontend
   npm install

2. Configure Environment (Backend)
   Copy .env.example to .env and set values:
   MONGODB_URI=mongodb://localhost:27017/urvann
   PORT=4000

3. Start Backend
   cd backend
   npm run dev
   Runs on http://localhost:4000

4. Start Frontend
   cd frontend
   npm run dev
   Runs on http://localhost:4000

   Open the browser at http://localhost:4000

API Endpoints
-------------
Base URL: http://localhost:4000/api/plants

GET /api/plants        - list all plants (supports filters: query, categories, price range, inStock)
GET /api/plants/:id    - get details of one plant
POST /api/plants       - add new plant (admin)
PUT /api/plants/:id    - update plant (admin)
DELETE /api/plants/:id - delete plant (admin)

Deployment
----------
Backend: Deploy to Render/Railway/Heroku. Set MONGODB_URI in environment variables.
Frontend: Deploy to Netlify/Vercel. Add VITE_API_BASE_URL=https://your-api.com/api.

Submission Checklist
--------------------
- GitHub repo with frontend and backend
- Working deployed backend and frontend
- README with setup and run instructions



