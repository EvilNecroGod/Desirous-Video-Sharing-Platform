Desirous - Video Sharing Platform

Desirous is a YouTube-like video sharing platform built with React.js and Node.js that allows users to upload, view, and comment on videos.

## Features

- Video upload with thumbnail support
- Video playback with native controls
- Comments system
- Responsive design for mobile and desktop
- Grid-based video listing
- Modern UI with Tailwind CSS

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone
cd desirous
```

2. Install dependencies for both frontend and backend:

```bash
# Install frontend dependencies
cd desirous-frontend
npm install

# Install backend dependencies
cd ../desirous-backend
npm install
```

3. Create an uploads directory in the backend folder:

```bash
mkdir uploads
```

## Configuration

1. Make sure MongoDB is running on your system
2. The backend will connect to MongoDB at: `mongodb://localhost:27017/videoshare`

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start
# Server will start on port 5000
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
# Frontend will start on port 5173
```

3. Open your browser and navigate to `http://localhost:5173`

## Technologies Used

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- CORS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
