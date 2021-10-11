import {Crypto} from "@peculiar/webcrypto";

interface IHMAC {
  generateKey(key: string): string;
  sign(key: string, data: string): Promise<boolean>;
  importKey(key: string): string;
  exportKey(key: string): Promise<JsonWebKey>
  verify(key: string, signature: string, data: string): Promise<boolean>;
}

type KeyPair = CryptoKeyPair

type hashType = "SHA-256" | "SHA-1"| "SHA-384" | "SHA-512"
export class HMAC implements IHMAC {
  private readonly webcrypto: Crypto;
  private readonly hashType: "SHA-256" | "SHA-1" | "SHA-384" | "SHA-512" =
    "SHA-256";
  constructor(hashType: hashType) {
    this.webcrypto = new Crypto();
    this.hashType = hashType;
  }
  generateKey(key: string): Promise<KeyPair> {
    return this.webcrypto.subtle.generateKey(
      {
        name: "HMAC",
        hash: this.hashType,
        length: 256,
      },
      false,
      ["sign", "verify"]
    );
  }
  sign(key: string, data: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  importKey(key: string): string {
    throw new Error("Method not implemented.");
  }
  exportKey(key: KeyPair): Promise<JsonWebKey> {
    return this.webcrypto.subtle.exportKey("pkcs8", key)
  }
  verify(key: string, signature: string, data: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}