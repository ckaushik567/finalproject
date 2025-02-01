import React, { useContext } from 'react';
import DeletModalCss from './Deletemodal.module.css';
import { StoreContext } from '../Context/StoreContext';

function Deletemodal() {
    const {setDelModal,handleOnDel,delId} = useContext(StoreContext);

    function handleOnYes(){
         handleOnDel(delId);
         setDelModal(false);
    }

    function handleOnNo(){
        setDelModal(false);
    }

    function handleOnCross(){
        setDelModal(false);
    }
  return (
     <div className={DeletModalCss.container}>
        <div className={DeletModalCss.modal}>
        <i onClick={handleOnCross} class="fa-solid fa-xmark"></i>
            <div className={DeletModalCss.modalContent}>
                <h2>Are you sure you want to delete this?</h2>
                <div className={DeletModalCss.btnSection}>
                    <button onClick={handleOnNo} className={DeletModalCss.btn}>No</button>
                    <button onClick={handleOnYes} className={DeletModalCss.btnNo}>Yes</button>
                </div>
            </div>
        </div>
     </div>
  )
}

export default Deletemodal
