function Video({videoId}) {
    const src = `https://www.youtube.com/embed/${videoId}`;
  
    return (
      <div style={{ width: '80%',  margin: 'auto', aspectRatio: '16/9'}}>
        <iframe
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  
  export default Video;
  