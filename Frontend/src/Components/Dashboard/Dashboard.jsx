import React, { useContext } from 'react';
import dashboardCss from './Dashboard.module.css';
import HorizontalBarChart from '../Chart/Chart';
import HorizontalBarChart1 from '../Chart/Chart1';
import { StoreContext } from '../Context/StoreContext';

function Dashboard() {
    const {totalClicks,setTotalClicks} = useContext(StoreContext);
    return (
        <div className={dashboardCss.container}>
            <div className={dashboardCss.totalClickSection}>
                <h2>Total Clicks</h2>
                <h2 id={dashboardCss.clickVal}>{totalClicks}</h2>
            </div>
            <div className={dashboardCss.clickDataSection}>
                <HorizontalBarChart />
            </div>
        </div>
    )
}

export default Dashboard
