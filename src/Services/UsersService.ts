
import { IUsers } from "../interfaces/UserInterfaces"

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
//  GET USER DETAILS
// -------------------------------------------------------------

export const doGetUserById = async (userId: string): Promise<{ error: string | null; result: IUsers | undefined }> => {
    try {
        const token = await getToken();
        if (!token) return { error: 'No token found', result: undefined };
        const response = await fetch(`${apiBase}/users/${userId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            }
        });

        const data: IUsers = await response.json();
        
        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = typeof errorData === 'string' ? errorData : 'Failed to fetch user details';
            return { error: errorMessage, result: undefined };
        }
        
        return { error: null, result: data };
    } catch (err) {
        const errMessage = (err as Error).message;
        return { error: errMessage, result: undefined };
    }
}

// -------------------------------------------------------------
//  SIGN IN USER 
// -------------------------------------------------------------


export const doSignInUser = async (email: string, password: string): Promise<{ error: string | undefined; result: string | undefined }> => {
    try {
      const response = await fetch(`${apiBase}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password }),
      });
        const data = await response.text();
        
    if (!response.ok){return { error:data, result:undefined }} 
    else{ return { error:undefined, result:data }}
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }
  }


//--------------------------------------------------------------
//  GET ALL USERS FROM SERVER
// -------------------------------------------------------------


    export const doFetchAllUsersFromServer = async (): Promise<{ error: string | undefined; result: IUsers[] | undefined }> => {
    const token = await getToken();
        if (!token) return { error: 'No token found', result: undefined };
      try {
        const response = await fetch(`${apiBase}/users`, {
          method: "GET",
          headers: {
            "content-Type": "application/json",
            "x-auth-token": token
          }
        });
    const data: IUsers[]  = await response.json()
    if (!response.ok){return { error:"Not succees to fetch data", result:undefined }} 
    else{ return { error:undefined, result:data }}
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }

}

//--------------------------------------------------------------
//  POST NEW USER 
// -------------------------------------------------------------

export const doPostUser = async (formData:object): Promise<{ error: string | undefined; result: string | undefined }> =>{
        try {
            const response = await fetch(`${apiBase}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            const data = await response.text();
    if (!response.ok){return { error:"Not succees to fetch data", result:undefined }} 
    else{ return { error:undefined, result:data }}
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }
    }

//--------------------------------------------------------------
//  EDIT USER 
// -------------------------------------------------------------

export const doEditUser = async (formData:object): Promise<{ error: string | undefined; result: string | undefined }> =>{
            const token = await getToken();
        if (!token) return { error: 'No token found', result: undefined };
            try {
                const response = await fetch(`${apiBase}/users/${localStorage.getItem("userIdToEdit")}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'x-auth-token': token
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
  if (!response.ok){return { error:"Not succees to fetch data", result:undefined }} 
    else{ return { error:undefined, result:data }}
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }
        };

//--------------------------------------------------------------
//  DELETE USER 
// -------------------------------------------------------------

  export const doDeleteUser = async () => {
        const token = await getToken();
        if (!token) return { error: 'No token found', result: undefined };
        try {
            const response = await fetch(`${apiBase}/users/${localStorage.getItem("userIdToDelete")}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token': token
                },
            });
            const data = await response.json();

  if (!response.ok){return { error:"Not succees to fetch data", result:undefined }} 
    else{ return { error:undefined, result:data }}
  } catch (err) {
    const errMessage = (err as Error).message
    return { error:errMessage, result:undefined }
  }
    };