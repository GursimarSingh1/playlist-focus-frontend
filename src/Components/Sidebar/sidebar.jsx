import {useState} from 'react';
import Playlist from '../playlist.jsx';
import styles from './sidebar.module.css';
import {generateQuestions, prevVideos} from '../../scripts/prompt.js'
import { QuestionMarkCircleIcon, ChevronDownIcon, ChevronDoubleLeftIcon, Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline'

function Sidebar({ setVideoId, videos, maxDuration, videoId, setQuestions,  questionBoxActive}) {
  const [activeContent, setActiveContent] = useState(true);
  const [closeSidebar, setCloseSidebar] = useState(false);
  
  const videoMap = {};
  videos.forEach( (video, index) => {videoMap[video.id] = index;} );
  const index = videoMap[videoId];

  function toggleSidebar(){
    setCloseSidebar(!closeSidebar);
    if(activeContent === true){
      setActiveContent(false);
    }
  }

  function toggleContent(){
    if(closeSidebar === true){
      setCloseSidebar(false)
    }
    setActiveContent(!activeContent);
  }


  function loadQuestions() {
    const title = videos[index].snippet.title
    const description = videos[index].snippet.description
    let tags = '';
    if (videos[index].snippet.tags) {
      tags = videos[index].snippet.tags.join(",")
    }

    const fullPrev = prevVideos(videos, index);

    generateQuestions({title, description, tags, fullPrev}).then(result => setQuestions(result));
  } 

  return (
    <nav className={`${styles.sidebar} ${closeSidebar ? styles.sidebarClose : ''}`}>

      <button className={styles.toggleBtn} onClick={() => toggleSidebar()}>
      <ChevronDoubleLeftIcon className={styles.svg} height={20} width={20}/>
      <span>Close Sidebar</span>
      </button>

      <button className={styles.dropdownBtn1} onClick={() => {loadQuestions()}}>
      <QuestionMarkCircleIcon className={styles.svg} width={24} height={24}/><span>Generate Questions</span></button>

      {questionBoxActive && <button className={styles.dropdownBtn1} onClick={() => {setQuestions('')}}>
      <XCircleIcon className={styles.svg} width={24} height={24}/><span>Close Questions</span></button> }

      <button className={styles.dropdownBtn2} onClick={() => toggleContent()}>          
      <Bars3Icon className={styles.svg} height={24} width={24}/>
      <span>Content</span>
      <ChevronDownIcon  className={styles.svg} height={24} width={24}/>
      </button>

      {activeContent && (
        <ul style={{marginLeft: '10px'}} >
          <Playlist videos={videos} setVideoId={setVideoId} maxDuration={maxDuration} setQuestions={setQuestions}></Playlist>
        </ul>
      )} 
    </nav>
  );
}

export default Sidebar;
