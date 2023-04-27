import axios from "axios";
import { CaptionResponseProps, GetCaptionProps } from "../types/api/captions";
import { CreateEntryProps, CreateEntryResponseProps, EntryResponseProps, GetEntriesProp } from "../types/api/entries";
import { RegisterDataProps } from "@/components/pages/register/Register.types";
import { LoginUserProps, RegisterUserProps } from "../types/api/user";
import { LoginDataProps } from "@/components/pages/login/Login.types";

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export const getCaptions = async (props: GetCaptionProps): Promise<CaptionResponseProps> => {

    const res = await axios.get("/getCaption", {
        params: {
            page: props.page
        }
    });

    return res.data;
}

export const getEntries = async (props: GetEntriesProp): Promise<EntryResponseProps> => {
    const res = await axios.get("/getEntries", {
        params: {
            page: props.page,
            caption: props.caption
        }
    });
    return res.data;
}

export const getAllEntries = async (props: GetEntriesProp): Promise<EntryResponseProps> => {
    const res = await axios.get("/getAllEntries", {
        params: {
            page: props.page
        }
    });
    return res.data;
}



export const createEntry = async (props: CreateEntryProps): Promise<CreateEntryResponseProps> => {
    let data = new FormData();
    data.append("caption_id", props.caption_id);
    data.append("content", props.content);
    const res = await axios.post("/createEntry", data, {
        headers: {
            "Authorization": `Bearer ${props.token}`
        }
    })

    return res.data;
}

export const register = async (props: RegisterDataProps): Promise<RegisterUserProps> => {
    let data = new FormData();
    data.append("email", props.email);
    data.append("password", props.password);
    data.append("name", props.name);
    data.append("username", props.username);
    const res = await axios.post("/register", data);
    return res.data;
}

export const login = async (props: LoginDataProps): Promise<LoginUserProps> => {
    let data = new FormData();
    data.append("email", props.email);
    data.append("password", props.password);
    const res = await axios.post("/login", data);
    return res.data;
}