import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Container, TextField, Button, Typography, 
  Box, Alert, CircularProgress, Paper 
} from '@mui/material';
import axios from 'axios';
import './App.css'; 

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMsg({ type: '', text: '' });
    try {
      const res = await axios.post('http://localhost:5000/api/login', data);
      localStorage.setItem('token', res.data.token);
      setMsg({ type: 'success', text: 'Authentication successful!' });
      setTimeout(() => window.location.href = "/dashboard", 1200);
    } catch (err) {
      setMsg({ type: 'error', text: 'Access Denied: Invalid credentials.' });
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <Container maxWidth="xs">
        <Paper className="glass-card" sx={{ p: 4, mt: 15 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>
              EcoPortal
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Secure Environment Management
            </Typography>
          </Box>

          {msg.text && <Alert severity={msg.type} sx={{ mb: 2 }}>{msg.text}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              color="success"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              color="success"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 4, mb: 2, py: 1.5, bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;