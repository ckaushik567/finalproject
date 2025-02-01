import React, { useContext } from 'react';
import linkspageCss from './Linkspage.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Links from '../../Components/Links/Links';
import { StoreContext } from '../../Components/Context/StoreContext';
import Deletemodal from '../../Components/Deletemodal/Deletemodal';
import Linkmodal from '../../Components/Linkmodal/Linkmodal';
import { useNavigate } from 'react-router-dom';

function Linkspage() {
    const { delModal, token } = useContext(StoreContext);
    const { linkModal } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className={linkspageCss.container}>
            {token && (
                <>
                    {linkModal && (
                        <div className={linkspageCss.linkModalContainer}>
                            <div className={linkspageCss.linkModalOverlay} />
                            <div className={linkspageCss.linkModalContent}>
                                <Linkmodal />
                            </div>
                        </div>
                    )}
                    {delModal && (
                        <div className={linkspageCss.delModalContainer}>
                            <div className={linkspageCss.delModalOverlay} />
                            <div className={linkspageCss.delModalContent}>
                                <Deletemodal />
                            </div>
                        </div>
                    )}
                    <div className={linkspageCss.sidebarContainer}>
                        <Sidebar />
                    </div>
                    <div className={linkspageCss.navbarContainer}>
                        <Navbar />
                        <Links />
                    </div>
                </>
            )}
        </div>
    );
}

export default Linkspage;



















































// import React, { useContext, useEffect } from 'react';
// import linkspageCss from './Linkspage.module.css';
// import Sidebar from '../../Components/Sidebar/Sidebar';
// import Navbar from '../../Components/Navbar/Navbar';
// import Links from '../../Components/Links/Links';
// import { StoreContext } from '../../Components/Context/StoreContext';
// import Deletemodal from '../../Components/Deletemodal/Deletemodal';
// import Linkmodal from '../../Components/Linkmodal/Linkmodal';
// import { useNavigate } from 'react-router-dom';

// function Linkspage() {
//     const { delModal, token } = useContext(StoreContext);
//     const { linkModal, } = useContext(StoreContext);
//     const navigate = useNavigate();

//     // useEffect(() => {
//     //     // Redirect unauthenticated users
//     //     if (!token) {
//     //         alert('You need to sign up or log in to access this page.');
//     //         navigate('/');
//     //     }
//     // }, [token, navigate]);

//     return (
//         <div className={linkspageCss.container}>
//             {token && (
//                 <>
//                     {linkModal ? (
//                         <div className={linkspageCss.linkModalContainer}>
//                             <div className={linkspageCss.linkModalSection}>
//                             <div className={linkspageCss.linkModalContent}>
//                                 <Linkmodal />
//                             </div>
//                             </div>
//                         </div>
//                     ) : null}
//                     {delModal ? (
//                         <div className={linkspageCss.delModalContainer}>
//                             <Deletemodal />

//                         </div>
//                     ) : null}
//                     <div className={linkspageCss.sidebarContainer}>
//                         <Sidebar />
//                     </div>
//                     <div className={linkspageCss.navbarContainer}>
//                         <Navbar />
//                         <Links />
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default Linkspage;






























// import React, { useContext } from 'react';
// import linkspageCss from './Linkspage.module.css';
// import Sidebar from '../../Components/Sidebar/Sidebar';
// import Navbar from '../../Components/Navbar/Navbar';
// import Links from '../../Components/Links/Links';
// import { StoreContext } from '../../Components/Context/StoreContext';
// import Deletemodal from '../../Components/Deletemodal/Deletemodal';
// import Linkmodal from '../../Components/Linkmodal/Linkmodal';
// import { useNavigate } from 'react-router-dom';

// function Linkspage() {
//     const {links,delModal,token} = useContext(StoreContext);
//     const {linkModal} = useContext(StoreContext);
//     const navigate = useNavigate();

//    useEffect(() => {
//       if (!token) {
//          alert('You need to sign up or log in to access this page.');
//          navigate('/');
//       }
//    }, [token, navigate]);

//   return (
//      <div className={linkspageCss.container}>
//         {token && (
//             <>
//         {linkModal?
//         <div className={linkspageCss.linkModalContainer}>
//             <Linkmodal/>
//         </div>:null}
//         {delModal?
//         <div className={linkspageCss.delModal}>
//             <Deletemodal/>
//         </div>:null}
//         <div className={linkspageCss.sidebarContainer}>
//             <Sidebar/>
//         </div>
//         <div className={linkspageCss.navbarContainer}>
//             <Navbar/>
//             <Links/>
//         </div>
//          )} </></div>
//   )
// }

// export default Linkspage
