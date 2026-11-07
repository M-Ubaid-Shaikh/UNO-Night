// UNO Night - zero-dependency relay server. Run: node server.js
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os');
const PORT = process.env.PORT || 3000, R = {};
function send(room, from, msg) {
  const g = R[room]; if (!g) return;
  for (const [id, c] of g) if (id !== from) c.res.write('data: ' + JSON.stringify(msg) + '\n\n');
}
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x'), room = u.searchParams.get('room') || '', cid = u.searchParams.get('cid') || '';
  if (u.pathname === '/sse') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(': ok\n\n');
    (R[room] = R[room] || new Map()).set(cid, { res, p: {} });
    const ka = setInterval(() => res.write(': ka\n\n'), 15000);
    req.on('close', () => {
      clearInterval(ka);
      const g = R[room], c = g && g.get(cid);
      if (!c) return;
      g.delete(cid); send(room, cid, { type: 'left', p: c.p });
      if (!g.size) delete R[room];
    });
    return;
  }
  if (req.method === 'POST') {
    let b = ''; req.on('data', d => { b += d; if (b.length > 1e6) req.destroy(); });
    req.on('end', () => {
      try {
        const j = JSON.parse(b);
        if (u.pathname === '/emit') send(room, cid, { type: 'ev', topic: j.topic, data: j.data });
        else if (u.pathname === '/presence') { const c = R[room] && R[room].get(cid); if (c) c.p = j; }
      } catch (e) {}
      res.end('ok');
    });
    return;
  }
  fs.readFile(path.join(__dirname, 'public', 'index.html'), (e, d) => {
    if (e) { res.writeHead(500); return res.end('index.html missing'); }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(d);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log('\n  UNO Night is running!\n  On this computer:  http://localhost:' + PORT);
  for (const l of Object.values(os.networkInterfaces()).flat())
    if (l && l.family === 'IPv4' && !l.internal) console.log('  Friends on your Wi-Fi/LAN: http://' + l.address + ':' + PORT);
  console.log('\n  Press Ctrl+C to stop.\n');
});
