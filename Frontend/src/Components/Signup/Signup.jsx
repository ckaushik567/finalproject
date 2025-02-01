import React, { useContext, useState } from 'react';
import signupCss from './Signup.module.css';
import userImg from '../../assets/userImg.png';
import logoIcon from '../../assets/logo.png';
import { useNavigate,Link } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

function Signup() {

    const [inputData, setInputData] = useState({
        Name: "",
        Email: "",
        Mobile: "",
        Password: "",
        ConfirmPassword: ""
    });

    const [error, setError] = useState({});
    const navigate = useNavigate();
    const{name,setName,userId,setUserId,token,setToken} = useContext(StoreContext);
    console.log(userId)

    function handleOnInput(e) {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    }

    async function handleOnError() {
        const res = await fetch('https://finalproject-backend-y202.onrender.com/signup', {
            method: 'POST',
            body: JSON.stringify(inputData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        if(res.ok){
            setToken(data.token);
            setName(data.user.Name);
            setUserId(data.user._id);
            localStorage.setItem('token',data.token);
        }
        const error = {};
        if (inputData.Name === "") {
            error.Name = "Name is required";
        }
        if (inputData.Email === "") {
            error.Email = "Email is required";
        }
        else if(res.status==401){
            error.Email=data.message
        }
        if (inputData.Mobile === "") {
            error.Mobile = "Mobile is required";
        }
        if (inputData.Password === "") {
            error.Password = "Password is required";
        }
        else if(res.status==400){
            error.password=data.message;
        }
        if (inputData.ConfirmPassword === "") {
            error.ConfirmPassword = "Confirm Password is required";
        }
        else if(res.status==400){
            error.ConfirmPassword=data.message;
        }
        setError(error);
        if(res.ok){
            navigate('/dashboard');
        }
        
    }

    function handleOnSignup(){
        navigate('/')
    }

    function handleOnSignin(){
        navigate('/signin')
    }

    return (
        <div className={signupCss.container}>
            <div className={signupCss.imgSection}>
                <img id={signupCss.bgImg} src={userImg} />
                <img id={signupCss.logo} src={logoIcon} />
            </div>
            <div className={signupCss.formSection}>
                <div className={signupCss.btnSection}>
                    <button className={signupCss.btn} onClick={handleOnSignup}>Sign Up</button>
                    <button className={signupCss.btnLogin} onClick={handleOnSignin}>Login</button>
                </div>
                <div className={signupCss.formContainer}>
                    <h1>Join us Today</h1>
                    <div className={signupCss.inputData}>
                        <div className={signupCss.input}>
                            <input name='Name' type="text" placeholder="Name" onChange={handleOnInput} />
                            <span>{error.Name}</span>
                        </div>
                        <div className={signupCss.input}>
                            <input name="Email" type="email" placeholder="Email" onChange={handleOnInput} />
                            <span>{error.Email}</span>
                        </div>
                        <div className={signupCss.input}>
                            <input name='Mobile' type="email" placeholder="Mobile no" onChange={handleOnInput} />
                            <span>{error.Mobile}</span>
                        </div>
                        <div className={signupCss.input}>
                            <input name='Password' type="password" placeholder="Password" onChange={handleOnInput} />
                            <span>{error.Password}</span>
                        </div>
                        <div className={signupCss.input}>
                            <input name='ConfirmPassword' type="password" placeholder="Confirm Password" onChange={handleOnInput} />
                            <span>{error.ConfirmPassword}</span>
                        </div>
                        <button onClick={handleOnError}>Sign Up</button>
                    </div>
                    <p>Already have an account? <Link className={signupCss.link} to='/signin'>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup
