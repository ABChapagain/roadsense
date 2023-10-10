const io = require('socket.io')(4000, { cors: { origin: '*' } })

io.on('connection', (socket) => {
  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message)
  })
})
