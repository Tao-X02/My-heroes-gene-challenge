import React, { useEffect, useState, Component, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth
} from './DB/firebaseconnection';
import { Link, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function Dashboard(props) {
    const [files, setFiles] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("rendered");
        if (loading) return;
        if (!user) return navigate(`/`);
    }, [user, loading]);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map(file => Object.assign(FileReader, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const images = files.map(file => (
        <div key={file.name}>
            <div>
                <img src={file.preview} style={{ width: '450px' }} alt="preview" />
            </div>
        </div>
    ))

    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 900 }}>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drop or select images here</p>
            </div>
            <div>{images}</div>

        </div>
    );
}