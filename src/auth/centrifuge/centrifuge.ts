import { Centrifuge } from "centrifuge";

const centrifuge = new Centrifuge('ws://localhost:8000/connection/websocket', {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM3MjIiLCJleHAiOjE3MTYyODEwMDgsImlhdCI6MTcxNTY3NjIwOH0.jPZaCmkfIXQ51J-ICwAtaRGt_6zbMUg6bajpBjXR130"
});

// Allocate Subscription to a channel.
const sub = centrifuge.newSubscription('news');

sub.on('publication', function (ctx: { data: any; }) {
    console.log(ctx.data);
});

sub.subscribe();

centrifuge.connect();

export { centrifuge, sub };
