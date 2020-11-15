import React, { useContext } from 'react'
import '../css/Sidebar.css'
import SidebarOptions from './SidebarOptions';
import TwitterIcon from '@material-ui/icons/Twitter'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import ListAltIcon from '@material-ui/icons/ListAlt'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';


const Sidebar=()=>{

    const {state,dispatch} = useContext(UserContext);
    const history = useHistory();

    const logout = ()=>{
        localStorage.clear();
        dispatch({type:"CLEAR"});
        history.push('/s-signin');

    }

    return(
        <div className="sidebar">
            <Link to="/s-home" style={{textDecoration:"none", color:"#50b7f5" }}><TwitterIcon className="sidebar__shoutoutIcon"/></Link>
            <Link to="/s-home" style={{textDecoration:"none", color:"#50b7f5" }}><SidebarOptions active Icon={HomeIcon} text="Home"/></Link>
            {/* <Link to="/s-explore" style={{textDecoration:"none", color:"#50b7f5" }}><SidebarOptions Icon={SearchIcon} text="Explore"/></Link>
            <Link to="/s-notifications" style={{textDecoration:"none", color:"#50b7f5" }}><SidebarOptions Icon={NotificationsNoneIcon} text="Notifications"/></Link>
            <Link to="/s-messages" style={{textDecoration:"none", color:"#50b7f5" }}><SidebarOptions Icon={MailOutlineIcon} text="Messages"/></Link>
            <Link to="/s-bookmarks" style={{textDecoration:"none", color:"#50b7f5" }}><SidebarOptions Icon={BookmarkBorderIcon} text="Bookmarks"/></Link>
            <Link to="/s-lists" style={{textDecoration:"none", color:"#50b7f5" }}><SidebarOptions Icon={ListAltIcon} text="Lists"/></Link> */}
            <Link to="/s-profile" style={{textDecoration:"none", color:"#50b7f5" }}><SidebarOptions Icon={PermIdentityIcon} text="Profile"/></Link>
            {/* <Link to="/s-moreOptions" style={{textDecoration:"none", color:"#50b7f5" }}><SidebarOptions Icon={MoreHorizIcon} text="More"/></Link> */}
            <Link onClick={()=>logout()} style={{textDecoration:"none", color:"red" }}><SidebarOptions Icon={ExitToAppIcon} text="Logout"/></Link>
            

            
            <Button variant="outlined" className="sidebar__post" fullWidth>Post</Button>
        </div> 
    )
}

export default Sidebar;