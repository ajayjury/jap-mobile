import React, { createContext, useEffect, useState } from "react";
import { AuthType, ChildrenType } from "../helper/types";
import { GetResult, Preferences } from '@capacitor/preferences';
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";
import { AxiosResponse } from "axios";


export type AType = {
  auth: AuthType;
}

export type AuthContextType = {
  auth: AuthType;
  setAuth: (data: AType) => void;
  logout: () => void;
}

const authDefaultValues: AuthContextType = {
  auth: {
    authenticated: false,
    token: '',
    token_type: '',
    user: undefined
  },
  setAuth: (data: AType) => {},
  logout: () => {},
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
      await getUserDetails(auth)
      
    }

    const getUserDetails = async (auth:AType):Promise<void> => {
      const headers = {
        headers: {
          "Authorization" : `Bearer ${auth.auth.token}`,
          "Accept": 'application/json'
        }
      }
      try {
        await axiosPublic.get(api_routes.profile, headers);
        const data = {auth:{
          authenticated: auth.auth.authenticated,
          token: auth.auth.token,
          token_type: auth.auth.token_type,
          user: auth.auth.user
        }};
        setAuth({...data})
      } catch (error) {
        console.log(error);
        const data = {auth:{
          authenticated: false,
          token: '',
          token_type: '',
          user: undefined
        }};
        setAuth({...data})
      }
    }
    

    const setAuth = async (data: AType) => {
      setAuthDetails({...data});
      await setAuthLocally({...data});
    }

    const logout = () => {
      try {
          const data = {auth:{
            authenticated: false,
            token: '',
            token_type: '',
            user: undefined
          }};
          setAuth({...data})
      } catch (error) {
          console.log(error);
      }
    }
    

    return (
      <AuthContext.Provider value={{...auth, setAuth, logout}}>
          {children}
      </AuthContext.Provider>
    );
}

export default AuthProvider;
