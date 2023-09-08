import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';


/* --- pages ---*/
import MainPage from '../pages/MainPage';
import LogIn from '../pages/LogIn';
import Result from '../pages/Result';

function Routerz() {

    return (

            <Routes>
                <Route exact path={`/`} element={<LogIn />}></Route>
                <Route exact path={`/home`} element={<LogIn />}></Route>
                <Route exact path={`/analysis`} element={<MainPage />}></Route>
                <Route exact path={`/results`} element={<Result />}></Route>

                <Route exact path={`*`} element={<h1>Page not found</h1>}></Route>
            </Routes>

    )


}


export default Routerz;