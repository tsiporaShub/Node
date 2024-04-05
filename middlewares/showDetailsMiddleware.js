const details = (req, res, next) => {
  const date = new Date()
  console.log('time: ', date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(), 'url: ', req.url)
  next()
}

module.exports = details
