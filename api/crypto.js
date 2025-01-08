const forge = require('node-forge')
const fs = require('fs-extra')

// Đường dẫn tới file PEM chứa khóa công khai và riêng tư
const publicKeyFile = 'public.pem'
const privateKeyFile = 'private.pem'
const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 })

const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey)
const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey)
fs.outputFileSync(`./${publicKeyFile}`, publicKey)
fs.outputFileSync(`./${privateKeyFile}`, privateKey)
forge.pki.publicKeyFromPem(publicKey)
