import React, { createContext, useEffect, useState } from "react";
import { AuthType, ChildrenType } from "../helper/types";
import { GetResult, Preferences } from '@capacitor/preferences';
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";


export type AType = {
  auth: AuthType;
}

export type AuthContextType = {
  auth: AuthType;
  setAuth: (data: AType) => void;
}

const authDefaultValues: AuthContextType = {
  auth: {
    authenticated: false,
    token: '',
    token_type: '',
    user: undefined
  },
  setAuth: (data: AType) => {}
};

export const AuthContext = createContext<AuthContextType>(authDefaultValues);

const setAuthLocally = async(data: AType) => {
  await Preferences.set({
    key: 'auth',
    value: JSON.stringify(data)
  });
}


const AuthProvider: React.FC<ChildrenType> = ({children}) => {
    const [auth, setAuthDetails] = useState<AType>({
      auth:{
        authenticated: false,
        token: '',
        token_type: '',
        user: undefined
      }
    });

    useEffect(() => {
      getObject();
    
      return () => {}
    }, [])

    const getObject = async() => {
      const ret:GetResult = await Preferences.get({ key: 'auth' });
      if(!ret.value) {
        const data = {auth:{
          authenticated: false,
          token: '',
          token_type: '',
          user: undefined
        }};
        setAuth({...data})
        return;
      }
    
      const auth:AType = await JSON.parse(ret.value);
      if(!auth.auth.authenticated){
        const data = {auth:{
          authenticated: false,
          token: '',
          token_type: '',
          user: undefined
        }};
        setAuth({...data})
        return;
      }
      const response = await getUserDetails(auth.auth.token)
      if(response){
        const data = {auth:{
          authenticated: auth.auth.authenticated,
          token: auth.auth.token,
          token_type: auth.auth.token_type,
          user: auth.auth.user
        }};
        setAuth({...data})
      }else{
        const data = {auth:{
          authenticated: false,
          token: '',
          token_type: '',
          user: undefined
        }};
        setAuth({...data})
      }
    }

    const getUserDetails = async (token: string):Promise<boolean>=>{
      try {
        await axiosPublic.get(api_routes.profile, {
          headers: {"Authorization" : `Bearer ${token}`}
        });
        return true;
      } catch (error) {
        return false;
      }
    }
    

    const setAuth = async (data: AType) => {
      setAuthDetails({...data});
      await setAuthLocally({...data});
    }

    return (
      <AuthContext.Provider value={{...auth, setAuth}}>
          {children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;
