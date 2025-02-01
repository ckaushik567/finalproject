import React, { useEffect, useState } from "react";
import analyticsCss from "./Analytics.module.css";
import dropdownImg from "../../assets/Dropdown.png";
import copyImg from "../../assets/copy.png";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(
          `https://finalproject-backend-y202.onrender.com/analytics?page=${currentPage}&limit=4`
        );
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data.analytics);
          setTotalPages(data.pagination.totalPages);
        } else {
          console.error("Failed to fetch analytics data");
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalyticsData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const generatePageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(1);
    
    if (currentPage >3) {
      pageNumbers.push("...");
    }
    
    if (totalPages > 1) {
      pageNumbers.push(totalPages - 1);
      pageNumbers.push(totalPages);
    }
  
    return pageNumbers;
  };
  

  return (
    <div className={analyticsCss.container}>
      <div className={analyticsCss.tableConatainer}>
      <table className={analyticsCss.table}>
        <thead>
          <tr>
            <th>
              Timestamp <img src={dropdownImg} alt="Sort" />
            </th>
            <th>Original Link</th>
            <th>Short Link</th>
            <th>IP Address</th>
            <th>User Device</th>
          </tr>
        </thead>
        <tbody>
          {analyticsData.length > 0 ? (
            analyticsData.map((row, index) => (
              <tr key={index}>
                <td>{row.timestamp}</td>
                <td>{row.originalLink}</td>
                <td>
                  <div className={analyticsCss.shortLink}>
                    {row.shortLink}
                    {/* <img src={copyImg} alt="Copy" /> */}
                  </div>
                </td>
                <td>{row.ipAddress}</td>
                <td>{row.userDevice}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No analytics data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <div className={analyticsCss.pagination}>
        <button
         className={analyticsCss.lt}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? analyticsCss.activePage : analyticsCss.nuberBtn}
          >
            {page}
          </button>
        ))}
        <button
        className={analyticsCss.gt}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Analytics;







































// import React, { useEffect, useState } from "react";
// import analyticsCss from "./Analytics.module.css";
// import dropdownImg from "../../assets/Dropdown.png";
// import copyImg from "../../assets/copy.png";

// function Analytics() {
//   const [analyticsData, setAnalyticsData] = useState([]);

//   useEffect(() => {
//     const fetchAnalyticsData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/analytics");
//         if (response.ok) {
//           const data = await response.json();
//           setAnalyticsData(data.analytics);
//         } else {
//           console.error("Failed to fetch analytics data");
//         }
//       } catch (error) {
//         console.error("Error fetching analytics data:", error);
//       }
//     };

//     fetchAnalyticsData();
//   }, []);

//   return (
//     <div className={analyticsCss.container}>
//       <table className={analyticsCss.table}>
//         <thead>
//           <tr>
//             <th>
//               Timestamp <img src={dropdownImg} alt="Sort" />
//             </th>
//             <th>Original Link</th>
//             <th>Short Link</th>
//             <th>IP Address</th>
//             <th>User Device</th>
//           </tr>
//         </thead>
//         <tbody>
//           {analyticsData.length > 0 ? (
//             analyticsData.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.timestamp}</td>
//                 <td>{row.originalLink}</td>
//                 <td>
//                   <div className={analyticsCss.shortLink}>
//                     {row.shortLink}
//                     <img src={copyImg} alt="Copy" />
//                   </div>
//                 </td>
//                 <td>{row.ipAddress}</td>
//                 <td>{row.userDevice}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" style={{ textAlign: "center" }}>
//                 No analytics data available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Analytics;
