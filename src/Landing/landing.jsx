import { useEffect, useState } from 'react'
import styles from './landing.module.css'

function Landing({setPlaylistId, setVideos, setMaxDuration, setVideoId}) {

    const [PlaylistLink, setPlaylistLink] = useState('');
    const [Hours, setHours] = useState('');
    const [Minutes, setMinutes] = useState('');
     

    function handlePlaylistChange(event){
        setPlaylistLink(event.target.value);
    }

    function handleHourChange(event){
        setHours(event.target.value);
    }

    function handleMinutesChange(event){
        setMinutes(event.target.value);
    }

    async function loadVideos(playlistId){
      const apiUrl = `http://localhost:5100/api/v1/youtube/videos?playlistId=${playlistId}`;

      try {
          const response = await fetch(apiUrl);
          const videos = await response.json();
          return videos
        } catch (error) {
          console.error(error.message);
        }
    }

    async function fetchData(playlistId) {
        const data = await loadVideos(playlistId);
        setVideos(data); 
        setVideoId(data[0].id) 
    }

    function processInputs(){
        const hours = Number(Hours);
        const minutes = Number(Minutes);
        const seconds = 0;

        const match = PlaylistLink.match(/list=([^&]+)/);
        const playlistId = match ? match[1] : null; 

        setMaxDuration({hours, minutes, seconds});
        setPlaylistId(playlistId); 
        fetchData(playlistId);    
    }

    function demoInputs(){
      const hours = 1;
      const minutes = 0;
      const seconds = 0;
      const playlistId = 'PLZPZq0r_RZOMQArzyI32mVndGBZ3D99XQ';

      setMaxDuration({hours, minutes, seconds});
      setPlaylistId(playlistId); 
      fetchData(playlistId); 
    }

    return (
        <div className = {styles.landingContainer} >
            <input value={PlaylistLink} placeholder='paste the website link' onChange={handlePlaylistChange}
            className={styles.input}></input>
            <div className = {styles.timeContainer}>
            <input value={Hours} placeholder='00' onChange={handleHourChange} className={styles.time}></input>
            <input value={Minutes} placeholder='00' onChange={handleMinutesChange} className={styles.time}></input>
            </div>
            <button onClick={() => {processInputs()}}>Submit</button>
            <button onClick={() => {demoInputs()}}>Click for demo!</button>
        </div>
    )
}

export default Landing