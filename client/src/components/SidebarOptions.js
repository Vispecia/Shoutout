import React from 'react'
import '../css/SidebarOption.css'
import TwitterIcon from '@material-ui/icons/Twitter'

const SidebarOptions=({active,text, Icon })=>{
    return(
        <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
            <Icon/>
            <h2>{text}</h2>
        </div>
    )
}

export default SidebarOptions;