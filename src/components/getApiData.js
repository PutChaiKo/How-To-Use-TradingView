const rp = require('request-promise');
export default (symbolInfo, resolution) => {
  console.log('getdata异步函数被调用', symbolInfo, resolution);
  const mainUrl = 'https://min-api.cryptocompare.com/data';
  // 处理时间精度
  let resolutionUrl;
  if (resolution === '1') {
    resolutionUrl = '/histominute?';
  } else if (resolution === '60') {
    resolutionUrl = '/histohour?';
  } else if (resolution === 'D' || resolution === '1D' ) {
    resolutionUrl = '/histoday?';
  } else {
    console.warn('supported_resolution设置不正确');
  }
  // 处理交易对
  const symbolArr = symbolInfo.name.split('/');
  const url = mainUrl + resolutionUrl + `fsym=${symbolArr[0]}&tsym=${symbolArr[1]}&limit=2000`;
  console.log(`调用的链接cryptocompare是：${url}`);
  return rp(url)
    .then((data) => {
      //   console.log(JSON.parse(data));
      const formatData = JSON.parse(data).Data.map((item) => {
        const { close, high, low, open, time, volumefrom, volumeto } = item;
        return {
          time: time * 1000,
          low,
          high,
          open,
          close,
          volume: volumeto,
        };
      });
      return formatData;
    })
    .catch((err) => {
      console.warn('api调取错误', err);
    });
};
