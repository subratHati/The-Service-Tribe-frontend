import axios from "../utils/axios";

export const mockPay = async(amount) => {
    try {
        const res = await axios.post("/payment/mock", {amount});
        return res.data;
    } catch (error) {
        alert("Payment error");
       return console.error(error.message);
        
    }

}