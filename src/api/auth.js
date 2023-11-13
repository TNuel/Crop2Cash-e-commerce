import axios from 'axios';

export async function login(credentials){
    try {        
        const call = await axios.post(`auth/login`, credentials);
        const response = call.data;
        console.log("token Date ..........",call);
        
        // Convert the response object to a JSON string
        const responseString = JSON.stringify(response);

        // Store the JSON string in localStorage with a specific key, e.g., 'tokenData'
        localStorage.setItem('tokenData', responseString);
        const token = response.token;
        localStorage.setItem('token', response.token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
        return response
        
    } catch (error) {
        console.log(error);
        throw error;
    }
  
}
