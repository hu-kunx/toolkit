import forge from 'node-forge';

// eslint-disable-next-line
export class AES_CBC {
  static genRandomBytes(size = 32) {
    return forge.random.getBytesSync(size);
  }

  static bytesToHex(text: string) {
    return forge.util.bytesToHex(text);
  }

  static hexToBytes(text: string) {
    return forge.util.hexToBytes(text);
  }

  /**
   * @param text
   * @param key hex string
   * @param iv hex string
   */
  static encrypt(text: string, key: string, iv: string) {
    const cipher = forge.cipher.createCipher('AES-CBC', forge.util.hexToBytes(key));
    cipher.start({iv: forge.util.hexToBytes(iv)});
    cipher.update(forge.util.createBuffer(text));
    cipher.finish();
    return cipher.output.toHex();
  }

  static bufferToBytes(buf: string) {
    return forge.util.createBuffer(buf).bytes();
  }

  /**
   * @param cipher
   * @param key hex string
   * @param iv hex string
   */
  static decrypt(cipher: string, key: string, iv: string) {
    const decipher = forge.cipher.createDecipher('AES-CBC', forge.util.hexToBytes(key));
    decipher.start({iv: forge.util.hexToBytes(iv)});
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(cipher)));
    decipher.finish();
    return decipher.output.toHex();
  }
}
