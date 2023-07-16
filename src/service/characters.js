import { prepareHeaders } from "../utils/functions";
//"https://kekback-dev-build.onrender.com/"    "http://127.0.0.1:5000"
let host = "https://kekback-dev-build.onrender.com";

export const getCharacters = async () => {
  try {
    const response = await fetch(host + "/characters", {
      method: "GET",
      headers: prepareHeaders(),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getCharacterDetails = async (id) => {
  try {
    const response = await fetch(host + "/characters/" + id, {
      method: "GET",
      headers: prepareHeaders(),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUniqueOutfitOptionType = async (id) => {
  try {
    const response = await fetch(
      host + "/characters/" + id + "/unique_outfit_type"
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getCharacterOutfits = async (id) => {
  try {
    const response = await fetch(host + "/characters/" + id + "/outfits");
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getCharactersTypes = async () => {
  try {
    const response = await fetch(host + "/character-categories");
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const saveCharacter = async (id, payload) => {
  try {
    console.log("payload........", payload);
    const response = await fetch(host + `/users/${id}/characters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "",
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
