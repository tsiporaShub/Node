const checkBody = (req, res, next) => {
  console.log('Request Type:', req.method)
  if ((req.method == 'POST' || req.method == 'PUT') && JSON.stringify(req.body) === '{}') {
    next('router')
  } else {
    next()
  }
}

module.exports = checkBody
