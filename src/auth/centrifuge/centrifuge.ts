import { Centrifuge } from "centrifuge";

const centrifuge = new Centrifuge('ws://localhost:8000/connection/websocket', {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJodXl0diIsImV4cCI6MTcxNjM0OTQ4MCwiaWF0IjoxNzE1NzQ0NjgwfQ.de9b8qftqf_Vk-mMYL6-NEjcpsQiMv6y6-9GhbP3WWo"
});

// Allocate Subscription to a channel.
const sub = centrifuge.newSubscription('tasks');

export { centrifuge, sub };
