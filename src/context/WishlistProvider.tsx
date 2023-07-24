import React, { createContext, useContext, useEffect, useState } from "react";
import { ChildrenType } from "../helper/types";
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";
import { AuthContext } from "./AuthProvider";


export type WishlistType = {
  wishlist: number[]|[];
}

export type WishlistContextType = {
  wishlist: WishlistType;
  wishlistLoading: boolean;
  setWishlist: (data: number[]) => void;
}

const wishlistDefaultValues: WishlistContextType = {
  wishlist: {wishlist:[]},
  setWishlist: (data: number[]) => {},
  wishlistLoading: false
};

export const WishlistContext = createContext<WishlistContextType>(wishlistDefaultValues);


const WishlistProvider: React.FC<ChildrenType> = ({children}) => {
    const [wishlist, setWishlistDetails] = useState<WishlistType>({wishlist:[]});
    const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);
    const {auth} = useContext(AuthContext);
  
    useEffect(() => {
      getWishlist()
      return () => {}
    }, [auth])
    

    const setWishlist = async (data: number[]) => {
      setWishlistLoading(true);
      try {
        const response = await axiosPublic.post(api_routes.wishlist, data.length>0 ? {product:data}: {}, {
          headers: {"Authorization" : `Bearer ${auth.token}`}
        });
        const prod_ids = response.data.wishlist.products.map((item:any)=> item.id)
        setWishlistDetails({wishlist: [...prod_ids]});
      } catch (error: any) {
        console.log(error);
      }finally{
        setWishlistLoading(false);
      }
    }
    
    const getWishlist = async () => {
      setWishlistLoading(true);
      try {
        const response = await axiosPublic.get(api_routes.wishlist, {
          headers: {"Authorization" : `Bearer ${auth.token}`}
        });
        const prod_ids = response.data.wishlist.products.map((item:any)=> item.id)
        setWishlistDetails({wishlist: [...prod_ids]});
      } catch (error: any) {
        console.log(error);
      }finally{
        setWishlistLoading(false);
      }
    }

    return (
      <WishlistContext.Provider value={{wishlist, setWishlist, wishlistLoading}}>
          {children}
      </WishlistContext.Provider>
    );
}

export default WishlistProvider;
