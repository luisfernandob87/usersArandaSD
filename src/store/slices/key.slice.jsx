import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const keySlice = createSlice({
		name: 'key',
    initialState: [],
    reducers: {
        setConection: (state, action) =>{
            const conection = action.payload
            return conection
        }
    }
})
const user = [
    {
        "Field": "username",
        "Value": "luis.morales"
    },
    {
        "Field": "password",
        "Value": "123"
    }
];
export const getConectionThunk = () => (dispatch) => {
    return axios.post('https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/login', user)
            .then(res => {
                localStorage.setItem("token", res.data[1].Value)
            })
        
}

export const { setConection } = keySlice.actions;

export default keySlice.reducer;