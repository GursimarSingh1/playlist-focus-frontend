import Notes from '../Notes/notes.jsx'
import Video from '../video.jsx'
import styles from "./display.module.css"

function Display({videoId, questions, questionBoxActive}) { 

    return (
        <div className={styles.displayContainer}>
            <div><Video videoId={videoId}/></div>
            <div className={styles.bottomBox}>
                {questionBoxActive && <textarea readOnly className={styles.questionBox} placeholder='Loading...' value={questions}></textarea>}
                <Notes videoId={videoId}/>
            </div>
        </div>
    );
}

export default Display