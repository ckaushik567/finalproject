import React, { useContext, useState } from 'react';
import settingCss from './Setting.module.css';
import { StoreContext } from '../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

function Setting() {
    const { userId,setName } = useContext(StoreContext);
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        Name: "",
        Email: "",
        Mobile: ""
    });
    const [error, setError] = useState({});

    function handleOnInput(e) {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });

        // Clear the error for the current field
        if (error[e.target.name]) {
            setError({
                ...error,
                [e.target.name]: ""
            });
        }
    }

    async function handleOnDel(){
        const res = await fetch(`https://finalproject-backend-y202.onrender.com/user/${userId}`, {
            method: "DELETE",
            body: JSON.stringify(inputData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        if(res.ok){
            navigate('/')
        }
    }

    async function handleOnSetting() {
        let error = {};
        if (inputData.Name.trim() === "") {
            error.Name = "This field is required";
        }
        if (inputData.Email.trim() === "") {
            error.Email = "This field is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputData.Email)) {
            error.Email = "Invalid email format";
        }
        if (inputData.Mobile.trim() === "") {
            error.Mobile = "This field is required";
        } else if (!/^\d{10}$/.test(inputData.Mobile)) {
            error.Mobile = "Mobile number must be 10 digits";
        }

        if (Object.keys(error).length > 0) {
            setError(error);
            return;
        }

        try {
            const res = await fetch(`https://finalproject-backend-y202.onrender.com/user/${userId}`, {
                method: "PUT",
                body: JSON.stringify(inputData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.ok) {
                setError({});
                setName(data.user.Name);
                // Optionally, clear the input fields
                // setInputData({ Name: "", Email: "", Mobile: "" });
            } else if (res.status === 400 || res.status === 401) {
                setError({ Email: data.message });
            }
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    }

    return (
        <div className={settingCss.container}>
            <div className={settingCss.inputSection}>
                <div className={settingCss.inputData}>
                    <label htmlFor="">Name</label>
                    <div className={settingCss.commonInput}>
                        <input
                            name="Name"
                            type="text"
                            placeholder="Name"
                            value={inputData.Name}
                            onChange={handleOnInput}
                        />
                        <span>{error.Name}</span>
                    </div>
                </div>
                <div className={settingCss.inputData}>
                    <label htmlFor="">Email ID</label>
                    <div className={settingCss.commonInput}>
                        <input
                            name="Email"
                            type="text"
                            placeholder="example@gmail.com"
                            value={inputData.Email}
                            onChange={handleOnInput}
                        />
                        <span>{error.Email}</span>
                    </div>
                </div>
                <div className={settingCss.inputData}>
                    <label htmlFor="">Mobile No</label>
                    <div className={settingCss.commonInput}>
                        <input
                            name="Mobile"
                            type="text"
                            placeholder="1234567890"
                            value={inputData.Mobile}
                            onChange={handleOnInput}
                        />
                        <span>{error.Mobile}</span>
                    </div>
                </div>
            </div>
            <div className={settingCss.btnSection}>
                <button className={settingCss.save} onClick={handleOnSetting}>
                    Save Changes
                </button>
                <button className={settingCss.del} onClick={handleOnDel} >Delete Account</button>
            </div>
        </div>
    );
}

export default Setting;
