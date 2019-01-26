<template>
  <div>
    <h1 @click="constructWidget">TradingView</h1>
    <div id="div_container_id"></div>
  </div>
</template>
<script>
import datafeed from './datafeed'

export default {
  data() {
    return {
      options: {
        debug: true,
        symbol: "BTC/USD",
        datafeed: datafeed,
        interval: "3",
        container_id: "div_container_id",
        library_path: "/static/custorm_scripts/charting_library/",
        locale: "zh",
        disabled_features: [],
        enabled_features: [],
        client_id: "test",
        user_id: "id",
        fullscreen: false,
        autosize: true,
        overrides: {}
      }
    };
  },
  methods: {
    constructWidget() {
      const widget = new window.TradingView.widget(this.options);
      widget.onChartReady(() => {
        console.log("TV图表加载成功");
      });
    }
  },
  mounted() {
    window.onload = () => {
      this.constructWidget();
    };
  }
};
</script>

<style scoped>
#div_container_id {
  height: 80vh;
}
</style>
