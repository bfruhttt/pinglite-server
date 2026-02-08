const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });
const clients = {};

wss.on("connection", ws => {
  ws.on("message", msg => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch {
      return;
    }

    if (data.type === "register") {
      clients[data.id] = ws;
      console.log("Registered:", data.id);
      return;
    }

    if (data.type === "message") {
      const target = clients[data.to];
      if (target) {
        target.send(JSON.stringify({
          from: data.from,
          text: data.text
        }));
      }
    }
  });

  ws.on("close", () => {
    for (const id in clients) {
      if (clients[id] === ws) delete clients[id];
    }
  });
});

console.log("PingLite server running on port 3000");
