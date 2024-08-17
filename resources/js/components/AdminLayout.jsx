import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const AdminLayout = ()=>{

    return(
        <div>
            <Outlet />
        </div>
    )
}

export default AdminLayout;