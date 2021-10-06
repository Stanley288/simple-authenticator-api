import crypto from 'crypto'

// hash the user password for security reason
export const setPassword = (password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex')
    crypto.pbkdf2(password, salt, 10000, 256, 'sha512', (err, key) => {
      if (err) {
        reject(err)
      }
      const hash = key.toString('hex')
      resolve({ salt, hash })
    })
  })
}

// authenticate user password
export const checkPassword = ({ password, hash, salt }) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 10000, 256, 'sha512', (err, key) => {
      if (err) {
        reject(err)
      }
      resolve(hash === key.toString('hex'))
    })
  })
}

export default {}
