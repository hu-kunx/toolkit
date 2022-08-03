import { HashAlgorithm, Hmac } from "../hmac";

describe("crypto:hmac", () => {
  test("generateKey", async () => {
    const hamc = new Hmac(HashAlgorithm.Sha256)
    const key = await hamc.generateKey(128)
    const key2 = await hamc.generateKey(256)
    expect(key.length).toBe(32)
    expect(key2.length).toBe(64)
  })

  test('sign', async () => {
    const hamc = new Hmac(HashAlgorithm.Sha256)
    const key = "024c7f9d36a97277fac6e66b734b5265"
    const data = "hello word"
    const correct = 'c9b22aaf647be37489009aebc495f5ed82419b0b9fec1ddb18d5c5ea7683bbab'
    const sign = await hamc.sign(key, data)
    expect(sign).toBe(correct)
  })

  test('verify', async () => {
    const hamc = new Hmac(HashAlgorithm.Sha256)
    const key = "024c7f9d36a97277fac6e66b734b5265"
    const data = "hello word"
    const sign = 'c9b22aaf647be37489009aebc495f5ed82419b0b9fec1ddb18d5c5ea7683bbab'
    const isOk = await hamc.verify(key, sign, data)
    expect(isOk).toBe(true)
  })
})
