const router = require('express').Router()

router.get('/messages', (req, res) => {
  res.send('OK')
})

module.exports = router