import React from 'react';
import analyticspageCss from './Analyticspage.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import Links from '../../Components/Links/Links';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Analytics from '../../Components/Analytics/Analytics';

function Analyticspage() {
  return (
     <div className={analyticspageCss.container}>
        <div className={analyticspageCss.sidebarContainer}>
            <Sidebar/>
        </div>
        <div className={analyticspageCss.navbarContainer}>
            <Navbar/>
            <Analytics/>
        </div>
     </div>
  )
}

export default Analyticspage
