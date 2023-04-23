import axios from "axios";
import { CaptionResponseProps, CreateEntryProps, EntryResponseProps, GetCaptionProps, GetEntriesProp } from "./api.types";

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export const getCaptions = async (props: GetCaptionProps) => {

    const res = await axios.get<CaptionResponseProps>("/getCaption", {
        params: {
            page: props.page
        }
    });

    return res.data;
}

export const getEntries = async (props: GetEntriesProp) => {
    const res = await axios.get<EntryResponseProps>("/getEntries", {
        params: {
            page: props.page,
            caption: props.caption
        }
    });
    return res.data;
}

export const getAllEntries = async (props: GetEntriesProp) => {
    const res = await axios.get<EntryResponseProps>("/getAllEntries", {
        params: {
            page: props.page
        }
    });
    return res.data;
}



export const createEntry = async (props: CreateEntryProps) => {
    let data = new FormData();
    data.append("caption_id", props.caption_id);
    data.append("content", props.content);
    const res = await axios.post("/createEntry", data, {
        headers:{
            "Authorization" : `Bearer 2|LEBw2kQpi8KPh8LqWEuLCBufmsaVwurjO3YCFCJ4`
        }
    })

    return res.data;
}