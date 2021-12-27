import React from "react";
import PropTypes from "prop-types"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from './home/Home';
import Login from './components/Login/Login';
// import Questions from './questions/Questions';
// import NoMatch from './noMatch/NoMatch';
import Menubar from './components/Menubar/Menubar';
// import Leaderboard from './leaderboard/Leaderboard';
// import AddQuestion from './addQuestion/AddQuestion';

function AppRoutes(props) {
  return (
        <BrowserRouter>   
            <Menubar />      
            <Routes>        
                {!props.currentUser ? <Route path='/*' element={<Login />}/> : null}
                {/* <Route path='/' element={<Home />} /> */}
                {/* <Route path='/login' element={<Login />} /> */}
                {/* <Route path='/add' element={<AddQuestion />} /> */}
                {/* <Route path='/leaderboard' element={<Leaderboard />} /> */}
                {/* <Route path='/questions/:questionId' element={<Questions />} /> */}
                {/* <Route element={<NoMatch />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

AppRoutes.propTypes = {currentUser: PropTypes.string};

export default AppRoutes;