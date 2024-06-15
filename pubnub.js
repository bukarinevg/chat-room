import PubNub from 'pubnub';

const pubnub = new PubNub({
  publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY,
  userId: process.env.NEXT_PUBLIC_PUBNUB_USERID,
});

export default pubnub;