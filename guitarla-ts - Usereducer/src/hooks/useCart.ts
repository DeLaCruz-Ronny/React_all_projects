import { useState, useEffect, useMemo } from "react";
import type { Guitar, CartItem } from '../types/index'

export const useCart = () => {
     
    const initialCart = () : CartItem[] => {
        const localStoragecart = localStorage.getItem("cart");
        return localStoragecart ? JSON.parse(localStoragecart) : [];
      };
    
      const [cart, setCart] = useState(initialCart);
    
      const MAX_ITEM = 5;
      const MIN_ITEM = 1;
    
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);
    
      const addToCart = (item : Guitar) => {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
        if (itemExists >= 0) {
          if (cart[itemExists].quantity >= MAX_ITEM) return;
          const updateCart = [...cart];
          updateCart[itemExists].quantity++;
          setCart(updateCart);
        } else {
          const newItem : CartItem = {...item, quantity : 1}
          setCart((prevCart) => [...prevCart, newItem]);
        }
      };
    
      const removeFromCart = (id : Guitar['id']) => {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
      };
    
      const increaseQuantity = (id : Guitar['id']) => {
        const updateCart = cart.map((item) => {
          if (item.id === id && item.quantity <= MAX_ITEM) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        setCart(updateCart);
      };
    
      const decreaseQuantity = (id : Guitar['id']) => {
        const updateCart = cart.map((item) => {
          if (item.id === id && item.quantity > MIN_ITEM) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
        setCart(updateCart);
      };
    
      const clearCart = () => {
        setCart([]);
      };

      const isEmpty = useMemo(() => cart.length === 0, [cart]);
      const cartotal = useMemo( () =>cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart] )

    return{
         cart,
         addToCart,
         removeFromCart,
         increaseQuantity,
         decreaseQuantity,
         clearCart,
         isEmpty,
         cartotal
    }
}



