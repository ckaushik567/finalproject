import React, { useContext, useState } from 'react';
import signinCss from './Signin.module.css';
import userImg from '../../assets/userImg.png';
import logoIcon from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

function Signin() {

    const [inputData, setInputData] = useState({
        Email: "",
        Password: "",
    });
    const {name,setName,setUserId,setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    const [error, setError] = useState({});

    function handleOnInput(e) {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    }

    async function handleOnError() {
        const res = await fetch('https://finalproject-backend-y202.onrender.com/signin', {
            method: 'POST',
            body: JSON.stringify(inputData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        if (res.ok) {
            setToken(data.token);
            console.log(data);
            console.log(data.Name)
            setName(data.Name);
            setUserId(data.id)
            localStorage.setItem('token', data.token);
        }
        const error = {};
        if (inputData.Email === "") {
            error.Email = "Email is required";
        }
        else if(res.status==400){
            error.Email=data.message
        }
        if (inputData.Password === "") {
            error.Password = "Password is required";
        }
        else if(res.status==404){
            error.Password=data.message
        }
        setError(error);
        if(res.ok){
            navigate('/dashboard');
        }
    }

    return (
        <div className={signinCss.container}>
            <div className={signinCss.imgSection}>
                <img id={signinCss.bgImg} src={userImg} />
                <img id={signinCss.logo} src={logoIcon} />
            </div>
            <div className={signinCss.formSection}>
                <div className={signinCss.btnSection}>
                    <button className={signinCss.btn}>Sign Up</button>
                    <button className={signinCss.btnLogin}>Login</button>
                </div>
                <div className={signinCss.formContainer}>
                    <h3>Login</h3>
                    <div className={signinCss.inputData}>
                        <div className={signinCss.input}>
                            <input name='Email' type="email" placeholder="Email" onChange={handleOnInput} />
                            <span>{error.Email}</span>
                        </div>
                        <div className={signinCss.input}>
                            <input name='Password' type="password" placeholder="Password" onChange={handleOnInput} />
                            <span>{error.Password}</span>
                        </div>
                        <button onClick={handleOnError}>Register</button>
                    </div>
                    <p>Already have an account? <Link className={signinCss.link} to='/'>SignUp</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin
