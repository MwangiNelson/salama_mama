// MyContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, setDoc, getDoc } from "firebase/firestore";

const BOT_ENDPOINT = 'https://frontida-apis.onrender.com/generateText'
export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);
    const [activeConvo, setActiveConvo] = useState(null)
    const [chats, setChats] = useState([])

    useEffect(() => {
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        if (!userData) {
            sessionStorage.removeItem('userData');
        }

        sessionStorage.setItem('userData', JSON.stringify(userData))


    }, [userData]);


    useEffect(() => {
        getChatsForUser(userData?.uid)
    }, [userData])

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (userData) {
                sessionStorage.setItem('userData', JSON.stringify(userData));
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [userData]);

    async function signup(email, password, username) {

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // Handle user creation
            response.user.username = username
            setUserData(response.user);

            const userDocRef = doc(db, "usersCollection", response.user.uid);

            await setDoc(userDocRef, {
                username: username,
                // other fields...
            });

            return { success: true, user: response.user };
        } catch (error) {
            // Handle errors
            console.error("Signup failed: ", error.message);
            let errorResponse;
            switch (error.code) {
                case 'auth/invalid-email':
                    errorResponse = { success: false, message: 'The email address is not valid.' };
                    break;
                case 'auth/email-already-in-use':
                    errorResponse = { success: false, message: 'The email address is already in use by another account.' };
                    break;
                case 'auth/weak-password':
                    errorResponse = { success: false, message: 'The password is too weak.' };
                    break;
                case 'auth/operation-not-allowed':
                    errorResponse = { success: false, message: 'Email and password accounts are not enabled.' };
                    break;
                default:
                    errorResponse = { success: false, message: 'An unknown error occurred.' };
                    break;
            }
            return errorResponse;
        }
    }

    async function login(email, password) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // Handle successful login
            let user = response.user;

            // Fetch the user's username from Firestore
            const userDocRef = doc(db, "usersCollection", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                // Append the username to the user object
                console.log("Username has been fetched as :", userDocSnap.data().username)
                user = { ...user, username: userDocSnap.data().username };
            }

            setUserData(user);
            return { success: true, message: "Login Successful" };
        } catch (error) {

            console.error("Login failed: ", error.message);
            // Handle errors
            let errorResponse;
            switch (error.code) {
                case 'auth/invalid-email':
                    errorResponse = { success: false, message: 'The email address is not valid.' };
                    break;
                case 'auth/user-disabled':
                    errorResponse = { success: false, message: 'The user has been disabled.' };
                    break;
                case 'auth/user-not-found':
                    errorResponse = { success: false, message: 'There is no user record corresponding to this identifier. The user may have been deleted.' };
                    break;
                case 'auth/wrong-password':
                    errorResponse = { success: false, message: 'The password is invalid or the user does not have a password.' };
                    break;
                default:
                    errorResponse = { success: false, message: 'An unknown error occurred.' };
                    break;
            }
            return errorResponse;
        }
    }

    async function promptBot(prompt) {
        const headers = {
            "Content-Type": "application/json"
        };
        console.log("Sent Data : ", prompt)

        // Configure the fetch options for POST request with CORS enabled
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(prompt)
        };

        try {
            let botResponse = await fetch(BOT_ENDPOINT, requestOptions);
            if (!botResponse.ok) {
                // If the response status is not ok, throw an error
                return ({ generated_text: 'I am sorry, I am unable to process a response at the moment, please try again in a few minutes.' });

            }

            return botResponse; // Assuming the response is text
        } catch (err) {
            // Return the error message as a string
            console.error("Error fetching response from bot:", err);
            return `Error: ${err.message}`;
        }
    }


    const getChatsForUser = async (userId) => {
        try {
            const userConvoRef = doc(db, "userConversations", userId);
            const userConvoSnapshot = await getDoc(userConvoRef);

            if (userConvoSnapshot.exists()) {
                const userData = userConvoSnapshot.data();
                setChats(userData.chats);
            } else {
                console.log("No data found for user:", userId);
                return null;
            }
        } catch (error) {
            console.error("Error getting chats for user:", userId, error);
            return null;
        }
    };

    const saveChat = async (chatName, chatData, userId) => {
        const timestamp = new Date().getTime();

        try {
            const userConvoRef = doc(db, "userConversations", userId);
            const userConvoSnapshot = await getDoc(userConvoRef);
            let userData = {};

            if (userConvoSnapshot.exists()) {
                userData = userConvoSnapshot.data();
            }

            // Initialize an array to store chats if it doesn't exist
            userData.chats = userData.chats || [];

            // Add the new chat to the array
            userData.chats.push({ name: chatName, data: chatData, date: timestamp });

            await setDoc(userConvoRef, userData);
        } catch (error) {
            console.error(error);
        }
    };
    const saveConvo = async (data) => {
        let API_ENDPOINT = 'http://127.0.0.1:8000/api/add_convo'
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            });

            if (response.ok) {
                const res = await response.json();
                console.log('Convo Added successfully');

                return true
            } else {
                console.log('Convo could not be added');
                return false
            }
        } catch (err) {
            console.error(err)
        }
    }


    const logout = () => {
        auth.signOut()
        setUserData(null)
        sessionStorage.removeItem('userData');
        window.location.href = '/';
    }

    const contextValue = {
        userData,
        login,
        signup,
        logout,
        promptBot,
        setActiveConvo,
        activeConvo,
        saveConvo,
        saveChat,
        chats,
        getChatsForUser

    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
