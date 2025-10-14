import axios from "../utils/axios";

export const registerUser = async (userDate) => {
    try {
        const res = await axios.post("/auth/register", userDate, {skipToast: true});
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const login = async (userData) => {
    try {
        const res = await axios.post("/auth/login", userData, { skipToast: true });
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const verifyEmail = async (email, otp) => {
    try {
        console.log("verifyEmail calling");
        const res = await axios.post("/auth/verify-email", { email, otp }, { skipToast: true });
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }

}

export const requestPasswordReset = async (email) => {
    try {
        const res = await axios.post("/auth/forget-password", { email }, { skipToast: true });
        return res.data;
    } catch (error) {
        throw error.response?.data || error;

    }
}

export const verifyAndResetPassowrd = async (resetData) => {
    console.log("reset data is :", resetData);
    try {
        const res = await axios.post("/auth/reset-password", resetData);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}

export const updatePhoneNumber = async (phone) => {
    try {
        const res = await axios.post("/auth/update-phoneNumber", phone);
        return res.data;
    } catch (error) {
        throw error.response?.data || error;

    }
}

export const resendOTP = async (email) => {
    try {
        const res = await axios.post("/auth/resend-otp", { email }, {skipToast: true});
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }

};

export const logoutUser = async () => {
    try {
        const res = await axios.get("/auth/logout");
        return res.data;
    } catch (error) {
        throw error.response?.data || error;
    }
}