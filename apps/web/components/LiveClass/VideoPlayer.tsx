import React, { useEffect, useRef } from 'react'

const VideoPlayer: React.FC<{ stream: MediaStream, className:any }> = ({ stream, className }) => {
    const videoRef = useRef<HTMLVideoElement>(null);  
    
    useEffect(() => {
        if(videoRef.current)videoRef.current.srcObject = stream
    },[stream])

  return (
    <video ref={videoRef} autoPlay playsInline muted className={className} />
  )
}

export default VideoPlayer