
import { ICards } from "../interfaces/CardInterfaces";

const apiBase:string = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2'

const getToken = async (): Promise<string|null> => {
  const token = localStorage.getItem('userToken')
  if (token) { 
    return token
  } else { 
    return null
  }
}

// -------------------------------------------------------------
//  GET ALL CARDS
// -------------------------------------------------------------

export const doGetAllCards = async (): Promise<{error:string|null,result:ICards[]|null}> => {
  try {
    const response = await fetch(`${apiBase}/cards`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json()
    if (!response.ok) return { error:data, result:null }
    return { error:null, result:data }
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:null }
  }
}

// -------------------------------------------------------------
//  GET MY (USER) CARDS 
// -------------------------------------------------------------

export const doGetMyCards = async (): Promise<{error:string|undefined,result:ICards[]|undefined}> => {
try {
    const token = await getToken()
    if (!token) return { error:'No token found', result:undefined }
    const response = await fetch(`${apiBase}/cards/my-cards`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    const data = await response.json()
    if (!response.ok){return { error:data, result:undefined }} 
    else{ return { error:undefined, result:data }}
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }
}

// -------------------------------------------------------------
//  GET CARD INFO
// -------------------------------------------------------------

export const doGetCardById = async (cardIdToRender:string) : Promise<{error:string|undefined,result:ICards|undefined}> => {
    
    
    try{
        const response = await fetch(`${apiBase}/cards/${cardIdToRender}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
                    const data = await response.json();
                    if (!response.ok) {
            return{error:data,result:undefined}
        }
else{ return { error:undefined, result:data }}
} catch (err) {
const errMessage = (err as Error).message
return { error:errMessage, result:undefined }
}
    }

// -------------------------------------------------------------
//  POST CARD
// -------------------------------------------------------------

export const doPostCard=async (formData:object) : Promise<{error:string|undefined,result:ICards|undefined}> => {
    try {
            const token = await getToken()
    if (!token) return { error:'No token found', result:undefined }
                const response = await fetch(`${apiBase}/cards/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'x-auth-token': token,
                    },
                    body: JSON.stringify(formData)
                })
                const data = await response.json();
                        if (!response.ok) {
                return{error:data,result:undefined}
            }
    else{ return { error:undefined, result:data }}
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }
}

// -------------------------------------------------------------
//  EDIT CARD
// -------------------------------------------------------------

export const doEditMyCard = async (formData:object) : Promise<{error:string|undefined,result:ICards|undefined}> => {
        try {
            const token = await getToken()
    if (!token) return { error:'No token found', result:undefined }
                const response = await fetch(`${apiBase}/cards/${localStorage.getItem("cardIdToEdit")}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'x-auth-token': token
                    },
                    body: JSON.stringify(formData)
                })
            const data = await response.json();
            if (!response.ok) {
                return{error:data,result:undefined}
            }
    else{ return { error:undefined, result:data }}
    } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
    }
}

// -------------------------------------------------------------
//  DELETE CARD
// -------------------------------------------------------------

export const doDeleteMyCard = async (cardId:string) : Promise<{error:string|undefined,result:ICards[]|undefined}> => {
    try {
            const token = await getToken()
                if (!token) return { error:'No token found', result:undefined }
            const response = await fetch(`${apiBase}/cards/${cardId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': token,
                },
                body: JSON.stringify({ "bizNumber": `${localStorage.getItem("bizNumber")}` })
            })
            const data = await response.json();
            if (!response.ok) {
                return{error:data,result:undefined}
            }
    else{ return { error:undefined, result:data }}
} catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
}
}