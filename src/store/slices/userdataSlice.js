import {createSlice} from "@reduxjs/toolkit";

const userListSlice = createSlice({
    name:"userList",
    intitialState:{
        userList:[],
        isLoading:false,
        error:null,
    },
    reducers:{
        setUserList:(state,action)=>{
            state.userList = action.payload;
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload;
        },
        setError:(state,action)=>{
            state.error = action.payload;
        }
    }
})
export const {setUserList, setLoading, setError } = userListSlice.actions;