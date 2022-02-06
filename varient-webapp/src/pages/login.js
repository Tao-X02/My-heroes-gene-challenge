import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuthState } from "react-firebase-hooks/auth";
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import {
    auth,
    signInWithEmailAndPassword,
    LoginWithGoogle
} from './DB/firebaseconnection';
import { StyleSheet, css } from 'aphrodite/no-important';

import './styles/login.css';
import { FcGoogle } from "react-icons/fc";



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
        <div className='body'>
            <div className='box'>
                <div className="textlg">
                    Login
                </div>
                <Button color="error" variant="contained" fullWidth style={{ marginBottom: 20 }}
                    onClick={() => LoginWithGoogle()}>
                    <FcGoogle className='googlelogo' />Continue with google
                </Button>
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

                    <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginBottom: 20 }}
                        onClick={() => signInWithEmailAndPassword(email, password)}
                    >
                        Login
                    </Button>
                    <Button color="success" variant="contained" fullWidth >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/signup">
                            Don't have an account? Sign up here
                        </Link>
                    </Button>
                </form>
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    block: {
        boxShadow: "1px 3px 1px #9E9E9E"
    },
    block_layout: {
        position: 'relative',
        overflow: 'hidden',
        minHeight: 1024,
        flexGrow: 1
    }, txt: {
        color: "black",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Arial"
    }
});
