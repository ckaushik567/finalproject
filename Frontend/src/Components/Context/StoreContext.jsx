import { createContext,useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [linkModal, setLinkModal] = useState(false);
    const [dashModal,setDashModal] = useState(false);
    const [links,setLinks] = useState(false);
    const [menu, setMenu] = useState('dash');
    const [name,setName] = useState("");
    const [delModal,setDelModal] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [editId,setEditId] = useState();
    const [linksData, setLinksData] = useState([]);
    const [userId,setUserId] = useState();
    const [token,setToken] = useState();
    const [totalClicks,setTotalClicks] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [delId,setDelId] = useState();

    function handleOnUpdate(id){
        setIsUpdate(true);
        setEditId(id);
        setLinkModal(true)
    }


    const handleOnDel = async (delId) => {
        try {
          const response = await fetch(`https://finalproject-backend-y202.onrender.com/link/${delId}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data.message);
            setLinksData((prevLinks) => prevLinks.filter((link) => link._id !==delId));
            
          } else {
            console.error("Failed to delete the link");
          }
        } catch (err) {
          console.error("Error deleting the link:", err);
        }
      };

    const contextValue = {
        
        linkModal,
        setLinkModal,
        dashModal,
        setDashModal,
        links, 
        setLinks,
        menu,
        setMenu,
        name,
        setName,
        delModal,
        setDelModal,
        isUpdate,
        setIsUpdate,
        handleOnUpdate,
        editId,
        setEditId,
        linksData,
        setLinksData,
        userId,
        setUserId,
        token,
        setToken,
        totalClicks,
        setTotalClicks  ,
        searchQuery,
        setSearchQuery,
        handleOnDel,
        delId,
        setDelId 
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider