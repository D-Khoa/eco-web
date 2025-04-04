"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/login.module.css";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            localStorage.setItem("token", data.token);
            router.push("/");
        }
        catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input className={styles.form_input } type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className={styles.form_input } type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className={styles.form_button } type="submit">Login</button>
            </form>
        </div>
    );
}