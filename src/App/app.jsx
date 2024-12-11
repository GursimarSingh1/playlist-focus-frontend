import React,{useState, useEffect} from 'react';
import Sidebar from '../Sidebar/sidebar.jsx'
import Landing from '../Landing/landing.jsx'
import Display from '../Display/display.jsx'
import styles from './app.module.css'

function App() {

  const [videoId, setVideoId] = useState('');
  const [videos, setVideos] = useState([]);
  const [landingPageActive, setLandingPageActive] = useState( true);
  const [playlistId, setPlaylistId] = useState(JSON.parse(localStorage.getItem('playlistId')) || '');
  const [maxDuration, setMaxDuration] = useState(JSON.parse(localStorage.getItem('maxDuration')) || {});
  const [questions, setQuestions] = useState('');
  const [questionBoxActive, setQuestionBoxActive] = useState(false);
  
  // useEffect( () => {
  //   localStorage.setItem('landingPageActive', JSON.stringify(landingPageActive));
  //   localStorage.setItem('playlistId', JSON.stringify(playlistId));
  //   localStorage.setItem('maxDuration', JSON.stringify(maxDuration));
  // }, [landingPageActive])

  useEffect( () => {
    if(videos.length > 0){
      setLandingPageActive(false);}
    }, [videos]);

  useEffect( () => {
    if(questions){
        setQuestionBoxActive(true);
    } else {
      setQuestionBoxActive(false);
    }
      }, [questions]);

  const landingPage = <Landing setPlaylistId = {setPlaylistId}
                               setVideos={setVideos}
                               setMaxDuration={setMaxDuration}
                               setVideoId={setVideoId} 
                               />

  const contentPage =  <div className={styles.appContainer}>
                        <Sidebar className={styles.sidebar} videoId={videoId} videos={videos} setVideoId = {setVideoId} maxDuration={maxDuration}  questionBoxActive={questionBoxActive} setQuestions={setQuestions}/>
                        <Display videoId={videoId} questionBoxActive={questionBoxActive} questions={questions}/>
                        </div>

  return (
    <>
      {landingPageActive ?  landingPage : contentPage}
    </>
  );
}

export default App
