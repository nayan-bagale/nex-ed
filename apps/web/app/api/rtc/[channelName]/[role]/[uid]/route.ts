import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export function GET(req: Request, { params }: { params: any }) {
  const { channelName, role: roleParam, uid }: any = params;
  console.log(channelName, roleParam, uid);
  let role: number;

  if (roleParam === "publisher") {
    role = RtcRole.PUBLISHER;
  } else if (roleParam === "audience") {
    role = RtcRole.SUBSCRIBER;
  } else {
    return Response.json({ error: "Role is incorrect" });
  }

  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    process.env.AGORA_APP_ID!,
    process.env.AGORA_APP_CERTIFICATE!,
    channelName,
    uid,
    role,
    privilegeExpiredTs
  );

  return Response.json({ token });
}
