const socket = require('socket.io-client')('wss://streamer.cryptocompare.com');

socket.on('connect', () => {
  console.log('ws已连接')
})
socket.on('disconnect', (e) => {
  console.log('ws已断开', e)
})
socket.on('error', err => {
  console.log('ws接口错误', err)
})
socket.on('m', (e) => {
  const _data = e.split('~')
  if (_data[0] === "3") {
    console.log('wx返回3表示已断开')
    return
  }
  const data = {
    sub_type: parseInt(_data[0], 10),
    exchange: _data[1],
    to_sym: _data[2],
    from_sym: _data[3],
    trade_id: _data[5],
    ts: parseInt(_data[6], 10),
    volume: parseFloat(_data[7]),
    price: parseFloat(_data[8])
  }
  console.log(`1个${data.to_sym}等于${data.price}个${data.from_sym}，成交量是${data.volume}`, data)

//   const channelString = `${data.sub_type}~${data.exchange}~${data.to_sym}~${data.from_sym}`

//   const sub = _subs.find(e => e.channelString === channelString)

//   if (sub) {
//     // disregard the initial catchup snapshot of trades for already closed candles
//     if (data.ts < sub.lastBar.time / 1000) {
//       return
//     }

//     var _lastBar = updateBar(data, sub)

//     // send the most recent bar back to TV's realtimeUpdate callback
//     sub.listener(_lastBar)
//     // update our own record of lastBar
//     sub.lastBar = _lastBar
//   }
})
const emit = () => {
  console.log('emit');

  socket.emit('SubAdd', {
    subs: ["0~Coinbase~BTC~USD"]
  })
}
export default {
  emit
}
