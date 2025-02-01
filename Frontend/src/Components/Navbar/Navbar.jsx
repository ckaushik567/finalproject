import React, { useContext,useState,useEffect } from 'react';
import navbarCss from './Navbar.module.css';
import sunImg from '../../assets/sun.png';
import plusIcon from '../../assets/plus.png';
import searchImg from '../../assets/searchIcon.png';
import { StoreContext } from '../Context/StoreContext';
function Navbar() {

    const {linkModal, setLinkModal,name,setSearchQuery,searchQuery} = useContext(StoreContext);
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    const newDate = Intl.DateTimeFormat('en-US', options).format(date);
    const [greeting, setGreeting] = useState('');

    console.log(ampm);
    console.log(hours);


    function handleOnModal() {
        setLinkModal(true);
    }
    const firstWord = name.split(' ')[0];
    const newName=firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();


    function handleOnSearch(){

    }
    useEffect(() => {
        const getGreeting = () => {
            if (hours < 12) {
                return "Good Morning";
            } else if (hours < 18) {
                return "Good Afternoon";
            } else {
                return "Good Evening";
            }
        };
        
        setGreeting(getGreeting());
    }, []);

    return (
        <div className={navbarCss.container}>
            <div className={navbarCss.infoSection}>
                {hours<18?  <img src={sunImg} />:<i class="fa-solid fa-moon"></i>}
                <div className={navbarCss.info}>
                    <h3>{greeting},{newName}</h3>
                    <p>{newDate}</p>
                </div>
            </div>
            <div className={navbarCss.searchSection}>
                <div className={navbarCss.mainSection}>
                    <div className={navbarCss.links}>
                        <img src={plusIcon} />
                        <p onClick={handleOnModal}>Create new</p>
                    </div>
                    <div className={navbarCss.search}>
                        <input type="text" placeholder="Search by remarks" onChange={(e)=>setSearchQuery(e.target.value)} />
                        <img onClick={handleOnSearch} src={searchImg} />
                    </div>
                </div>
                <div className={navbarCss.userName}>
                    <p>{name.slice(0,2).toUpperCase()}</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
