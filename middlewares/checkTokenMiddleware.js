require('dotenv').config()
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const checkToken = (req, res, next) => {
  const token =
        req.body.token || req.query.token || req.headers.token
  if (!token) {
    return res.status(403).send('A token is required for authen')
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

module.exports = checkToken
