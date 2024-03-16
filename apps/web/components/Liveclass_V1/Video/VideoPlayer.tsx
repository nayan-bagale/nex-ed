import React, { useEffect, useRef } from 'react'

const VideoPlayer: React.FC<{ stream: MediaStream, className: any, muted: boolean }> = ({ stream, className, muted }) => {
    const videoRef = useRef<HTMLVideoElement>(null);  
    
    useEffect(() => {
        if(videoRef.current) videoRef.current.srcObject = stream
    },[stream])

  return (
    <video ref={videoRef} autoPlay muted={muted} playsInline className={className} />
  )
}

export default VideoPlayer