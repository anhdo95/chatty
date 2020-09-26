const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')
const users = require('./users')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

nextApp.prepare().then(() => {

  io.on('connection', (socket) => {
    function getMessage(user, text) {
      return { user, text }
    }

    socket.on('join', ({ name, room }, callback) => {
      console.log('name :>> ', name);
      console.log('room :>> ', room);
      const { error, user } = users.addUser({ id: socket.id, name, room })

      if (error) return callback(error)

      console.log('join:user :>> ', user);
      
      socket.emit('message', getMessage('admin', `${user.name} welcome to the room ${user.room}`)) 
      socket.broadcast
				.to(user.room)
				.emit('message', getMessage('admin', `${user.name}, has joined!`))
      socket.join(user.room)

      callback()
    })

    socket.on('sendMessage', (message) => {
      const user = users.getUser(socket.id)
      if (!user) return
      console.log('user :>> ', user);
      io.to(user.room).emit('message', getMessage(user.name, message))
    })

    socket.on('disconnect', () => {
      console.log('disconnect');
      users.removeUser(socket.id)
    })
  })

  app.use('/api', require('./router'))

  app.get('*', nextHandler)

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})