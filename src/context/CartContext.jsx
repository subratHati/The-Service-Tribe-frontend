import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useUser } from "./UserContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [ user ] = useUser();
    const [cart, setCart] = useState([]);


    useEffect(() => {
        if (!user) {
            setCart([]);
            return;
        }

        console.log("User is present...");
        const fetchCart = async () => {
            try {
                const res = await axios.get("/cart/get");
                console.log("Your cart is :", res.data.items);
                setCart(res.data.items || []);
            } catch (error) {
                console.log("No cart yet");

            }
        };
        fetchCart();
    }, [user]);

    const addItem = async (serviceId) => {
        const res = await axios.post("/cart/add", { serviceId });
        setCart(res.data.items);
    };

    const removeItem = async (serviceId) => {
        console.log("Service id which is passing is : ", serviceId);
        const res = await axios.delete(`/cart/remove/${serviceId}`);
        setCart(res.data.items);
    };

    const clearCart = async () => {
        const res = await axios.post("/cart/clear");
        setCart(res.data.items);
    };


    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }} >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);