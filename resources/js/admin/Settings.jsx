import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Settings = ()=>{

    const [buttonActive, setButtonActive] = useState(false);
    const [AdminEmail, setAdminEmail] = useState('');
    const [AdminPassword, setAdminPassword] = useState('');
    const [AdminImage, setAdminImage] = useState(null);
    const [AdminImagePreview, setAdminImagePreview] = useState(null);


    const getAdminCredentials = async ()=>{

        try{

            const response = await axios.get('/api/admin/getAdminCredentials');
            console.log(response.data.image);
            const fileImage = response.data.image;
            setAdminImage(fileImage);

        }catch(error){
            toast.error(error.response.data.errors);
        }
    }

    useEffect(()=>{
        getAdminCredentials();
    },[buttonActive]);


    //For Avatar Preview
    const handleAvatar = (e)=>{

        const file = e.target.files[0];

        if(file){
            setAdminImage(file);

            const reader = new FileReader();

            reader.onloadend = ()=>{
                setAdminImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }

    }

    const handleSettingButton = ()=>{
        setButtonActive(true);

        if(buttonActive)
        {
            saveAdminCred();
            setButtonActive(false);
        }
    }

    const saveAdminCred = async () => {
        const formData = new FormData();
    
        formData.append('email', AdminEmail); 
        formData.append('password', AdminPassword); 
        formData.append('AdminImage', AdminImage); 
    
        try {
            const response = await axios.post('/api/admin/editAdmin', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                toast.success(response.data.message);
                setAdminImagePreview(null);
                setButtonActive(prev => !prev);
            }
        } catch (error) {

            if (error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((errorMsg) => {
                        toast.error(errorMsg);
                    });
                });
            } else {
                toast.error('An unexpected error occurred.');
            }

        }

    };
    
    return (
        <div className="container">
            <h4>General</h4>
            <div className="row bg-light p-4 settings-section">
                
                <div className="col-md-4 col-lg-4">
                    <div className="profile">

                        {
                            AdminImagePreview ? (
                                <img src={AdminImagePreview} 
                                     alt="Selected"
                                />
                            ) : (
                                AdminImage && <img src={`/storage/admin/${AdminImage}`} />
                            )
                        }
                        
                        <label className="btn btn-primary" htmlFor="fileInput">
                            Attach File
                            <input 
                                onChange={handleAvatar} 
                                type="file" 
                                id="fileInput" 
                                className="d-none"
                                disabled={!buttonActive}
                                />
                        </label>
                    </div>
                </div>
                <div className="col-md-8 col-lg-8">
                    <div className="general-settings">
                        <div className="form-floating mb-3">
                            <input 
                                type="email"
                                className="form-control" 
                                id="adminEmailSetting"
                                disabled={!buttonActive}
                                onChange={(e)=> setAdminEmail(e.target.value)}
                                />
                            <label htmlFor="adminEmailSetting">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="password"
                                className="form-control" 
                                id="adminPasswordSetting"
                                disabled={!buttonActive}
                                onChange={(e)=> setAdminPassword(e.target.value)} 
                                />
                            <label htmlFor="adminPasswordSetting">Password</label>
                        </div>

                        <button
                            className={buttonActive ? 'btn btn-success' : 'btn btn-primary'}
                            type="button"
                            onClick={handleSettingButton}
                            >
                                {buttonActive ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings