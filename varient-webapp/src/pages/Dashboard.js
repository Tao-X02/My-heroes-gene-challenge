import React, { useEffect, useState, Component } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    logout,
} from './DB/firebaseconnection';
import { Link, useNavigate } from 'react-router-dom';
import {useDropzone} from 'react-dropzone';

export default function Dashboard() {
    const [files, setFiles] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map(file => Object.assign(FileReader, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    })

    useEffect(() => {
        console.log("rendered");
        if (loading) return;
        if (!user) return navigate(`/`);
    }, [user, loading]);

    const images = files.map(file => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: '450px' }} alt="preview" />
            </div>
        </div>
    ))

    return (
        <div style={{ textAlign: 'center' }}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <h1>Drop or select images here</h1>
            </div>
            <div>{images}</div>
            <button className="dashboard__btnlogut" onClick={logout}>
                Logout
            </button>
        </div>

    )
}