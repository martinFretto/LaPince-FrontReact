import { UpdatedUser } from "../types/user";

const API_URL = import.meta.env.VITE_API_URL;

export async function getUserProfile() {
    const res = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        credentials: 'include',
        headers: {
//			Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if(res.status===204){
        return {data:[]}
    }

    if (!res.ok) {
        const errorData = await res.json();
        const error = new Error(errorData.message);
        throw error;
    } 

    return res.json();
}

export async function updateUserProfile(updatedUser: UpdatedUser) {
    const res = await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        credentials: 'include',
        headers: {
//			Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
    });
    if(res.status===204){
        return {data:[]}
    }

    if (!res.ok) {
        const errorData = await res.json();
        const error = new Error(errorData.message);
        throw error;
    } 

    return res.json();
}