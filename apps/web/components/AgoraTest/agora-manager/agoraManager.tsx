'use client'

// Import necessary components and hooks from Agora SDK and React
import {
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteUsers,
  useClientEvent,
  LocalUser,
} from "agora-rtc-react";

import React, { createContext, useContext, useState, useEffect } from "react";
import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";
import { configType } from "./config";

// Define the shape of the Agora context
interface AgoraContextType {
  localCameraTrack: ICameraVideoTrack | any;
  localMicrophoneTrack: IMicrophoneAudioTrack | any;
  children: React.ReactNode;
}

// Create the Agora context
const AgoraContext = createContext<AgoraContextType | null>(null);

// AgoraProvider component to provide the Agora context to its children
export const AgoraProvider: React.FC<AgoraContextType> = ({ children, localCameraTrack, localMicrophoneTrack }) => (
  <AgoraContext.Provider value={{ localCameraTrack, localMicrophoneTrack, children }}>
    {children}
  </AgoraContext.Provider>
);

// Custom hook to access the Agora context
export const useAgoraContext = () => {
  const context = useContext(AgoraContext);
  if (!context) throw new Error("useAgoraContext must be used within an AgoraProvider");
  return context;
};

// AgoraManager component responsible for handling Agora-related logic and rendering UI
export const AgoraManager = ({ config, children }: { config: configType; children: React.ReactNode }) => {
  // Retrieve local camera and microphone tracks and remote users
  const agoraEngine = useRTCClient();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const remoteUsers = useRemoteUsers();

  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);

  // Publish local tracks
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Join the Agora channel with the specified configuration
  useJoin({
    appid: config.appId,
    channel: config.channelName,
    token: config.rtcToken,
    uid: config.uid,
  });

  useClientEvent(agoraEngine, "user-joined", (user) => {
    console.log("The user" , user.uid , " has joined the channel");
  });

  useClientEvent(agoraEngine, "user-left", (user) => {
    console.log("The user" , user.uid , " has left the channel");
  });

  useClientEvent(agoraEngine, "user-published", (user) => {
    console.log("The user" , user.uid , " has published media in the channel");
  });


  useEffect(() => {
    return () => {
      localCameraTrack?.close();
      localMicrophoneTrack?.close();
    };
  }, []);
  
  // Check if devices are still loading
  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading) return <div>Loading devices...</div>;

  // Render the AgoraProvider and associated UI components
  return (
    <AgoraProvider
      localCameraTrack={localCameraTrack}
      localMicrophoneTrack={localMicrophoneTrack}
    >
      {children}
      <>
        <button className='p-2 m-2 border' onClick={() => setMuted(!muted)}>mute</button>
        <button className='p-2 m-2 border' onClick={() => setCameraOn(!cameraOn)}>camera</button>
      </>
      <div id="videos">
        {/* Render the local video track */}
        <div className="vid" style={{ height: 300, width: 600 }}>
          {/* <LocalVideoTrack track={localCameraTrack} play={true} muted={muted} /> */}
          <LocalUser
            audioTrack={localMicrophoneTrack}
            cameraOn
            // cover={COVER_IMAGE_URL}
            micOn
            playAudio={muted}
            playVideo={cameraOn}
            videoTrack={localCameraTrack}
          />
        </div>
        {/* Render remote users' video and audio tracks */}
        {remoteUsers.map((remoteUser) => (
          <div
            className="vid"
            style={{ height: 300, width: 600, marginTop: 20 }}
            key={remoteUser.uid}
          >
            <RemoteUser user={remoteUser} playVideo={true} playAudio={true} />
          </div>
        ))}
      </div>
    </AgoraProvider>
  );
};

// Export the AgoraManager component as the default export
export default AgoraManager;
