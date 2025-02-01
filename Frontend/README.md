# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh






import React, { useContext, useEffect, useState } from "react";
import linksCss from "./Links.module.css";
import dropdownImg from "../../assets/Dropdown.png";
import copyImg from "../../assets/copy.png";
import delImg from "../../assets/del.png";
import { StoreContext } from "../Context/StoreContext";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck } from 'react-icons/fa';

function Links() {
  const { linksData, setLinksData, handleOnUpdate,setSearchQuery,searchQuery,delModal,setDelModal } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [linksPerPage] = useState(4);
  const [showToast, setShowToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState("");

  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/linkSearch?page=${currentPage}&limit=${linksPerPage}&search=${searchQuery}`);
        const data = await response.json();
        setLinksData(data.links);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching links data:", error);
      }
    };

    fetchLinkData();
  }, [currentPage, linksPerPage, searchQuery, setLinksData]);


  
 
  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/link?page=${currentPage}&limit=${linksPerPage}`);
        const data = await response.json();
        setLinksData(data.links);
        // setSearchQuery(data.links.URL);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching links data:", error);
      }
    };

    fetchLinkData();
  }, [currentPage, linksPerPage, setLinksData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };




    // const handleOnDel = async (id) => {
    //   try {
    //     const response = await fetch(`http://localhost:5000/link/${id}`, {
    //       method: "DELETE",
    //     });
  
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log(data.message);
    //       setDelModal(true);
    //       setLinksData((prevLinks) => prevLinks.filter((link) => link._id !== id));
          
    //     } else {
    //       console.error("Failed to delete the link");
    //     }
    //   } catch (err) {
    //     console.error("Error deleting the link:", err);
    //   }
    // };
  

  const handleLinkClick = async (id, link) => {
    try {
      const userAgent = navigator.userAgent.split(" ")[0];
      console.log("Extracted User-Agent:", userAgent);
      const trackClickResponse = await fetch("http://localhost:5000/trackClick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortLink: link,
          originalLink: link,
          userAgent: userAgent,
        }),
      });

      if (trackClickResponse.ok) {
        console.log("Click tracked successfully");
      } else {
        console.error("Failed to track click");
      }

      const patchResponse = await fetch(`http://localhost:5000/link/${id}/click`, {
        method: "PATCH",
      });

      if (patchResponse.ok) {
        const updatedLink = await patchResponse.json();
        console.log(updatedLink.message);

        setLinksData((prevLinks) =>
          prevLinks.map((link) =>
            link._id === id ? { ...link, clicks: updatedLink.link.clicks } : link
          )
        );
      } else {
        console.error("Failed to update click count");
      }
    } catch (err) {
      console.error("Error recording click:", err);
    }
  };


  // const handleCopy = (link) => {
  //   navigator.clipboard.writeText(link)
  //   .then(() => {
  //     toast.success("Link copied to clipboard!", {
  //       autoClose: 3000,  // The toast will automatically close after 3 seconds
  //     });
  //   })
  //   .catch((error) => console.error("Error copying text: ", error));
  //   navigator.clipboard.writeText(link)
  //     .then(() => {
  //       setCopiedLink(link);
  //       setShowToast(true);
  //       setTimeout(() => setCopiedLink(null), 2000);
  //     })
  //     .catch((error) => console.error("Error copying text: ", error));
  // };


    // Import check icon from react-icons



const handleCopy = (link) => {
  navigator.clipboard.writeText(link)
    .then(() => {
      toast.success(
        <div style={{ width:"10vw" ,display: 'flex', alignItems: 'center',color:"black",justifyContent:'center',alignContent:'center' }}>
          {/* <FaCheck style={{ color: 'blue', marginRight: '5px', background:"#1B48DA" }} /> */}
          Link copied
        </div>, 
        {
          position: "bottom-left",
          autoClose: 3000, 
          backgroundColor:"red",
          style: { 
            backgroundColor: 'white',
            color: 'white',
            borderRadius: '8px',       
            padding: '10px',
            fontSize: '14px',
            width:"20vw",
            border:'2px solid #1B48DA',
            textAlign:'center'
          }  
        }
      );

      setCopiedLink(link);
      setShowToast(true);

      setTimeout(() => {
        setCopiedLink(null);
        setShowToast(false);
      }, 2000);
    })
    .catch((error) => {
      console.error("Error copying text: ", error);
      toast.error("Failed to copy the link!", { 
        autoClose: 3000,
        position: "bottom-center",
        style: { 
          backgroundColor: '#FF5733',
          color: 'white',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '14px',
        }
      });
    });
};

  

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const delta = 2;

    let startPage = Math.max(1, currentPage - delta);
    let endPage = Math.min(totalPages, currentPage + delta);

    if (startPage > 1) pageNumbers.push(1);

    if (startPage > 2) pageNumbers.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) pageNumbers.push("...");

    if (endPage < totalPages) pageNumbers.push(totalPages);

    return pageNumbers;
  };

  return (
    <div className={linksCss.container}>
      {/* {showToast && (
        <div className={linksCss.toast}>
          <p>Link copied to clipboard!</p>
        </div>
      )} */}
      <table className={linksCss.table}>
        <thead>
          <tr>
            <th className={linksCss.date}>
              Date <img src={dropdownImg} alt="Sort" />
            </th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>Remarks</th>
            <th>Clicks</th>
            <th className={linksCss.date}>
              Status <img src={dropdownImg} alt="Sort" />
            </th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {linksData.map((link, index) => (
            <tr key={index}>
              <td>{link.Date}</td>
              <td>
                <a
                  href={link.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link._id, link.URL)}
                >
                  {link.URL}
                </a>
              </td>
              <td className={linksCss.shortLinks}>
                <a
                  href={link.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link._id)}
                >
                  {link.URL}
                </a>{" "}
                <img src={copyImg} alt="Copy" onClick={() => handleCopy(link.URL)} />
                
              </td>
              <td>{link.Remarks}</td>
              <td>{link.clicks || 0}</td>
              <td
                className={
                  link.Status === "Active" ? linksCss.active : linksCss.inactive
                }
              >
                {link.Status}
              </td>
              <td>
                <i
                  onClick={() => handleOnUpdate(link._id)}
                  className="fa-solid fa-pen"
                  title="Edit"
                ></i>
                <img
                  onClick={() => handleOnDel(link._id)}   //handleOnDel
                  src={delImg}
                  alt="Delete"
                  title="Delete"
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={linksCss.pagination}>
        <button className={linksCss.lt} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        
        {generatePageNumbers().map((page, index) => (
          <button
          className={page === currentPage ? linksCss.activePage : linksCss.nuberBtn}
            key={index}
            onClick={() => page !== "..." && handlePageChange(page)}
            disabled={page === currentPage || page === "..."}
            style={page === currentPage ? { fontWeight: 'bold' } : {}}
          >
            {page}
          </button>
        ))}
        
        <button className={linksCss.gt} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Links;























































































































//links





import React, { useContext, useEffect, useState } from "react";
import linksCss from "./Links.module.css";
import dropdownImg from "../../assets/Dropdown.png";
import copyImg from "../../assets/copy.png";
import delImg from "../../assets/del.png";
import { StoreContext } from "../Context/StoreContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck } from 'react-icons/fa';

function Links() {
  const { linksData, setLinksData, handleOnUpdate, setSearchQuery, searchQuery, delModal, setDelModal, delId, setDelId } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [linksPerPage] = useState(4);
  const [showToast, setShowToast] = useState(false);
  const [copiedLink, setCopiedLink] = useState("");

  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/linkSearch?page=${currentPage}&limit=${linksPerPage}&search=${searchQuery}`);
        const data = await response.json();
        setLinksData(data.links);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching links data:", error);
      }
    };

    fetchLinkData();
  }, [currentPage, linksPerPage, searchQuery, setLinksData]);



  function handleOnModal(id) {
    setDelModal(true);
    setDelId(id)
  }


  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/link?page=${currentPage}&limit=${linksPerPage}`);
        const data = await response.json();
        setLinksData(data.links);
        // setSearchQuery(data.links.URL);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching links data:", error);
      }
    };

    fetchLinkData();
  }, [currentPage, linksPerPage, setLinksData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };




  // const handleOnDel = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/link/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.message);
  //       setDelModal(true);
  //       setLinksData((prevLinks) => prevLinks.filter((link) => link._id !== id));

  //     } else {
  //       console.error("Failed to delete the link");
  //     }
  //   } catch (err) {
  //     console.error("Error deleting the link:", err);
  //   }
  // };


  const handleLinkClick = async (id, link) => {
    try {
      const userAgent = navigator.userAgent.split(" ")[0];
      console.log("Extracted User-Agent:", userAgent);
      const trackClickResponse = await fetch("http://localhost:5000/trackClick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortLink: link,
          originalLink: link,
          userAgent: userAgent,
        }),
      });

      if (trackClickResponse.ok) {
        console.log("Click tracked successfully");
      } else {
        console.error("Failed to track click");
      }

      const patchResponse = await fetch(`http://localhost:5000/link/${id}/click`, {
        method: "PATCH",
      });

      if (patchResponse.ok) {
        const updatedLink = await patchResponse.json();
        console.log(updatedLink.message);

        setLinksData((prevLinks) =>
          prevLinks.map((link) =>
            link._id === id ? { ...link, clicks: updatedLink.link.clicks } : link
          )
        );
      } else {
        console.error("Failed to update click count");
      }
      const response = await fetch(`http://localhost:5000/click`, {
        method: "POST",
        body: JSON.stringify({ linkId: `${id}` }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        console.log("Click recorded successfully!");
      } else {
        console.error("Failed to record click.");
      }
      
      const putResponse = await fetch(`http://localhost:5000/update-clicks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      
      if (putResponse.ok) {
        console.log("Click updated successfully!");
      } else {
        console.error("Failed to update record click.");
      }

  }
    catch (err) {
      console.error("Error recording click:", err);
    }
  };


  // const handleCopy = (link) => {
  //   navigator.clipboard.writeText(link)
  //   .then(() => {
  //     toast.success("Link copied to clipboard!", {
  //       autoClose: 3000,  // The toast will automatically close after 3 seconds
  //     });
  //   })
  //   .catch((error) => console.error("Error copying text: ", error));
  //   navigator.clipboard.writeText(link)
  //     .then(() => {
  //       setCopiedLink(link);
  //       setShowToast(true);
  //       setTimeout(() => setCopiedLink(null), 2000);
  //     })
  //     .catch((error) => console.error("Error copying text: ", error));
  // };


  // Import check icon from react-icons



  async function handleShortLinkClick(id){
    try{
    const shortUrl = await fetch(`http://localhost:5000/${id}`);
    const data = await shortUrl.json();
    console.log(data)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success(
          <div style={{ width: "10vw", display: 'flex', alignItems: 'center', color: "black", justifyContent: 'center', alignContent: 'center' }}>
            {/* <FaCheck style={{ color: 'blue', marginRight: '5px', background:"#1B48DA" }} /> */}
            Link copied
          </div>,
          {
            position: "bottom-left",
            autoClose: 3000,
            backgroundColor: "red",
            style: {
              backgroundColor: 'white',
              color: 'white',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '14px',
              width: "20vw",
              border: '2px solid #1B48DA',
              textAlign: 'center'
            }
          }
        );

        setCopiedLink(link);
        setShowToast(true);

        setTimeout(() => {
          setCopiedLink(null);
          setShowToast(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
        toast.error("Failed to copy the link!", {
          autoClose: 3000,
          position: "bottom-center",
          style: {
            backgroundColor: '#FF5733',
            color: 'white',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '14px',
          }
        });
      });
  };



  const generatePageNumbers = () => {
    const pageNumbers = [];
    
    // Always show the first page
    pageNumbers.push(1);
    
    // Show pages in the middle (only show "..." if necessary)
    if (currentPage === 1) {
      pageNumbers.push("...");
    }
    
    // Show the last two pages
    if (totalPages > 1) {
      pageNumbers.push(totalPages - 1);
      pageNumbers.push(totalPages);
    }
  
    return pageNumbers;
  };

  return (
    <div className={linksCss.container}>
      {/* {showToast && (
        <div className={linksCss.toast}>
          <p>Link copied to clipboard!</p>
        </div>
      )} */}
      <div className={linksCss.tableConatainer}>
      <table className={linksCss.table}>
        <thead>
          <tr>
            <th className={linksCss.date}>
              Date <img src={dropdownImg} alt="Sort" />
            </th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>Remarks</th>
            <th>Clicks</th>
            <th className={linksCss.date}>
              Status <img src={dropdownImg} alt="Sort" />
            </th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {linksData.map((link, index) => (
            <tr key={index}>
              <td>{link.Date}</td>
              <td>
                <a
                  href={link.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleLinkClick(link._id, link.URL)}
                >
                  {link.URL}
                </a>
              </td>
              <td className={linksCss.shortLinks}>
                <a
                  href={link.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleShortLinkClick(link.shortId)}
                >
                  {link.URL+'/'+link.shortId}
                </a>{" "}
                <img src={copyImg} alt="Copy" onClick={() => handleCopy(link.URL)} />

              </td>
              <td>{link.Remarks}</td>
              <td>{link.clicks || 0}</td>
              <td
                className={
                  link.Status === "Active" ? linksCss.active : linksCss.inactive
                }
              >
                {link.Status}
              </td>
              <td>
                <i
                  onClick={() => handleOnUpdate(link._id)}
                  className="fa-solid fa-pen"
                  title="Edit"
                ></i>
                <img
                  onClick={() => handleOnModal(link._id)}   //handleOnDel
                  src={delImg}
                  alt="Delete"
                  title="Delete"
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className={linksCss.pagination}>
        <button className={linksCss.lt} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>

        {generatePageNumbers().map((page, index) => (
          <button
            className={page === currentPage ? linksCss.activePage : linksCss.nuberBtn}
            key={index}
            onClick={() => page !== "..." && handlePageChange(page)}
            disabled={page === currentPage || page === "..."}
            style={page === currentPage ? { fontWeight: 'bold' } : {}}
          >
            {page}
          </button>
        ))}

        <button className={linksCss.gt} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Links;