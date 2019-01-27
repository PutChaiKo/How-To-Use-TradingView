import getData from './getApiData';

export default {
  onReady: (cb) => {
    console.log('onReady已运行');
    setTimeout(
      () =>
        cb({
          supportedResolutions: ['1', '60', 'D'],
        }),
      0
    );
  },
  resolveSymbol: (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
    console.log('resolveSymbol运行，symbolName为: ', symbolName);
    onSymbolResolvedCallback({
      name: symbolName,
      description: '',
      type: 'crypto',
      session: '24x7',
      timezone: 'Etc/UTC',
      ticker: symbolName,
      exchange: '某某交易所',
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      intraday_multipliers: ['1', '60'],
      supported_resolution: ['1', '60', 'D'],
      volume_precision: 8,
      data_status: 'streaming',
    });
  },
  getBars: async function(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    console.log('getBars被调用');
    const historyData = await getData(symbolInfo, resolution);
    onHistoryCallback(historyData);
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    console.log('subscribeBars被调用');
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    console.log('calculateHistoryDepth 被调用');
    return resolution < 60
      ? {
          resolutionBack: 'D',
          intervalBack: '1',
        }
      : undefined;
  },
};
