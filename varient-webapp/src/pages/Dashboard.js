import React, { useEffect, useState, Component } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    auth,
    logout,
} from './DB/firebaseconnection';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate(`/`);


    }, [user, loading]);

    return (
        <div>
            <h1>This is the Dashboard page</h1>
            <button className="dashboard__btnlogut" onClick={logout}>
                Logout
            </button>
        </div>

    )
}