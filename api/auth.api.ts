import api from "@/lib/axios";
import {LoginSchema} from "@/validation/auth/schemas/login.schema";

// login
export const login = async (values: LoginSchema) => {
    const {data} = await api.post("/auth/login", values);
    return data;
};

// logout
export const logout = async () => {
    const {data} = await api.post("/auth/logout");
    return data;
};
