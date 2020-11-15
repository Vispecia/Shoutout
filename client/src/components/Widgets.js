import React from 'react'
import '../css/Widgets.css'

import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterTweetEmbed
} from 'react-twitter-embed'

import SearchIcon from '@material-ui/icons/Search'

const Widgets=()=>{
    return(
        <div className="widgets">
            <div className="widgets__input">
                <SearchIcon className="widgets__searchIcon"/>
                <input placeholder="Search" type="text" style={{outline:"none"}}/>
            </div>          
            <div className="widgets__widgetContainer">
                <h2>Whats happening?</h2>
                <TwitterTweetEmbed tweetId={"1301476962049777666"}/>
                <TwitterTimelineEmbed
                sourceType="profile"
                screenName="narendramodi"
                options={{height: 400}}
                />
                <TwitterShareButton 
                url={""}
                options={{text:"This is my reply",via:"vishesh"}}
                />
            </div>
        </div>
    )
}

export default Widgets;