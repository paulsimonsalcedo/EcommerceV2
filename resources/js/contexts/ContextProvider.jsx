import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    adminToken: null,
    setUser: ()=>{},
    setToken: ()=>{},
    setAdminToken: () => {},
});

export const ContextProvider = ({children})=>{

    const [user, setUser] = useState({
        name:'Paul'
    });
    //user
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    //admin
    const [adminToken, _setAdminToken] = useState(localStorage.getItem('ADMIN_ACCESS_TOKEN'));


    //user
    const setToken = (token)=>{
        _setToken(token);
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    //admin
    const setAdminToken = (adminToken) => {
        _setAdminToken(adminToken);
        if (adminToken) {
            localStorage.setItem('ADMIN_ACCESS_TOKEN', adminToken);
        } else {
            localStorage.removeItem('ADMIN_ACCESS_TOKEN');
        }
    };
    
    return (
        <StateContext.Provider value={{
            user,
            token,
            adminToken,
            setUser,
            setToken,
            setAdminToken
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ()=> useContext(StateContext)