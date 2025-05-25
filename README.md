# TradeMo - Virtual Stock Trading Platform

A virtual investment web platform based on Firebase authentication and real-time stock data (yfinance). Each user can buy/sell US stocks with virtual assets after logging in.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.12 or higher)
- Firebase project

### Frontend Setup

1. Create a Firebase project and register a web app
2. Create a `.env` file in the frontend directory and enter Firebase configuration:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

3. Install frontend dependencies and start the development server:

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

1. Download the service account private key from your Firebase project and save it as `backend/firebase-credentials.json`
2. Install backend dependencies and start the development server:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e .
uvicorn main:app --reload
```

## Key Features

- Login/signup through Firebase authentication
- Virtual asset account per user (initial $100,000)
- US stock data retrieval through yfinance
- Stock buy/sell functionality
- Real-time portfolio updates

## Firebase Security Rules

Apply the following security rules to Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can access
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User-specific portfolio collection
      match /portfolio/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      // User-specific transaction history collection
      match /transactions/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
    
    // Global user rankings (readable by all users, writable only by server)
    match /rankings/{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // Only server functions can write
    }
  }
}
``` 