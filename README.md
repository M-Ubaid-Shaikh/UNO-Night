# 🃏 UNO Night

A multiplayer UNO game for you and your friends. Create a room, share the link or the 4-letter code, and play in your browser with up to 10 players. Computer players can fill empty seats.

## Features
- Rooms for 2 to 10 players, with a custom room name
- Join with an invite link or a 4-letter room code
- Only the room creator (admin) can start the game
- Computer players you can add or remove in the lobby
- Official rules: Skip, Reverse, Draw 2, Wild, Wild Draw 4, and stacking +2 / +4
- UNO button on your last card: forget it for 3.5 seconds and you draw 2. Other players can catch you
- Cards are drawn one at a time with animations
- Sound effects, emoji reactions with their own sounds, win tally across rounds
- Clear turn indicator for everyone, opponents shown as fanned face-down hands
- Works on desktop and phones

## Run it on your computer
1. Install [Node.js](https://nodejs.org) (LTS version).
2. Open a terminal in this folder and run:
   ```
   node server.js
   ```
   On Windows you can also double-click `start.bat`.
3. Open http://localhost:3000, click **Create room**, and enter your name.
4. Friends on the same Wi-Fi open the `http://192.168.x.x:3000` address printed in the terminal and enter your room code.

No `npm install` is needed. The server has no dependencies.

## Put it online
The game needs a host that runs a normal Node server (not static-only hosting). Services like Render, Railway or Fly.io work:

- **Build command:** `npm install`
- **Start command:** `node server.js`

The server uses the `PORT` environment variable that these hosts provide.

## How it works
- `server.js` is a small relay server. It passes messages between players in the same room using Server-Sent Events.
- `public/index.html` contains the whole game: interface, rules, computer players and sounds.
- The room creator's browser runs the game logic, so the creator needs to keep their tab open during a game.

## Project structure
```
server.js          relay server
package.json       project info and start script
public/index.html  the game
start.bat          Windows launcher
start.sh           Mac / Linux launcher
```

## Notes
- Rooms live in memory and disappear when the server restarts.
- Hidden hands are sent to every player's browser but not shown, which is fine for friends but not tamper-proof.

Have fun! 🎉
