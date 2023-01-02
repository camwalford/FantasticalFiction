import {createContext, useEffect, useState} from "react";
import axios from 'axios';

 
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    //SETS currentUser STATE TO WHATEVER IS STORED LOCALLY 
    const [currentUser, setCurrentUser] = useState(
        //CREATING JSON FROM THE LOCALLY STORED "user" FIELD
        JSON.parse(localStorage.getItem("user")) || null);

    //SEND HTTP REQ TO BACKEND SERVER USING AXIOS/PROXY PATH
    //SETS CURRENT USER TO DATA IF LOGIN SUCCESSFUL  
    const login = async(inputs)=>{
        const res = await axios.post("/api/auth/login", inputs);
        setCurrentUser(res.data);
    };

    //SETS CURRENT USER TO NULL ON LOGOUT
    const logout = async()=>{
        await axios.post("/api/auth/logout");
        setCurrentUser(null);
    };

    //UPDATES LOCAL STORAGE EVERY TIME USER IS CHANGED
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};