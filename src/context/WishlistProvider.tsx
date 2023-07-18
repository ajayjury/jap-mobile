import React, { createContext, useEffect, useState } from "react";
import { ChildrenType } from "../helper/types";
import { GetResult, Preferences } from '@capacitor/preferences';
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";


export type WishlistType = {
  wishlist: number[]|[];
}

export type WishlistContextType = {
  wishlist: WishlistType;
  setWishlist: (data: number[]) => void;
}

const wishlistDefaultValues: WishlistContextType = {
  wishlist: {wishlist:[]},
  setWishlist: (data: number[]) => {}
};

export const WishlistContext = createContext<WishlistContextType>(wishlistDefaultValues);


const WishlistProvider: React.FC<ChildrenType> = ({children}) => {
    const [wishlist, setWishlistDetails] = useState<WishlistType>({wishlist:[]});
    

    const setWishlist = async (data: number[]) => {
      setWishlistDetails({wishlist: [...data]});
    }

    return (
      <WishlistContext.Provider value={{wishlist, setWishlist}}>
          {children}
      </WishlistContext.Provider>
    );
}

export default WishlistProvider;
