"use client";
import React, {useState} from "react";
import styles from "../app/page.module.css";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function EmailInput() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
            />
            <LoginLink
                authUrlParams={{
                    connection_id:
                        process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS || "",
                    login_hint: email
                }}
                className={styles.button}
            >
                NEXT
            </LoginLink>
        </div>
    );
}