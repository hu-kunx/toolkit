import { Crypto, CryptoKey } from '@peculiar/webcrypto'

const enc = new TextEncoder();

function buf2hex ( buffer: ArrayBuffer ): string {
  return [ ...new Uint8Array( buffer ) ]
    .map( x => x.toString( 16 ).padStart( 2, '0' ) )
    .join( '' );
}

function buf2base64 ( buffer: ArrayBuffer ): string {
  return btoa( String.fromCharCode( ...new Uint8Array( buffer ) ) )
}

function hex2buf(hex: string): ArrayBuffer {
  return new Uint8Array((hex.match(/[\da-f]{2}/gi) || []).map(function (h) {
    return parseInt(h, 16)
  }))
}
function base64ToBuf(base64: string): ArrayBuffer {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
}

export enum HashAlgorithm {
  Sha1 = "SHA-1",
  Sha256 = "SHA-256",
  Sha512 = "SHA-512",
}

export class Hmac {
  private crypto = new Crypto()

  constructor ( private hashAlgorithm: HashAlgorithm, private outputType: 'hex' | 'base64' = 'hex' ) {
    if ( typeof window === "object" && !window.isSecureContext ) {
      throw new Error( "not safe context." )
    }
  }

  // 二进制2字符串
  private toString ( buffer: ArrayBuffer ): string {
    if ( this.outputType === 'hex' ) {
      return buf2hex( buffer )
    }
    if ( this.outputType === 'base64' ) {
      return buf2base64( buffer )
    }
    return buf2base64( buffer )
  }

  private toBuffer(str: string, encoding: 'hex' | 'base64'): ArrayBuffer {
    if (encoding === 'hex') {
      return hex2buf(str)
    }
    return base64ToBuf(str)
  }

  private async importKey ( key: string ): Promise<CryptoKey> {
    return this.crypto.subtle.importKey(
      "raw",
      enc.encode( key ),
      { name: 'HMAC', hash: this.hashAlgorithm },
      false,
      [ 'sign', "verify" ]
    )
  }

  private async exportKey ( key: CryptoKey ): Promise<string> {
    const result = await this.crypto.subtle.exportKey( 'raw', key )
    return this.toString( result )
  }

  // 生成一个key
  async generateKey ( length: 128 | 256 = 128 ): Promise<string> {
    const cryptoKey = await this.crypto.subtle.generateKey( {
        name: 'HMAC',
        hash: this.hashAlgorithm,
        length,
      },
      true,
      [ 'sign', "verify" ]
    )
    return this.exportKey( cryptoKey )
  }

  // 签名
  async sign ( key: string, data: string ): Promise<string> {
    const cryptoKey = await this.importKey( key )
    const result = await this.crypto.subtle.sign( "HMAC", cryptoKey, enc.encode( data ) )
    return this.toString( result )
  }

  /**
   * 验签
   * @param key
   * @param signature
   * @param data
   * @param encoding signature 的编码方式
   */
  async verify ( key: string, signature: string, data: string, encoding: 'hex' | 'base64' = 'hex' ): Promise<boolean> {
    const cryptoKey = await this.importKey( key )
    const signatureBuffer = this.toBuffer(signature, encoding)
    return this.crypto.subtle.verify( "HMAC", cryptoKey, signatureBuffer, enc.encode(data) )
  }
}
