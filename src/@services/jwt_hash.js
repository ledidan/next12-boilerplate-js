import jwt from 'jsonwebtoken'
export const DecodeToken = token => {
  try {
    const decodedToken = jwt.verify(token, `${process.env.JWT_CLIENT_SECRET_KEY}`)
    return decodedToken
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}
