import React from "react";
import styles from "../page.module.css";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import EmailInput from "../../components/Email"; // Adjust the path as needed
import {FaFacebook, FaGoogle} from "react-icons/fa"; // Make sure to install react-icons if not already

const AuthPage: React.FC = () => {
    return (
        <>
        <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/bg-login.jpeg)' }}
    >
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-green-700">Log In</h1>
        <p className="text-sm text-center mb-6 text-gray-500">Login here using Email and password</p>

        <div className="space-y-4">
          <EmailInput />
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
                </div>
                <div className={styles.footer}>
                    <span className="flex flex-col justify-center items-center">
                        <p className="text-black">Don&apos;t have an account? </p>
                        <RegisterLink className="btn btn-dark">Create account</RegisterLink>
                    </span>
                </div>
            </div>
        </div>
      </div>
        
        </>
    );
};

export default AuthPage;