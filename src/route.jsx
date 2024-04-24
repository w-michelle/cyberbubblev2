import {  Route, Routes } from "react-router-dom"

import Productive from "./components/Productive"
import Log from "./components/Log"
import Airplane from "./components/Airplane"


import Home from "./components/Home"

export const RouterConfig = () => {
    return (
        <>
         
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/productive" element={<Productive/>} />
                    <Route path="/log" element={<Log />} />
                    <Route path="/airplane" element={<Airplane />} />
                </Routes>
            
      
        </>
    )
}