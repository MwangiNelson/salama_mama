import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, onSnapshot } from "firebase/firestore";
import { AppContext } from './AppContexts';

// Create the context
export const ConversationsContext = createContext();

// Provider component
export const ConversationsProvider = ({ children }) => {
    const [userConversations, setUserConversations] = useState([]);
    const { userData } = useContext(AppContext);

    useEffect(() => {
        let unsubscribe = () => { };

        const fetchUserConversations = async () => {
            try {
                const userId = await userData.getIdToken(); // Get the current user's ID token
                const userConversationsRef = collection(db, 'users', userId, 'conversations');

                // Listen for real-time updates
                unsubscribe = onSnapshot(userConversationsRef, (querySnapshot) => {
                    const conversations = querySnapshot.docs.map(doc => ({
                        conversationId: doc.id,
                        ...doc.data()
                    }));
                    setUserConversations(conversations);
                    console.log(conversations)
                });
            } catch (error) {
                console.error('Error fetching user conversations:', error);
            }
        };

        // if (userData) {
        //     fetchUserConversations();
        // }

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, [userData]); // Dependency on userData ensures useEffect runs when userData changes

    return (
        <ConversationsContext.Provider value={userConversations}>
            {children}
        </ConversationsContext.Provider>
    );
};
