const API_URL = import.meta.env.VITE_API_URL;

interface RegisterData {
	last_name: string;
	first_name: string;
	email: string;
	password: string;
}

export async function registerUser(userData: RegisterData) {
	const res = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
		mode: "cors",
	});

	if (!res.ok) {
		const errorData = await res.json();
		const error = new Error(errorData.message);
		throw error;
	}
}

interface LoginData {
	email: string;
	password: string;
}

export async function loginUser(userData: LoginData) {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	if (!res.ok) {
		const errorData = await res.json();
		const error = new Error(errorData.message);
		throw error;
	} 

//	const data = await res.json();
//	sessionStorage.setItem("token", data.token);
	
}

export async function resetPasswordRequest(email: string) {
	console.log("fetch api reset")
	const res = await fetch(`${API_URL}/auth/reset_password_request`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
	});

	if (!res.ok) {
		const errorData = await res.json();
		const error = new Error(errorData.message);
		throw error;
	} 
}

export async function setNewPassword(password: string, token: string | null) {
	console.log("PATCH NEW PASSWORD: password and token ", password, token);
	const res = await fetch(`${API_URL}/auth/set_new_password`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password, token }),
	});

	if (!res.ok) {
		const errorData = await res.json();
		const error = new Error(errorData.message);
		throw error;
	} 
}