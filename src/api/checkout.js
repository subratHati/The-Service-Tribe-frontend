import axios from "../utils/axios";


export const createBooking = async(payload) => {
    try {
        const res = await axios.post("/booking/create", payload,{
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        console.error("Create booking error ", error);
        throw error.response?.data || error;
        
    }
};