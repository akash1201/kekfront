import { prepareHeaders } from "../utils/functions";
let host = "https://api.goloadout.com"
export const login = async (payload) => {
  try {
    const response = await fetch(`${host}/login`, {
      method: "POST",
      headers:  prepareHeaders(),
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (payload) => {
  try {
    const response = await fetch(`${host}/register`, {
      method: "POST",
      headers:  prepareHeaders(),
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const facebookAuth = async (payload) => {
  try {
    const response = await fetch(`${host}/auth/facebook`, {
      method: "POST",
      headers:  prepareHeaders(),
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
export const resetPassword = async (payload) => {
  try {
    const response = await fetch(`${host}/reset_password`, {
      method: "POST",
      headers: prepareHeaders(),
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const googleAuth = async (payload) => {
  try {
    const response = await fetch(`${host}/auth/facebook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};
