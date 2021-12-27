import React from "react";
import PropTypes from "prop-types"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import QuestionDetails from './components/QuestionDetails/QuestionDetails';
import NoMatch from './components/NoMatch/NoMatch';
import Menubar from './components/Menubar/Menubar';
import Leaderboard from './components/Leaderboard/Leaderboard';
import AddQuestion from './components/AddQuestion/AddQuestion';

function AppRoutes(props) {
  return (
        <BrowserRouter>   
            <Menubar />  
            {!props.currentUser     
            ?<Routes>        
                <Route path='/*' element={<Login />}/> 
            </Routes>
            :<Routes>        
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} /> 
                <Route path='/add' element={<AddQuestion />} /> 
                <Route path='/leaderboard' element={<Leaderboard />} /> 
                <Route path='/questions/:questionId' element={<QuestionDetails />} />
                <Route path='*' element={<NoMatch />} />)
            </Routes>}
        </BrowserRouter>
    );
}

AppRoutes.propTypes = {currentUser: PropTypes.string};

export default AppRoutes;