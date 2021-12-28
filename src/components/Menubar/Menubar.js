import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Menubar.css';

import { setCurrentUser } from '../../actions/users';

function Menubar (props) {
    const { setCurrentUser, userDetails } = props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Link to={`/`} className={`noTextDecoration menuIcon menuIconHome`}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              title="Home"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to={`/add`} className={`noTextDecoration menuIcon menuIconAdd`}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="leaderboard"
              title="New Question"
            >
              <AddCircleIcon />
            </IconButton>
          </Link>
          <Link to={`/leaderboard`} className={`noTextDecoration menuIcon`}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="leaderboard"
              title="Leaderboard"
            >
              <AssessmentIcon />
            </IconButton>
          </Link>
          {userDetails?.name ? (
            <>
              <img
                src={userDetails ? userDetails.avatarURL : ""}
                alt={userDetails ? userDetails.name : ""}
                className={`menuUserProfile menuIcon`}
              />
              <Typography variant="subtitle2">
                {userDetails?.name || "Login"}
              </Typography>
              <Button
                color="inherit"
                className="menuLogout"
                onClick={() => setCurrentUser("")}
              >
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="subtitle2">{"Login"}</Typography>
          )}
        </Toolbar>
      </AppBar>
    );
}

export default connect(
    (state) => ({}),
    {
        setCurrentUser,
    },
)(Menubar);