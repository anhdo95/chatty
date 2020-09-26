const helper = {
  users: [],
  
  addUser({ id, name, room }) {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
  
    const existingUser = helper.users.some(u => u.name === name && u.room === room)
    if (existingUser) {
      return { error: 'Username is taken' }
    }

    const newUser = { id, name, room }
    helper.users.push(newUser)
  
    return { user: newUser }
  },

  removeUser(id) {
    helper.users = helper.users.filter(u => u.id === id)
  },

  getUser(id) {
    return helper.users.find(u => u.id === id)
  },

  getUsersInRoom(room) {
    return helper.users.filter(u => u.room === room)
  }
}

const { users, ...methods } = helper
module.exports = methods
