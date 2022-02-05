import React from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Login() {
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', flexDirection: 'column', justifyContent: 'center' }}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    style={{ marginBottom: 20 }}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    style={{ marginBottom: 20 }}
                />
                <Button color="error" variant="contained" fullWidth style={{ marginBottom: 20 }}>
                    Login with Google
                </Button>
                <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginBottom: 20 }}>
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