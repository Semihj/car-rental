import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSidebar:true,
}

const sidebarSlice = createSlice({
    name:"sidebar",
    initialState,
    reducers:{
        openSideBar:(state) => {
            state.isSidebar = true
        },
        closeSideBar:(state) => {
            state.isSidebar = false
        },
    }
})

export const {openSideBar,closeSideBar} = sidebarSlice.actions;

export default sidebarSlice.reducer;