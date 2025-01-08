import { pki, util, random, cipher } from 'node-forge'
import * as fs from 'fs-extra'

export const getRandomKeys = () => {
    // generate key and iv to base64
    const key = random.getBytesSync(32)
    const iv = random.getBytesSync(16)
    return { key, iv }
}

export const getRandomPemKeys = () => {
    // generate key pair to base64
    const keyPair = pki.rsa.generateKeyPair({ bits: 2048 })
    const publicKey = pki.publicKeyToPem(keyPair.publicKey)
    const privateKey = pki.privateKeyToPem(keyPair.privateKey)
    fs.outputFileSync(`./public.pem`, publicKey)
    fs.outputFileSync(`./private.pem`, privateKey)
    return { publicKey, privateKey, publicKey64: util.encode64(publicKey), privateKey64: util.encode64(privateKey) }
}

function getPemKey() {
    const publicKey = fs.readFileSync(`./public.pem`, 'utf-8')
    const privateKey = fs.readFileSync(`./private.pem`, 'utf-8')
    return { publicKey, privateKey }
}

const { publicKey, privateKey } = getPemKey()

const { key, iv } = getRandomKeys()

export const encrypt = (data: any, publicKeyClient: string) => {
    const cip = cipher.createCipher('AES-CTR', key)
    cip.start({ iv })
    cip.update(util.createBuffer(util.encodeUtf8(data)))
    cip.finish()
    const i = Buffer.concat([Buffer.from(iv, 'binary'), Buffer.from(cip.output.data, 'binary')]),
        s = pki.publicKeyFromPem(util.decode64(publicKeyClient)).encrypt(util.encode64(key))
    return { d: i.toString('base64'), k: util.encode64(s) }
}

export const decrypt = (data: { k: string; d: string }) => {
    const { k, d } = data
    const pK = pki.privateKeyFromPem(privateKey)
    const i = util.decodeUtf8(pK.decrypt(util.decode64(k)))
    const s = Buffer.from(d, 'base64')
    const u = s.slice(0, 16)
    const o = s.slice(16)
    const c = cipher.createDecipher('AES-CTR', Buffer.from(i, 'base64').toString('binary'))
    c.start({ iv: u.toString('binary') })
    c.update(util.createBuffer(o))
    c.finish()
    return util.decodeUtf8(c.output.data)
}
