import React, { useContext, useState } from 'react';
import linkmodalCss from './Linkmodal.module.css';
import { StoreContext } from '../Context/StoreContext';

function Linkmodal() {
    const { setLinkModal,editId,isUpdate,setIsUpdate,linksData,setLinksData,userId } = useContext(StoreContext);

    const [inputData, setInputData] = useState({
        URL: '',
        Remarks: '',
        LinkExpiration: '',
    });

    const [error, setError] = useState({});

    function handleOnInput(e) {
        const { name, value } = e.target;

        // Update input data
        setInputData({
            ...inputData,
            [name]: value,
        });

        // Clear error for the specific field
        if (error[name]) {
            setError({
                ...error,
                [name]: '',
            });
        }
    }

    async function handleOnError() {
        const error = {};
    
        // Frontend validation
        if (inputData.URL.trim() === '') {
            error.URL = 'Destination URL is required';
        }
        if (inputData.Remarks.trim() === '') {
            error.Remarks = 'Remarks are required';
        }
        if (inputData.LinkExpiration.trim() === '') {
            error.LinkExpiration = 'Expiry date is required';
        }
        if (Object.keys(error).length > 0) {
            setError(error);
            return;
        }
    
        try {
            const method = isUpdate ? 'PUT' : 'POST';
            const url = isUpdate
                ? `http://localhost:5000/link/${editId}` // Use the ID for PUT (update)
                : 'http://localhost:5000/link';
            const res = await fetch(url, {
                method: method,
                body: JSON.stringify(inputData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = await res.json();
    
            if (res.ok) {
                if (isUpdate) {
                    setLinksData((prevLinksData) =>
                        prevLinksData.map((link) =>
                            link._id === data.link._id ? data.link : link // Update the matching link
                        )
                    );
                } else {
                    setLinksData((prevLinksData) => [...prevLinksData, data.link]);
                }
    
                setIsUpdate(false);
                setLinkModal(false);
                console.log('Link operation successful:', data);
            } else if (res.status === 401) {
                setError({ URL: data.message });
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }
    

    function handleOnCross() {
        setLinkModal(false);
    }

    return (
        <div className={linkmodalCss.container}>
            <div className={linkmodalCss.firtSection}>
                <div className={linkmodalCss.mainContainer}>
                    <div className={linkmodalCss.header}>
                        <h3>Link</h3>
                        <i onClick={handleOnCross} className="fa-solid fa-xmark"></i>
                    </div>
                    <div className={linkmodalCss.destinationUrl}>
                        <h3>Destination URL <span>*</span></h3>
                        <input
                            name="URL"
                            type="text"
                            placeholder="Enter URL"
                            onChange={handleOnInput}
                        />
                        <span>{error.URL}</span>
                    </div>
                    <div className={linkmodalCss.remarks}>
                        <h3>Remarks <span>*</span></h3>
                        <textarea
                            name="Remarks"
                            placeholder="Add remarks"
                            onChange={handleOnInput}
                        ></textarea>
                        <span>{error.Remarks}</span>
                    </div>
                    <div className={linkmodalCss.linkExpsection}>
                        <div className={linkmodalCss.linkExp}>
                            <h3>Link Expiration</h3>
                            <div className={linkmodalCss.toggleBtn}>
                                <label className={linkmodalCss.toggleSwitch}>
                                    <input type="checkbox" />
                                    <span className={linkmodalCss.slider}></span>
                                </label>
                            </div>
                        </div>
                        <div className={linkmodalCss.expiryDate}>
                            <input
                                type="date"
                                name="LinkExpiration"
                                placeholder="Jan 15, 2025 10:15"
                                onChange={handleOnInput}
                            />
                            <span>{error.LinkExpiration}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={linkmodalCss.secondSection}>
                <div className={linkmodalCss.btnSection}>
                    <button id={linkmodalCss.clear}>Clear</button>
                    <button id={linkmodalCss.createNew} onClick={handleOnError}>
                        Create New
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Linkmodal;
