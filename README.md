# UNO Night - multiplayer UNO for you and your friends

## Run it
1. Install Node.js (version 16 or newer) from https://nodejs.org
2. Windows: double-click `start.bat`.  Mac/Linux: run `./start.sh` (or `node server.js`).
3. Open http://localhost:3000, click Create room, name it, pick the seats, enter your name.
4. Friends on the same Wi-Fi open the `http://<your-ip>:3000` address printed in the console,
   then type the 4-letter room code (or use the invite link, which already contains it).
5. Friends on other networks: use a tunnel such as `ngrok http 3000` or Cloudflare Tunnel
   and share that address instead.

No npm install is needed - the server has zero dependencies.

## Files
- `server.js` - tiny relay server (rooms over Server-Sent Events)
- `public/index.html` - the whole game (UI, rules, bots, sounds)

The room creator is the host and runs the game logic in their browser, so keep that tab open.
