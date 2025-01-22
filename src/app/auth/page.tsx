import React from "react";
import styles from "../page.module.css";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import EmailInput from "../../components/Email"; // Adjust the path as needed
import {FaFacebook, FaGoogle} from "react-icons/fa"; // Make sure to install react-icons if not already

const AuthPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>
                    {/* Update the logo to use Google's logo or your own brand logo */}
                    <img
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        src="../favicon.ico"
                        alt="Logo"
                    />
                </div>
                <h1 className={styles.title}>Custom Sign In</h1>
                <div className={styles.authMethods}>
                    <LoginLink
                        className={styles.googleButton}
                        authUrlParams={{
                            connection_id: "conn_01942104900b74707f55c875e6ca8699"
                        }}
                    >
                        <FaGoogle className={styles.googleIcon} />
                        Sign in with Google
                    </LoginLink>
                    <LoginLink
                        className={styles.googleButton}
                        authUrlParams={{
                            connection_id: "conn_01942104900a7c0e527d7979c830324a"
                        }}
                    >
                        <FaFacebook className={styles.googleIcon} />
                        Sign in with Facebook
                    </LoginLink>
                    {/* Use the client component for email input */}
                    <EmailInput />
                </div>
                <div className={styles.footer}>
                    <span>
                        Don&apos;t have an account?{" "}
                        <RegisterLink className="btn btn-dark">Create account</RegisterLink>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;