import React from 'react'
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signin/Signin'
import Sidebar from './Components/Sidebar/Sidebar'
import Navbar from './Components/Navbar/Navbar'
import HorizontalBarChart from './Components/Chart/Chart'
import HorizontalBarChart1 from './Components/Chart/Chart1'
import Dashboard from './Components/Dashboard/Dashboard'
import Linkmodal from './Components/Linkmodal/Linkmodal'
import Deletemodal from './Components/Deletemodal/Deletemodal'
import Setting from './Components/Settings/Setting'
import Links from './Components/Links/Links'
import Analytics from './Components/Analytics/Analytics'
import { Route, Routes } from 'react-router-dom'
import Dashboardpage from './Pages/Dashboard/Dashboardpage'
import Linkspage from './Pages/Links/Linkspage'
import Settingpage from './Pages/Setting/Settingpage'
import Analyticspage from './Pages/Analytics/Analyticspage'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/dashboard' element={<Dashboardpage/>}/>
        <Route path='/links' element={<Linkspage/>}/>
        <Route path='/setting' element={<Settingpage/>}/>
        <Route path='/analytics' element={<Analyticspage/>}/>
        <Route path='/gh' element={<Dashboard/>}/>
      <Route path='/nav' element={<Setting/>}/>
      </Routes >
      {/* <Signup/> */}
      {/* <Signin/> */}
      {/* <Sidebar/> */}
      {/* <Navbar/> */}
      {/* <HorizontalBarChart/> */}
      {/* <HorizontalBarChart1/> */}
      {/* <Dashboard/> */}
      {/* <Linkmodal/> */}
      {/* <Deletemodal/> */}
      {/* <Setting/> */}
      {/* <Links/> */}
      {/* <Analytics/> */}
    </div>
  )
}

export default App
