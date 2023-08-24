import React, { useEffect, useState } from "react";
import { SignUpService } from "../../services/signup";
import { Button } from "../CustomComponents/Button";
import { InputField, InputValueType } from "../CustomComponents/InputField";
import { withSpalashScreen } from "../SplashScreen";
import '../../styles/SignUp.css';
import { useNavigate } from "react-router-dom";



const SignUp = ()=>{
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const signupHandler = ()=>{
        SignUpService.signup({fullName, email, password, dob, phoneNumber, securityAnswer, address, city, country, zipCode, state}).then(()=>{
            navigate('/login')
        }).catch((e)=> setError(e.toString() ));
    }
    useEffect(()=>{
        setError('');
    },[fullName, email, dob, password, confirmPassword, phoneNumber, address, city, state, zipCode, country])
    const renderSignUpContainer = ()=>{
        return <div className="signup-container">
        <div className="signup-title-container">
        <span className="greeting-text">Welcome</span>
        <span className="signup-text">SignUp</span>
        </div>
        <div className="signup-fields">
            <InputField
            title="Full Name"
            value={fullName}
            onValueUpdate={(value) => setFullName(value as string)}
            placeholder="Enter full name"
            isRequired={true}
            minLength={1}
            maxLength={50}
        />

        <InputField
            title="Email"
            value={email}
            onValueUpdate={(value) => setEmail(value as string)}
            type="email"
            placeholder="Enter email"
            isRequired={true}
            minLength={1}
        />

        <InputField
            title="Date of Birth"
            value={dob}
            onValueUpdate={(value) => setDob(value as string)}
            type="date"
            placeholder="Select date"
            isRequired={true}
        />

        <InputField
            title="Password"
            value={password}
            onValueUpdate={(value) => setPassword(value as string)}
            type="password"
            placeholder="Enter password"
            isRequired={true}
            minLength={8}
            validate={passwordValidate}
        />

            <InputField
                title="Confirm Password" 
                value={confirmPassword} 
                type={'password'}
                onValueUpdate={(value)=>{
                    setConfirmPassword(value  as string);
                }}
                placeholder={'Enter password'}
                isRequired={true}
                minLength={8}
                validate={(value)=>{
                    
                    return passwordValidate(value) || password !== value?'Password and confirm password should be same': ''
                }}
            />
                
        <InputField
            title="Phone Number"
            value={phoneNumber}
            onValueUpdate={(value) => setPhoneNumber(value as string)}
            placeholder="Enter phone number"
            isRequired={true}
            minLength={10}
            maxLength={10}
        />

        <InputField
            title="Security Question"
            subTitle="What is your school name ?"
            value={securityAnswer}
            onValueUpdate={(value) => setSecurityAnswer(value as string)}
            placeholder="Enter answer for security question"
            isRequired={true}
            minLength={1}
            maxLength={100}
        />

        <InputField
            title="Address"
            value={address}
            onValueUpdate={(value) => setAddress(value as string)}
            placeholder="Enter address"
            className="address-input"
            isRequired={true}
            minLength={1}
            maxLength={100}
        />

        <InputField
            title="City"
            value={city}
            onValueUpdate={(value) => setCity(value as string)}
            placeholder="Enter city"
            className="additional-address-input"
            isRequired={true}
            minLength={1}
        />

        <InputField
            title="State"
            value={state}
            onValueUpdate={(value) => setState(value as string)}
            placeholder="Enter state"
            className="additional-address-input"
            isRequired={true}
            minLength={1}
        />

        <InputField
            title="ZIP Code"
            value={zipCode}
            onValueUpdate={(value) => setZipCode(value as string)}
            placeholder="Enter ZIP code"
            className="additional-address-input"
            isRequired={true}
            maxLength={6}
            minLength={6}
        />

        <InputField
            title="Country"
            value={country}
            onValueUpdate={(value) => setCountry(value as string)}
            placeholder="Enter country"
            className="additional-address-input"
            isRequired={true}
        />

        </div>
        {error && <div className="singup-error">
            {error}
            </div>}
        <Button label="Sign up" onClick={signupHandler} type={'submit'}/>
        <div className="signup-login"><span >Already have an account ?</span><a href="/login">login</a></div>
    </div>
    }
    return withSpalashScreen(renderSignUpContainer())
}
const passwordValidate = (password: InputValueType)=>{
    return !password.toString().match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)?
    'Password must be at least 8 characters long, with at least one uppercase letter and one digit.': ''
}
export default SignUp;