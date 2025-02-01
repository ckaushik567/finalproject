import React from 'react';
import settingpageCss from './Settingpage.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Setting from '../../Components/Settings/Setting';

function Settingpage() {
  return (
     <div className={settingpageCss.container}>
        <div className={settingpageCss.sidebar}>
            <Sidebar/>
        </div>
        <div className={settingpageCss.navbar}>
            <Navbar/>
            <Setting/>
        </div>
     </div>
  )
}

export default Settingpage
