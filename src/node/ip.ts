import os, {NetworkInterfaceInfo} from 'os';
import * as http from 'http';

/**
 * @function 获取本地 ip 地址 IPv4 or IPv6
 * @desc 跨平台情况未知
 * @param type {"IPv4" | "IPv6"}
 * @return {string[]}
 */
export function ipAddress(type: 'IPv4' | 'IPv6'): string[] {
  const interfaces = os.networkInterfaces() as NodeJS.Dict<NetworkInterfaceInfo[]>;
  const ips = [];
  for (const interfacesName of Object.keys(interfaces)) {
    for (const networkInterface of interfaces[interfacesName] as NetworkInterfaceInfo[]) {
      if (type !== networkInterface.family || networkInterface.internal) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        continue;
      }
      // 可能会有多个 addresses
      ips.push(networkInterface.address);
    }
  }
  return ips;
}

/**
 * @function 获取本地 IPv4 地址
 * @desc 跨平台情况未知
 * @return {string[]}
 */
export function ipv4Address(): string[] {
  return ipAddress('IPv4');
}

/**
 * @function 获取本地 IPv6 地址
 * @desc 跨平台情况未知
 * @return {string[]}
 */
export function ipv6Address(): string[] {
  return ipAddress('IPv6');
}

export function getUserIp(req: http.IncomingMessage): string {
  let ipAddr: string | undefined;
  if (req.headers['x-forwarded-for']) {
    const forwarded = req.headers['x-forwarded-for'];
    const firstIp = Array.isArray(forwarded) ? forwarded[0] : forwarded || '';
    ipAddr = firstIp.split(',').shift();
  }
  if (!ipAddr) {
    ipAddr = req?.connection?.remoteAddress;
  }
  if (!ipAddr) {
    ipAddr = req?.socket?.remoteAddress;
  }
  // 如果前面是 ::ffff: 表示这是一个 ipv6 兼容 ipv4 地址
  if (ipAddr && /^::ffff:/.test(ipAddr.trim())) {
    return ipAddr.substring(7);
  }
  return ipAddr || '';
}
