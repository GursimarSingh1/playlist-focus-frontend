import { useState } from "react";
import styles from './session.module.css'

function Session({videos, setVideoId, index, duration, setQuestions}){

    let [isActive,setIsActive] = useState(true)

    function changeVideo(id){
        setVideoId(id);
        setQuestions('');
    };

    function toggleSubMenu(){
        setIsActive(!isActive);
    }

    let video_stack = videos.map(video => 
        <li key={video.id}>
            <button onClick={() => changeVideo(video.id)} className={styles.listItem}>
                {video.snippet.title}
            </button>
        </li>
    )

    return (<li className = {styles.session}>
        <button className={styles.dropdownBtn} onClick={() => toggleSubMenu()}>
            <span>Day-{index+1}</span>
            <span>{duration.hours}:{duration.minutes}</span>
        </button>
        {isActive && (
        <ul className={styles.submenu}>
          {video_stack}
        </ul>
        )}
    </li>);
}

export default Session