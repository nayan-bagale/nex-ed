import { EncryptionMode, UID, SDK_MODE } from "agora-rtc-sdk-ng";

const config: configType = {
  uid: 0,
  appId: "6539c8403c6544478f32c0828f58af4d",
  channelName: "demo",
  rtcToken:
    "007eJxTYDDVTQtr4Zsm2PX79sT0TTFpcXc/vpE+9pgh/Lgnf9nvzw8VGMxMjS2TLUwMjJPNTE1MTMwt0oyNkg0sjCzSTC0S00xSAq+tT20IZGTI+/uekZEBAkF8FoaU1Nx8BgYAfzQg9g==",
  serverUrl: "",
  proxyUrl: "http://localhost:8080/",
  tokenExpiryTime: 6000,
  token: "",
  encryptionMode: "aes-128-gcm2",
  salt: "",
  encryptionKey: "",
  destChannelName: "",
  destChannelToken: "",
  destUID: 2,
  secondChannel: "",
  secondChannelToken: "",
  secondChannelUID: 2,
  selectedProduct: "rtc",
};

export type configType = {
  uid: UID;
  appId: string;
  channelName: string;
  rtcToken: string | null;
  serverUrl: string;
  proxyUrl: string;
  tokenExpiryTime: number;
  token: string;
  encryptionMode: EncryptionMode;
  salt: "";
  encryptionKey: string;
  destUID: number;
  destChannelName: string,
  destChannelToken: string,
  secondChannel: string,
  secondChannelToken: string
  secondChannelUID: number,
  selectedProduct: SDK_MODE
};

export default config;