import React from 'react';
import {Link} from 'react-router-dom'

import './NoMatch.css';

export default function NoMatch () {
    return (
        <div className='noMatchContainer'>
            <div className='noMatchText'>
                Oops! No Match found!
            </div>
            <Link to="/">Home</Link>
        </div>
    );
}
