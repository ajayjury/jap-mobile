import React, { createContext, useContext, useEffect, useState } from "react";
import { ChildrenType } from "../helper/types";
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";
import { AuthContext } from "./AuthProvider";

export type Cart = {
  product_id: number,
  quantity: number,
}

export type CartType = {
  cart: Cart[]|[];
}

export type CartContextType = {
  cart: CartType;
  cartLoading: boolean;
  setCart: (data: Cart[]) => void;
}

const cartDefaultValues: CartContextType = {
  cart: {cart:[]},
  setCart: (data: Cart[]) => {},
  cartLoading: false
};

export const CartContext = createContext<CartContextType>(cartDefaultValues);


const CartProvider: React.FC<ChildrenType> = ({children}) => {
    const [cart, setCartDetails] = useState<CartType>({cart:[]});
    const [cartLoading, setCartLoading] = useState<boolean>(false);
    const {auth} = useContext(AuthContext);
  
    useEffect(() => {
      getCart()
      return () => {}
    }, [auth])
    

    const setCart = async (data: Cart[]) => {
      setCartLoading(true);
      try {
        const response = await axiosPublic.post(api_routes.cart, data.length>0 ? {data:data}: {}, {
          headers: {"Authorization" : `Bearer ${auth.token}`}
        });
        const cart_prods = response.data.cart.products.map((item:any)=> ({'product_id':item.id, 'quantity': item.quantity}))
        setCartDetails({cart: [...cart_prods]});
      } catch (error: any) {
        console.log(error);
      }finally{
        setCartLoading(false);
      }
    }
    
    const getCart = async () => {
      setCartLoading(true);
      try {
        const response = await axiosPublic.get(api_routes.cart, {
          headers: {"Authorization" : `Bearer ${auth.token}`}
        });
        const cart_prods = response.data.cart.products.map((item:any)=> ({'product_id':item.id, 'quantity': item.quantity}))
        setCartDetails({cart: [...cart_prods]});
      } catch (error: any) {
        console.log(error);
      }finally{
        setCartLoading(false);
      }
    }

    return (
      <CartContext.Provider value={{cart, setCart, cartLoading}}>
          {children}
      </CartContext.Provider>
    );
}

export default CartProvider;
