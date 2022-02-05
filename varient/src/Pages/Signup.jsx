import React from 'react';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../App.css';
import { Link } from 'react-router-dom';

export default function Signup() {
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    type="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    style={{ marginBottom: 20 }}
                />
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
                <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    style={{ marginBottom: 20 }}
                />
                <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginBottom: 20 }}>
                    Sign up
                </Button>
            </form>
        </div>
    )
}