import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { axiosPublic } from "../../axios";

export const useAxiosPrivate = () => {
    const {auth} = useContext(AuthContext);
    
    useEffect(() => {

        const requestInterceptor = axiosPublic.interceptors.request.use(
            config => {
                if(!config.headers['authorization']){
                    config.headers['authorization'] = `Bearer ${auth.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
    
      return () => {
          axiosPublic.interceptors.request.eject(requestInterceptor);
      }
    }, [auth])
    

    return axiosPublic;
};