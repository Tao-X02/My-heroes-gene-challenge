import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './styles/signup.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import {
    db,
    auth,
    SignInWithGoogle,
    UpdategoogleDB
} from './DB/firebaseconnection';
import { genderOptions } from "./DB/data";

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

export default function Setting() {
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [geneMutation, setGeneMutation] = useState("");
    const [listofReports, setListofReports] = useState("");
    const navigate = useNavigate();


    const EditDB = () => {
        UpdategoogleDB(uid, name, age, gender, geneMutation, listofReports);
    };

    const fetchUserdata = async () => {
        try {
            console.log("asdasd")
            const query = await db
                .collection("Patients")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
            setAge(data.age);
            setGender(data.gender);
            setListofReports(data.listofReports);
            setGeneMutation(data.geneMutation);
            setUid(data.uid);
        } catch (err) {
            console.error(err);
            alert("An error occurred while obtaining user data.");
        }
    };

    useEffect(() => {
        console.log("rendered");
        if (loading) return;
        fetchUserdata();
    }, [user, loading]);

    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
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
                <Button color="error" variant="contained" fullWidth style={{ marginBottom: 20 }}
                    onClick={EditDB()}
                >
                    Upload Info
                </Button>
            </form>
        </div>
    )
}