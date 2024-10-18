import axios from "axios";
import React, { useEffect, useState } from "react";


const Users = ()=>{

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetchUser();
    },[]);

    const fetchUser = async ()=>{
        try {   
            const response = await axios.get("/api/admin/getUsers");
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="show-users">
                        <table className="table text-center table-primary">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(user=>(
                                        <tr key={user.id}>
                                            <th scope="row">{user.id}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users