import axios from "axios";
import { CaptionResponseProps, CreateCaptionProps, CreateCaptionResponseProps, GetCaptionProps } from "../types/api/captions";
import { AddFavoriteProps, AddFavoriteResponseProps, AddLikeProps, AddLikeResponseProps, CreateEntryProps, CreateEntryResponseProps, DeleteEntryResponseProps, EntryByIdResponseProps, EntryResponseProps, GetEntriesProp } from "../types/api/entries";
import { RegisterDataProps } from "@/components/pages/register/Register.types";
import { LoginUserProps, RegisterUserProps } from "../types/api/user";
import { LoginDataProps } from "@/components/pages/login/Login.types";
import { SearchProps, SearchResponseProps } from "../types/api/search";
import { TopicsResponseProps } from "../types/api/topics";
import { AddCommentProps, AddCommentResponseProps, DeleteCommentResponseProps } from "../types/api/comment";

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export const getCaptions = async (props: GetCaptionProps): Promise<CaptionResponseProps> => {
    let params = new URLSearchParams();
    params.append("page", props.page.toString());
    if (props.topic_id) {
        params.append("topic_id", props.topic_id.toString());
    }

    const res = await axios.get("/getCaption", {
        params: params
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

export const search = async (props: SearchProps): Promise<SearchResponseProps> => {
    const res = await axios.get("/search", {
        params: {
            query: props.query,
            page: props.page
        }
    });

    return res.data;
}

export const createCaption = async (props: CreateCaptionProps): Promise<CreateCaptionResponseProps> => {
    let data = new FormData();
    data.append("title", props.title);
    data.append("content", props.content);
    data.append("topic_id", props.topic_id.toString());
    const res = await axios.post("/addCaption", data, {
        headers: {
            "Authorization": `Bearer ${props.token}`
        }
    })

    return res.data;
}

export const getTopics = async (): Promise<TopicsResponseProps> => {
    const res = await axios.get("/getTopics");
    return res.data;
}

export const addFavorite = async (props: AddFavoriteProps): Promise<AddFavoriteResponseProps> => {
    let data = new FormData();
    data.append("entry_id", props.entry_id.toString());
    const res = await axios.post("/addFavorite", data, {
        headers: {
            "Authorization": `Bearer ${props.token}`
        }
    });

    return res.data;
}

export const addLike = async (props: AddLikeProps): Promise<AddLikeResponseProps> => {
    let data = new FormData();
    data.append("entry_id", props.entry_id.toString());
    data.append("type", props.type.toString());
    const res = await axios.post("/addLike", data, {
        headers: {
            "Authorization": `Bearer ${props.token}`
        }
    });
    return res.data;
}


export const getEntryById = async (id: number): Promise<EntryByIdResponseProps | undefined> => {
    let params = new URLSearchParams();
    params.append("id", id.toString());
    const res = await axios.get("/getEntry", {
        params: params
    });
    return res.data;
}

export const addComment = async (props: AddCommentProps): Promise<AddCommentResponseProps> => {
    let data = new FormData();
    data.append("entry_id", props.entry_id.toString());
    data.append('comment', props.comment);
    const res = await axios.post("/addComment", data, {
        headers: {
            "Authorization": `Bearer ${props.token}`
        }
    });
    return res.data;
}

export const deleteComment = async ({ id, token }: { id: number, token: string | undefined }): Promise<DeleteCommentResponseProps> => {
    const res = await axios.delete(`/deleteComment`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        data: {
            id: id
        }
    });
    return res.data;
}

export const deleteEntry = async ({ id, token }: { id: number, token: string | undefined }): Promise<DeleteEntryResponseProps> => {
    const res = await axios.delete(`/deleteEntry`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        data: {
            id: id
        }
    });
    return res.data;
}