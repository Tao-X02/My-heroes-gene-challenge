import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuthState } from "react-firebase-hooks/auth";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from './DB/firebaseconnection';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            navigate(`/Dashboard`);
        }
    }, [user, loading]);



    

    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', flexDirection: 'column', justifyContent: 'center' }}>
            <form >
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: 20 }}
                />
                <Button color="error" variant="contained" fullWidth style={{ marginBottom: 20 }}>
                    Login with Google
                </Button>
                <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginBottom: 20 }}
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >
                    Submit
                </Button>
                <Button color="success" variant="contained" fullWidth type="submit">
                    <Link style={{ textDecoration: 'none', color: 'white' }} to="/signup">
                        Don't have an account? Sign up here
                    </Link>
                </Button>
            </form>
        </div>
    )
}