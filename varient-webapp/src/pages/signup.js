import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import {
    auth,
    registerWithPatient,
    SignUPWithGoogle
} from './DB/firebaseconnection';
import { genderOptions } from "./DB/data";



import { FcGoogle } from "react-icons/fc";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 55;
const ITEM_PADDING_TOP = 15;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};




export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [geneMutation, setGeneMutation] = useState("");
    const [listofReports, setListofReports] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    var google = false;
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);


    const remember = () => {
        Swal.fire({
            title: 'Remember to fill in all the fields in order to register.',
            text: "Refill all fields",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        })
    }

    const pssincorrectremember = () => {
        Swal.fire({
            title: 'passwords do not match',
            text: "check passwords",
            icon: 'warning',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        })
    }

    const SignUp = () => {
        if (!email || !password || !name || !age || !gender) {
            remember();
        } if (password !== confirmPassword) {
            pssincorrectremember()
        } else {
            registerWithPatient(email, password, name, age, gender, geneMutation, listofReports);

        }
    };





    useEffect(() => {
        if (loading) return;
        if (user) {
            navigate(`/Dashboard`);
        }

    }, [user, loading]);



    return (
        <div className='body'>
            <div className='box'>
                <div className="textlg">
                    Sign Up
                </div>
                <Button color="error" variant="contained" fullWidth style={{ marginBottom: 20 }}
                    onClick={() => SignUPWithGoogle(age, gender, geneMutation, listofReports)}
                >
                    <FcGoogle className='googlelogo' /> Sign up with Google
                </Button>
                <form>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />
                    <TextField
                        fullWidth
                        id="age"
                        name="age"
                        label="Age"
                        type="Number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="demo-customized-select-label">Gender</InputLabel>
                        <Select
                            fullWidth
                            id="gender"

                            name="gender"
                            value={gender}

                            style={{ marginBottom: 20, }}
                            onChange={(e) => setGender(e.target.value)}
                            input={<OutlinedInput label="Tag" />}
                            MenuProps={MenuProps}
                        >
                            {genderOptions.map((gender) => (
                                <MenuItem
                                    key={gender}
                                    value={gender}
                                >
                                    {gender}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


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
                    <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />
                    <Button color="primary" variant="contained" fullWidth style={{ marginBottom: 20 }}
                        onClick={() => SignUp()}
                    >
                        Sign up
                    </Button>

                </form>
            </div>
        </div>
    )
}