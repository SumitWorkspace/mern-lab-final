import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, Paper, Typography, Button } from '@mui/material';
import Login from './Login';
import './App.css';

const Dashboard = () => (
  <div className="auth-bg">
    <Container maxWidth="md">
      <Paper className="glass-card" sx={{ p: 6, textAlign: 'center', mt: 10 }}>
        <Typography variant="h3" sx={{ color: '#1b5e20', mb: 2, fontWeight: 'bold' }}>
          Welcome back!
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Security Protocol Verified: JWT Session Active.
        </Typography>
        <Button 
          variant="contained" 
          color="success" 
          onClick={() => { localStorage.clear(); window.location.href="/"; }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;