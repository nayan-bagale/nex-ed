import React, { useEffect, useRef } from 'react'

const VideoPlayer: React.FC<{stream: MediaStream}> = ({ stream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);  
    
    useEffect(() => {
        if(videoRef.current)videoRef.current.srcObject = stream
    },[stream])

  return (
    <video ref={videoRef} autoPlay playsInline muted className="w-[20rem]" />
  )
}

export default VideoPlayer