import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import avatar from '../../assets/avatar.svg';
import '../../styles/Profile.css'
import { useNavigate } from "react-router-dom";
import { LoginService } from "../../services/login";
import { ProfileService } from "../../services/profile";
import { IUserData } from "../../types/userData.types";
const keyTitleMap: {[key: string]: string} = {
    fullName: 'Full Name',
    email: 'Email',
    dob: 'Date of Birth',
    password: 'Password',
    phoneNumber: 'Phone Number',
    securityAnswer: 'Security Answer',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'Zip Code',
    country: 'Country',
    confirmPassword: 'Confirm Password'
};
const Profile = ()=>{
    const navigate = useNavigate();
    const [userData,setUserData] = useState<IUserData>(null);

    useEffect(()=>{

        ProfileService.fetchUserData().then((userDataUpdate)=> setUserData(userDataUpdate));
        if(!LoginService.currentUserData) navigate('/login');
    }, [])
    if(!LoginService.currentUserData) return <></>;
    return <div>
        <NavBar userData={{userName: userData?.fullName, userRole:'User'}}  />
        <div className="profile-container">
            <img className='profile-avatar' src={avatar} alt=''/>
        
        <div className="profile-data">
            <span className="profile-title">PROFILE</span>
            <div className="profile-details">
                {
                    userData && Object.entries(userData).map(([key, value])=>{
                        return <div className="profile-data-item" key={key} >
                            <span className="profile-data-title">{keyTitleMap[key] ?? key}</span>
                            <span className="profile-data-value">{value}</span>
                        </div>
                    })
                }
            </div>
        </div>
        </div>
    </div>
}
export default Profile;