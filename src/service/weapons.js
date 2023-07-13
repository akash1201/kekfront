

//"https://api.goloadout.com"    "http://127.0.0.1:5000"
let host = "https://api.goloadout.com"
export const getWeapons = async () => {
  try {
    const response = await fetch(host+"/weapons")
    return response.json();
  } catch (error) {
    console.error(error);
  }
}


export const getWeapon = async (id) => {
    try {
      const response = await fetch(host+"/weapons/"+id)
      return response.json();
    } catch (error) {
      console.error(error);
    }
}

export const getUniqueWeaponAttachmentType = async (id) => {
    try {
      const response = await fetch(host+"/weapons/"+id+"/unique_attachment_type")
      return response.json();
    } catch (error) {
      console.error(error);
    }
}

export const getWeaponAttachments = async (id) => {
    try {
      const response = await fetch(host+"/weapons/"+id+"/attachments")
      return response.json();
    } catch (error) {
      console.error(error);
    }
}

export const getTypesOfGuns = async () => {
  try {
    const response = await fetch(host+"/weapon-types")
    return response.json();
  } catch (error) {
    console.error(error);
  }
}





