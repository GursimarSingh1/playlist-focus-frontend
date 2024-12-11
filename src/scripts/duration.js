export function parseISODuration(ISOduration) {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = ISOduration.match(regex);
  
    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    const seconds = matches[3] ? parseInt(matches[3]) : 0;
  
    return { hours, minutes, seconds };
  }
  
export function toSeconds(duration){
    return duration.hours * 3600 + duration.minutes * 60 + duration.seconds
  }
  
export function toDuration(seconds){
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
  
    return { hours, minutes, seconds };
  
  }