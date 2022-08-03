// @ts-ignore
import crypto from 'crypto-browserify';

export class ECDH {
  private ecdh: crypto.ECDH;

  constructor() {
    this.ecdh = crypto.createECDH('secp256k1');
  }

  getPublicKey() {
    return this.ecdh.generateKeys('hex');
  }

  getSecret(key: string) {
    return this.ecdh.computeSecret(key, 'hex', 'hex');
  }
}
