# Credit Card Fraud Detection System

This project consists of a machine learning-based credit card fraud detection system with a Flask backend and React frontend.

## Project Structure

```
.
├── backend/           # Flask backend with ML model
├── frontend/         # React frontend application
└── Credit_Card_Fraud_Detection_Arjun.ipynb  # Jupyter notebook for model development
```

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn package manager

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend server will start on `http://localhost:5000`

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend application will start on `http://localhost:5173`

## Running the Application

1. Make sure both backend and frontend servers are running:

   - Backend should be running on `http://localhost:5000`
   - Frontend should be running on `http://localhost:5173`

2. Open your web browser and navigate to `http://localhost:5173`

## Available Scripts

### Backend

- `python app.py` - Starts the Flask server
- `python train_model.py` - Trains the ML model (if needed)

### Frontend

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build
- `npm run lint` - Runs ESLint for code quality checks

## Technologies Used

### Backend

- Flask
- Flask-CORS
- NumPy
- Pandas
- Joblib

### Frontend

- React
- TypeScript
- Material-UI
- Axios
- React Router
- Vite

## Notes

- The backend uses a pre-trained machine learning model for fraud detection
- The frontend is built with TypeScript and uses modern React practices
- CORS is enabled on the backend to allow frontend requests
- The application uses Material-UI for a consistent and modern UI design
