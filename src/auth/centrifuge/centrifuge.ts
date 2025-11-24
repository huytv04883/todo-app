import { Centrifuge } from "centrifuge";

const centrifuge = new Centrifuge("ws://localhost:8000/connection/websocket", {
  token: process.env.TOKEN,
});

// Allocate Subscription to a channel.
const sub = centrifuge.newSubscription("tasks");

export { centrifuge, sub };
