import React, { useContext, useState } from 'react';
import sidebarCss from './Sidebar.module.css';
import homeLogo from '../../assets/logo.png';
import dashImg from '../../assets/Icon.png';
import linkImg from '../../assets/icon1.png';
import analyticsImg from '../../assets/Icons.png';
import settingImg from '../../assets/Icons1.png';
import { StoreContext } from '../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate= useNavigate();

    const {menu, setMenu} = useContext(StoreContext);

    function handleOnDash(){
        navigate('/dashboard');
    }

    function handleOnLinks(){
        navigate('/links');
        setMenu('links')
    }
    function handleOnAnalytics(){
        navigate('/analytics');
        setMenu('analytics')
    }
    function handleOnSetting(){
        navigate('/setting');
        setMenu('setting');
    }
    let windowWidth = window.innerWidth;

    return (
        <>
        {windowWidth>=350 ?
        (<div className={sidebarCss.container}>
            <div className={sidebarCss.logo}>
                <img src={homeLogo} />
            </div>
            <div className={sidebarCss.midSection}>
                <div onClick={()=>setMenu('dash')} className={menu==='dash'?sidebarCss.dashboad:sidebarCss.dashboad1}>
                    <img src={dashImg} />
                    <p onClick={handleOnDash}>Dashboard</p>
                </div>
                <div onClick={handleOnLinks} className={menu==='links'?sidebarCss.dashboad:sidebarCss.dashboad1}>
                    <img src={linkImg} />
                    <p>Links</p>
                </div>
                <div onClick={handleOnAnalytics} className={menu==='analytics'?sidebarCss.dashboad:sidebarCss.dashboad1}>
                    <img src={analyticsImg} />
                    <p>Analytics</p>
                </div>
            </div>
            <div onClick={handleOnSetting} className={menu==='setting'?sidebarCss.dashboad:sidebarCss.dashboad1}>
                <img src={settingImg}/>
                <p>Settings</p>
            </div>
            {/* <div className={sidebarCss.hamberger}>
                <i class="fa-solid fa-bars"></i>
            </div> */}
        </div>)
        : (<div className={sidebarCss.sidebarConatiner}>
            <div className={sidebarCss.midSectionContainer}>
                <div onClick={()=>setMenu('dash')} className={menu==='dash'?sidebarCss.dashboad:sidebarCss.dashboad1}>
                    <img src={dashImg} />
                    <p onClick={handleOnDash}>Dashboard</p>
                </div>
                <div onClick={handleOnLinks} className={menu==='links'?sidebarCss.dashboad:sidebarCss.dashboad1}>
                    <img src={linkImg} />
                    <p>Links</p>
                </div>
                <div onClick={handleOnAnalytics} className={menu==='analytics'?sidebarCss.dashboad:sidebarCss.dashboad1}>
                    <img src={analyticsImg} />
                    <p>Analytics</p>
                </div>
                <div onClick={handleOnSetting} className={menu==='setting'?sidebarCss.dashboad:sidebarCss.dashboad1}>
                <img src={settingImg}/>
                <p>Settings</p>
            </div>
            </div>
        </div>)}
        </>
    )
}

export default Sidebar
