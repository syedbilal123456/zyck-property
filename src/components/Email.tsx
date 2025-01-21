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
                    connection_id: "conn_01941e216db373f68fc43cefc6347bbe",
                    login_hint: email
                }}
                className={styles.button}
            >
                NEXT
            </LoginLink>
        </div>
    );
}