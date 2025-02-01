import React, { useContext, useEffect } from 'react';
import dashboardpageCss from './Dashboardpage.module.css';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Linkmodal from '../../Components/Linkmodal/Linkmodal';
import { StoreContext } from '../../Components/Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../../Components/Dashboard/Dashboard';

function Dashboardpage() {
   const { linkModal, token } = useContext(StoreContext);
   const navigate = useNavigate();

   // useEffect(() => {
   //    if (!token) {
   //       alert('You need to sign up or log in to access this page.');
   //       navigate('/');
   //    }
   // }, [token, navigate]);

   return (
      <div className={dashboardpageCss.container}>
         {token && (
            <>
               {linkModal ? (
                  <div className={dashboardpageCss.modalContainer}>
                     <div className={dashboardpageCss.linkModalOverlay} />
                     <div className={dashboardpageCss.linkModalContent}>
                        <Linkmodal />
                     </div>
                  </div>
                   
               ) : null}
         <div className={dashboardpageCss.sidebarContainer}>
            <Sidebar />
         </div>
         <div className={dashboardpageCss.navbarContainer}>
            <Navbar />
            <div className={dashboardpageCss.dashboardContainer}>
               <Dashboard />
            </div>
         </div>
      </>
   )
}
      </div >
   );
}

export default Dashboardpage;

















// import React, { useContext } from 'react';
// import dashboardpageCss from './Dashboardpage.module.css';
// import Navbar from '../../Components/Navbar/Navbar';
// import Sidebar from '../../Components/Sidebar/Sidebar';
// import Dashboard from '../../Components/Dashboard/Dashboard';
// import Linkmodal from '../../Components/Linkmodal/Linkmodal';
// import { StoreContext } from '../../Components/Context/StoreContext';
// import { useNavigate } from 'react-router-dom';

// function Dashboardpage() {

//    const {linkModal,token} = useContext(StoreContext);
//    const navigate = useNavigate();
//    return (
//       <div className={dashboardpageCss.container}>
//          { token ?
//          <>
//          {linkModal?
//          <div className={dashboardpageCss.modalContainer}>
//             <Linkmodal/>
//          </div>
//          :null}
//          <div className={dashboardpageCss.sidebarContainer}>
//             <Sidebar />
//          </div>
//          <div className={dashboardpageCss.navbarContainer}>
//             <Navbar />
//             {/* <Dashboard /> */}
//          </div> </>
//          : alert(navigate('/'))}
//       </div>

//    )
// }

// export default Dashboardpage
