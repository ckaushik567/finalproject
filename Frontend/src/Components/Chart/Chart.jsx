import React, { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { StoreContext } from '../Context/StoreContext';
import chartCss from './Chart.module.css';

const HorizontalBarChart = ({ data, title, yAxisKey }) => {
  return (
    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <h3 style={{ color: '#0000FF', margin: 0, fontSize: 16, display: 'flex', alignItems: 'start' }}>
        {title}
      </h3>
      <div style={{ flex: 1, margin: 0, padding:0 }}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart layout="vertical" data={data} margin={{ top: 0, left: 5, right: 30, bottom: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey={yAxisKey} axisLine={false} tickLine={false} width={80} tick={{ fontSize: 12, fill: '#000' }} />
            <Bar dataKey="value" fill="#0000FF" barSize={20}>
              <LabelList dataKey="value" position="right" style={{ fill: '#000', fontSize: 15 }} offset={10} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ChartsContainer = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  let totalVal=0
  const [dateWiseClicksData, setDateWiseClicksData] = useState([]);
  const [clickDevicesData, setClickDevicesData] = useState([]);
  const {totalClicks,setTotalClicks} = useContext(StoreContext);
  console.log(totalClicks)

  console.log(clickDevicesData);
  console.log(dateWiseClicksData);
  setTotalClicks(dateWiseClicksData[0]?.totalVal)

  useEffect(() => {
    const fetchDateWiseClicks = async () => {
      try {

        const response = await fetch("https://finalproject-backend-y202.onrender.com/clicksdata");
        const data = await response.json();
        console.log(data.data)
        setDateWiseClicksData(data.data.map(item=>({timestamp:formatDate(item.timestamp), value:item.clicks})))
        // setDateWiseClicksData(data.chartData.map(item => ({ timestamp: item.timestamp, value: item.value,totalVal : item.value+totalVal })));
      } catch (error) {
        console.error("Error fetching date-wise clicks:", error);
      }
    };
    const fetchClickDevices = async () => {
      try {
        const response = await fetch("https://finalproject-backend-y202.onrender.com/device-wise-analytics");
        const data = await response.json();
        setClickDevicesData(data.map(item => ({ device: item._id, value: item.totalClicks })));
      } catch (error) {
        console.error("Error fetching click devices data:", error);
      }
    };

    fetchDateWiseClicks();
    fetchClickDevices();
  }, []);

  return (
    <div className={chartCss.ChartsContainer} style={{  }}>
      <div style={{ width: '100%', border: "1px solid #ECECF2", height: "400px", padding: "10px", borderRadius: "6px" }}>
        <HorizontalBarChart data={dateWiseClicksData} title="Date-wise Clicks" yAxisKey="timestamp" />
      </div>
      <div style={{ width: '100%', border: "1px solid #ECECF2", height: "400px", padding: "10px", borderRadius: "6px" }}>
        <HorizontalBarChart data={clickDevicesData} title="Click Devices" yAxisKey="device" />
      </div>
    </div>
  );
};

export default ChartsContainer;











































// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';

// const dateWiseClicksData = [
//   { date: '21-01-25', value: 1234 },
//   { date: '20-01-25', value: 1140 },
//   { date: '19-01-25', value: 134 },
//   { date: '18-01-25', value: 34 },
// ];

// const clickDevicesData = [
//   { device: 'Mobile', value: 134 },
//   { device: 'Desktop', value: 40 },
//   { device: 'Tablet', value: 3 },
// ];

// const HorizontalBarChart = ({ data, title, yAxisKey }) => {
//   return (
//     <div
//       style={{
//         width: '80%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'stretch',
//         // margin: 0,
//         // padding: 0,
//       }}
//     >
//       {/* Title */}
//       <h3
//         style={{
//         //   textAlign: 'left',
//           color: '#0000FF',
//           margin: 0,
//           fontSize: 16,
//         //   height: 30, // Ensure consistent title height
//           display: 'flex',
//           alignItems: 'start',
//         }}
//       >
//         {title}
//       </h3>

//       {/* Chart */}
//       <div style={{ flex: 1, margin: 0, padding: 0 }}>
//         <ResponsiveContainer width="100%" height={220}>
//           <BarChart
//             layout="vertical"
//             data={data}
//             margin={{ top: 0, left: -30, right: 30, bottom: 0 }} // Remove extra top margin
//             // barCategoryGap="10%"
//           >
//             {/* X-Axis */}
//             <XAxis type="number" hide />
//             {/* Y-Axis */}
//             <YAxis
//               type="category"
//               dataKey={yAxisKey}
//               axisLine={false}
//               tickLine={false}
//               width={80}
//               tick={{ fontSize: 12, fill: '#000' }}
//             />
//             {/* Bars */}
//             <Bar dataKey="value" fill="#0000FF" barSize={40}>
//               {/* Value Labels */}
//               <LabelList
//                 dataKey="value"
//                 position="right"
//                 style={{ fill: '#000', fontSize: 15 ,display:'flex',alignItems:'end', justifyContent:"center"}}
//                 offset={10}
//               />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// const ChartsContainer = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         // alignItems: 'flex-start', // Aligns charts to the top
//         gap: '20px',
//         padding: '20px',
//       }}
//     >
//     <div style={{width:'100%', border:"1px solid #ECECF2",hight:"400px", padding:"10px",borderRadius:"6px"}}>
//       {/* First Chart */}
//       <HorizontalBarChart
//         data={dateWiseClicksData}
//         title="Date-wise Clicks"
//         yAxisKey="date"

//       />
//       </div>
//       {/* Second Chart */}
//       <div style={{width:'100%' ,border:"1px solid #ECECF2" , height:"400px",padding:"10px",borderRadius:"6px" }}>
//       <HorizontalBarChart
//         data={clickDevicesData}
//         title="Click Devices"
//         yAxisKey="device"
//       />
//       </div>
//     </div>
//   );
// };

// export default ChartsContainer;
