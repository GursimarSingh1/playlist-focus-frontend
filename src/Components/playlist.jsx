import { useState } from "react";
import { parseISODuration, toSeconds, toDuration } from '../scripts/duration.js'
import Session from './Session/session.jsx'

function Playlist({videos, setVideoId, maxDuration, setQuestions}){

    function splitVideos(videoItems, maxDuration){
        let standard = toSeconds(maxDuration);
        let durationsSec = [];
      
        videoItems.forEach((video) => {
          let duration = video.contentDetails.duration;
          durationsSec.push(toSeconds(parseISODuration(duration)));
        })
        
        let allSessions = [];
        let singleSession = [];
        let splitSums = [];
        let sum = 0;
      
        durationsSec.forEach((part, index) => {
            if ((sum + part) > standard){
                allSessions.push(singleSession);
                singleSession = [];
                splitSums.push(sum);
                sum = 0;
            }
            sum += part;
            singleSession.push(videoItems[index])
        })

        allSessions.push(singleSession);
        splitSums.push(sum);

        const combined = allSessions.map((element, index) => ({
            videos: element,
            duration: toDuration(splitSums[index]),
        }));

        return combined;
    }

    const data = splitVideos(videos, maxDuration);

    const sessionsList = data.map((element, index) => 
            <Session key = {index} 
                     index={index}
                     videos={element.videos}
                     duration= {element.duration}
                     setVideoId = {setVideoId}
                     setQuestions={setQuestions}
                     isActive = 'true'
                     ></Session>
            );

    return (sessionsList);
}

export default Playlist