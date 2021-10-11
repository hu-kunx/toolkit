// 序列号id 12位
const SEQUENCE_BITS = 12;
// 时间戳左移位数
const TIME_SHIFT = SEQUENCE_BITS;
// 序列号id最大值 12bit 最大值 1023
const MAX_SEQUENCE = -1 ^ (-1 << SEQUENCE_BITS);

export class Snowflake {
  private number = 0;
  private last_time = 0;
  // 2019-11-07T09:58:52.370Z
  constructor(private epoch=1573120745213){  }

  generate() {
    let now = new Date().getTime();
    if (this.last_time === now) {
      this.number = (this.number + 1) & MAX_SEQUENCE;
      if (this.number === 0) {
        // 如果当前工作节点在1毫秒内生成的ID已经超过上限 需要等待1毫秒再继续生成
        while (now <= this.last_time) {
          now = new Date().getTime();
        }
      }
    } else {
      this.number = 0;
    }
    // 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当返回错误
    if (now < this.last_time) {
      throw 'System time error';
    }
    this.last_time = now;
    return (((now - this.epoch) << TIME_SHIFT) | this.number );
  }

}


const sn = new Snowflake()


console.log("id: ", sn.generate())
console.log("id: ", sn.generate())
console.log("id: ", sn.generate())
console.log("id: ", sn.generate())
console.log("id: ", sn.generate())
console.log("id: ", sn.generate())