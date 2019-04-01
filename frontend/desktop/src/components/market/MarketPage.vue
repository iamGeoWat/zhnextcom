<template>
  <div class="page">
    <div class="menu">
      <ul>
        <li><img src="../../assets/home/logo.png" alt="logo"></li>
        <li><a href="/">返回</a></li>
      </ul>
    </div>

    <div class="long-short-div">
      <div id="tv-long-container" class="long-div"></div>
      <div id="tv-short-container" class="short-div"></div>
    </div>

    <div style="margin-top: 20px">
      <el-card style="width: 96%; margin-left: 2%;">
        <div id="aicoin_container_left" style="height: 320px; width: 47%; float: left;"></div>
        <div id="aicoin_container_right" style="height: 320px; width: 47%; float: right;"></div>
      </el-card>
    </div>

    <div class="otc-div">
      <el-card class="otc-card">
        <el-row>
          <el-col :span="3" class="otc-data">
            <el-card class="otc-data-card">
              <div>
                <p>USDT场外价格</p>
                <p>{{ otcData.usdtToCny }}</p>
              </div>
            </el-card>
            <el-card class="otc-data-card">
              <div>
                <p>美元价格</p>
                <p>{{ otcData.usdToCny }}</p>
              </div>
            </el-card>
            <el-card class="otc-data-card">
              <div>
                <p>溢价率</p>
                <p>{{ otcData.premiumRate }}</p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="21" class="otc-chart">
            <div class="chart-header">
              <p class="chart-title">USDT场外溢价率及比特币价格</p>
              <div>
                <el-button round @click="changeOtcData($event)" :type=" otcChartType==='day'?'primary':'default' ">1Day</el-button>
                <el-button round @click="changeOtcData($event)" :type=" otcChartType==='3day'?'primary':'default' ">3Days</el-button>
                <el-button round @click="changeOtcData($event)" :type=" otcChartType==='Week'?'primary':'default' ">1Week</el-button>
              </div>
            </div>
            <div id="otcChart" :style="{width: '100%', height: '80%'}"></div>
          </el-col>
        </el-row>


      </el-card>
    </div>

    <div class="row">
      <el-card class="greed-card">
        <div slot="header">
          <span>Fear & Greed 指数</span>
        </div>
        <div>
          <img style="width: 100%; max-width: 320px" src="https://alternative.me/crypto/fear-and-greed-index.png" alt="Latest Crypto Fear & Greed Index" />
        </div>
      </el-card>

      <el-card class="dominance-card">
        <div slot="header">
          <span>主导指数</span>
        </div>
        <div>
          <p style="font-size: 12px">BTC Dominance</p>
          <p style="font-size: 30px">{{btcDominance}}</p>
          <p style="margin-top: 20px; font-size: 12px">ETH Dominance</p>
          <p style="font-size: 30px">{{ethDominance}}</p>
          <p style="margin-top: 120px; font-size: 10px; color: #888888;">*数据源：CoinMarketCap</p>
        </div>
      </el-card>

      <el-card class="warning-card">
        <div slot="header">
          <span>价格预警</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="10" style="margin-top: 50px;">
            <div>
              <el-switch :disabled="filled" v-model="webWarningOn" active-color="#13ce66" inactive-color="#ff4949" active-text="网页提醒"></el-switch>
              <el-switch :disabled="filled" v-model="phoneWarningOn" active-color="#13ce66" inactive-color="#ff4949" active-text="电话提醒"></el-switch>
            </div>
            <div>
              <el-input :disabled="filled" v-model="phoneNumber" placeholder="手机号码" style="margin-top: 10px; width: 45%; float: left; margin-left: 2%"></el-input>
              <el-input :disabled="filled" v-model="warningKey" placeholder="Key" style="margin-top: 10px; width: 45%; float: right; margin-right: 2%;"></el-input>
            </div>
            <el-select v-model="watchedPairs" multiple placeholder="选择要监控的交易对" style="margin-top: 10px; width: 96%" @change="onPairSelect">
              <el-option-group v-for="exchange in exchanges" :key="exchange.id" :label="exchange.name">
                <el-option v-for="pair in exchange.pairs" :key="pair.id" :label="exchange.name + ' ' +  pair.name" :value="exchange.id + '-' + pair.id"></el-option>
              </el-option-group>
            </el-select>
            <el-button style="width: 46.5%" @click="fuelCheck" :disabled="filled">验证</el-button>
            <el-button @click="engineSwitch" :type="switchBtnType" :disabled="!filled" style="margin-top: 10px; width: 46.5%">{{ switchBtnText }}</el-button>
          </el-col>
          <el-col :span="14">
            <p v-if="watchedPairs.length === 0">未选择交易对</p>
            <div>
              <div v-for="pair in watchedPairs" style="margin-top: 5px; font-size: 15px;">
                <label>{{exchanges[pair[0]].name + ' ' + exchanges[pair[0]].pairs[pair[2]].name}}/USDT </label>
                <el-input :disabled="filled" style="width: 200px;" v-model="exchanges[pair[0]].pairs[pair[2]].warnPrice"></el-input>
                <label>现价 {{exchanges[pair[0]].pairs[pair[2]].currentPrice}}</label>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <div style="height: 20px;"></div>

    <audio id="alertSound">
      <source src="../../assets/alert.mp3" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>

  import axios from 'axios'
  export default {
    name: "MarketPage",
    components: {

    },
    methods: {
      getOtcData() {
        axios.get('http://blz.bicoin.com.cn/data/getUsdtRateInfo?firstTimeType=1%2C3%2C7&secondTimeType=1%2C3%2C7').then((res) => {
          // console.log(res.data.data.btcPrices['3day'])
          this.otcData = res.data.data
          this.drawOtcChart()
        })
      },
      changeOtcData(e) {
        if (e.path[0].textContent === '1Day') {
          this.otcChartType = 'day'
          this.drawOtcChart()
        } else if (e.path[0].textContent === '3Days') {
          this.otcChartType = '3day'
          this.drawOtcChart()
        } else if (e.path[0].textContent === '1Week') {
          this.otcChartType = 'Week'
          this.drawOtcChart()
        }
      },
      drawOtcChart() {
        var xAxisData = []
        var yPrice = []
        var yPremium = []
        for (let i = 0; i < this.otcData.btcPrices[this.otcChartType].length; i++) {
          var time = new Date(this.otcData.btcPrices[this.otcChartType][i].time*1000)
          xAxisData.push(time.toLocaleString('chinese', { hour12: false }).slice(0, -3))
          yPrice.push(this.otcData.btcPrices[this.otcChartType][i].rate)
        }
        for (let i = 0; i < this.otcData.premiumRateResult[this.otcChartType].length; i++) {
          yPremium.push(this.otcData.premiumRateResult[this.otcChartType][i].rate)
        }
        this.lineChart = this.$echarts.init(document.getElementById('otcChart'));
        this.lineChart.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: [{
            id: 0,
            type: 'value',
            scale: true,
            splitLine: {
              show: false
            }
          }, {
            id: 1,
            type: 'value',
            scale: false,
            splitLine: {
              show: false
            }
          }],
          series: [{
            yAxisIndex: 0,
            z: 3,
            data: yPrice,
            type: 'line',
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: "rgb(112, 152, 242)", //折线点的颜色
                lineStyle: {
                  color: "rgb(112, 152, 242)" //折线的颜色
                }
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgb(112, 152, 242)' // 0% 处的颜色
                }, {
                  offset: 1, color: '#E0E8FD' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }, {
            yAxisIndex: 1,
            data: yPremium,
            type: 'line',
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: "#FFB300", //折线点的颜色
                lineStyle: {
                  color: "#FFB300" //折线的颜色
                }
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#FFB300' // 0% 处的颜色
                }, {
                  offset: 1, color: '#FEEFD2' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }],
        });
        window.addEventListener("resize", () => {
          this.lineChart.resize();
        });
      },
      // getPriceData() {
      //   axios.get('http://45.32.61.88:8896/price').then((res) => {
      //     // console.log(res.data)
      //     for (var i = 0; i < res.data.length; i++) {
      //       for (var j = 0; j < res.data[i].length; j++) {
      //         this.exchanges[i].pairs[j].currentPrice = parseFloat(res.data[i][j])
      //       }
      //     }
      //   })
      // },
      getDominance() {
        axios.get('http://45.32.61.88:8896/dominance').then((res) => {
          // console.log(res.data.data)
          this.btcDominance = res.data.data.btc_dominance.toFixed(2)
          this.ethDominance = res.data.data.eth_dominance.toFixed(2)
        })
      },
      onPairSelect() {
        // console.log(this.watchedPairs)
      },
      fuelCheck() {

        if (this.webWarningOn || this.phoneWarningOn) {
          if ((/^1[34578]\d{9}$/.test(this.phoneNumber))) {
            if (this.warningKey === 'KHASAN') {
              if (this.watchedPairs.length !== 0) {
                for (let index in this.watchedPairs) {
                  if (this.exchanges[this.watchedPairs[index][0]].pairs[this.watchedPairs[index][2]].warnPrice !== 0) {
                    if (!/^[0-9]+.?[0-9]*$/.test(this.exchanges[this.watchedPairs[index][0]].pairs[this.watchedPairs[index][2]].warnPrice)) {
                      this.$notify({
                        title: '填写的不是数字'
                      })
                    }
                  } else {
                    this.$notify({
                      title: '选择的交易对都要填写价格'
                    })
                    return false
                  }
                }
                this.filled = true
                return true
              } else {
                this.$notify({
                  title: '选择至少一个交易对'
                })
              }
            } else {
              this.$notify({
                title: 'Key错误'
              })
            }
          } else {
            this.$notify({
              title: '电话号码错误'
            })
          }
        } else {
          this.$notify({
            title: '选择至少一个提醒方式'
          })
        }
      },
      engineSwitch() {
        if (this.switchBtnText === '启动') {
          this.switchBtnText =  '停止'
          this.switchBtnType = 'danger'
          this.engineStart()
        } else if (this.switchBtnText === '停止') {
          this.filled = false
          this.switchBtnText =  '启动'
          this.switchBtnType = 'primary'
          this.engineStop()
        }
      },
      priceInitialize() {
        axios.get('http://45.32.61.88:8896/price').then((res)=>{
          for (var i = 0; i < res.data.length; i++) {
            for (var j = 0; j < res.data[i].length; j++) {
              this.exchanges[i].pairs[j].currentPrice = parseFloat(res.data[i][j])
            }
          }
        })
      },
      doAlert() {
        if (this.phoneWarningOn) {
          try {
            axios.post('http://yzxyytz.market.alicloudapi.com/yzx/voiceNotifySms?phone=' + this.phoneNumber + '&templateId=TP18040817', {}, {
              headers: {
                'Authorization': 'APPCODE f6a48955f941406da16f44002b34b67e'
              }
            }).then((res) => {
              if (res.data.return_code !== '00000') {
                alert('电话预警API出错')
              } else {
                console.log('已发送电话预警')
              }
            })
          } catch (e) {
            console.log(e)
          }
        }
        if (this.webWarningOn) {
          var bell = document.getElementById('alertSound')
          bell.play()
        }
      },
      engineStart() {
        this.priceInitialize()
        this.warningEngine = setInterval(() => {
          axios.get('http://45.32.61.88:8896/price').then((res) => {
            // console.log(res.data)
            for (var k = 0; k < this.watchedPairs.length; k++) {
              var set = this.exchanges[this.watchedPairs[k][0]].pairs[this.watchedPairs[k][2]].warnPrice
              var last = this.exchanges[this.watchedPairs[k][0]].pairs[this.watchedPairs[k][2]].currentPrice
              var current = res.data[this.watchedPairs[k][0]][this.watchedPairs[k][2]]
              if (current === set) {
                console.log(k + '到达了警报值')
                this.doAlert()
                this.exchanges[this.watchedPairs[k][0]].pairs[this.watchedPairs[k][2]].warnPrice = 99999
              } else {
                if (set - last < 0) {
                  if (current - last < set - last) {
                    console.log(k + '向下跨越了警报值')
                    this.doAlert()
                    this.exchanges[this.watchedPairs[k][0]].pairs[this.watchedPairs[k][2]].warnPrice = 99999
                  } else {
                    this.exchanges[this.watchedPairs[k][0]].pairs[this.watchedPairs[k][2]].currentPrice = res.data[this.watchedPairs[k][0]][this.watchedPairs[k][2]]
                    console.log(k + '未触发警报')
                  }
                } else if (set - last > 0) {
                  if (current - last > set - last) {
                    console.log(k + '向上跨越了警报值')
                    this.doAlert()
                    this.exchanges[this.watchedPairs[k][0]].pairs[this.watchedPairs[k][2]].warnPrice = 99999
                  } else {
                    this.exchanges[this.watchedPairs[k][0]].pairs[this.watchedPairs[k][2]].currentPrice = res.data[this.watchedPairs[k][0]][this.watchedPairs[k][2]]
                    console.log(k + '未触发警报')
                  }
                }
              }
            }

          })
        }, 10000)
      },
      engineStop() {
        clearInterval(this.warningEngine)
      }
    },
    data() {
      return {
        otcChartType: '3day',
        otcData: {
          usdtToCny: null,
          usdToCny: null,
          premiumRate: null,
          btcPrices: null,
          premiumRateResult: null
        },
        warningEngine: null,
        btcDominance: null,
        ethDominance: null,
        switchBtnText: '启动',
        switchBtnType: 'primary',
        filled: false,
        webWarningOn: false,
        phoneWarningOn: false,
        warningKey: null,
        phoneNumber: null,
        watchedPairs: [],
        exchanges: [{
          id: 0,
          name: 'Binance',
          pairs: [{
            id: 0,
            name: 'BTC',
            warnPrice: 0,
            currentPrice: 0
          }]
        }, {
          id: 1,
          name: 'Bitfinex',
          pairs: [{
            id: 0,
            name: 'BTC',
            warnPrice: 0,
            currentPrice: 0
          }, {
            id: 1,
            name: 'ETH',
            warnPrice: 0,
            currentPrice: 0
          }]
        }, {
          id: 2,
          name: 'Bitmex',
          pairs: [{
            id: 0,
            name: 'BTC',
            warnPrice: 0,
            currentPrice: 0
          }]
        }, {
          id: 3,
          name: 'Bitstamp',
          pairs: [{
            id: 0,
            name: 'BTC',
            warnPrice: 0,
            currentPrice: 0
          }]
        }, {
          id: 4,
          name: 'Coinbase',
          pairs: [{
            id: 0,
            name: 'LTC',
            warnPrice: 0,
            currentPrice: 0
          }]
        }, {
          id: 5,
          name: 'Huobi',
          pairs: [{
            id: 0,
            name: 'EOS',
            warnPrice: 0,
            currentPrice: 0
          }]
        }, {
          id: 6,
          name: 'Kraken',
          pairs: [{
            id: 0,
            name: 'XRP',
            warnPrice: 0,
            currentPrice: 0
          }]
        }, {
          id: 7,
          name: 'OKEx',
          pairs: [{
            id: 0,
            name: 'BTC',
            warnPrice: 0,
            currentPrice: 0
          }]
        }, {
          id: 8,
          name: 'OKEx Contract',
          pairs: [{
            id: 0,
            name: 'BTC Quarter',
            warnPrice: 0,
            currentPrice: 0
          }, {
            id: 1,
            name: 'EOS Quarter',
            warnPrice: 0,
            currentPrice: 0
          }, {
            id: 2,
            name: 'ETH Quarter',
            warnPrice: 0,
            currentPrice: 0
          }, {
            id: 3,
            name: 'LTC Quarter',
            warnPrice: 0,
            currentPrice: 0
          }, {
            id: 4,
            name: 'XRP Quarter',
            warnPrice: 0,
            currentPrice: 0
          }]
        }]
      }
    },
    mounted() {
      this.getDominance()
      setInterval(()=>{
        this.getDominance()
      }, 3600000)

      this.getOtcData()

      new AICoin.markets({
        "symbols": [
          "binancebtcusdt",
          "bitfinexbtcusd",
          "bitfinexethusd",
          "bitmexxbtusd",
          "bitstampbtcusd",
          "coinbaseltcusd",
          "huobiproeosusdt",
        ],
        "columns": [
          "degree",
          "incrSpeed",
          "market_price",
          "vol"
        ],
        "style": "tr%7Bheight%3A34px%3B%7D",
        "container": "aicoin_container_left",
        "lang": "zh"
      })
      new AICoin.markets({
        "symbols": [
          "krakenxrpusd",
          "okexbtcusdt",
          "okcoinfuturesbtcquarterusd",
          "okexeosquarterusd",
          "okexethquarterusd",
          "okcoinfuturesltcquarterusd",
          "okexxrpquarterusd"
        ],
        "columns": [
          "degree",
          "incrSpeed",
          "market_price",
          "vol"
        ],
        "style": "tr%7Bheight%3A34px%3B%7D",
        "container": "aicoin_container_right",
        "lang": "zh"
      })
      new TradingView.widget(
        {
          // "width": 540,
          // "height": 305,
          "autosize": true,
          "symbol": "BITFINEX:BTCUSDLONGS",
          "timezone": "Asia/Shanghai",
          "theme": "Light",
          "style": "3",
          "locale": "zh_CN",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "range": "12m",
          "save_image": false,
          "container_id": "tv-long-container",
          "hide_top_toolbar": true,
          "withdateranges": true
        }
      );
      new TradingView.widget(
        {
          "autosize": true,
          "symbol": "BITFINEX:BTCUSDSHORTS",
          "timezone": "Asia/Shanghai",
          "theme": "Light",
          "style": "3",
          "locale": "zh_CN",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "range": "12m",
          "save_image": false,
          "container_id": "tv-short-container",
          "hide_top_toolbar": true,
          "withdateranges": true
        }
      );
    }
  }
</script>

<style scoped lang="less">
  .page {
    /*height: 100%;*/
    width: 100%;
    background: url("../../assets/home/背景_user.jpg") center center;
    background-size: 100% 100%;
    .menu {
      height: 72px;
      width: 100%;
      position: relative;
      font-weight: bold;
      font-size: 15px;
      ul {
        list-style: none;
        padding: 0;
        overflow: hidden;
        height: auto;
        margin-left: 15px;
        li {
          margin-top: 8px;
          float: left;
          a {
            color: #fff;
            width: 160px;
            text-decoration: none;
            text-align: center;
            display: block;
            line-height: 56px;
            cursor: pointer;
            font-family: "Source Han Sans CN", sans-serif;
          }
        }
      }
    }
    .row {
      height: 400px;
      position: relative;
      width: 100%;
      margin-top: 20px;
      text-align: center;
      .greed-card {
        width: 20%;
        /*margin-left: 5%;*/
        /*margin: 0 auto;*/
        float: left;
        margin-left: 2%;
        height: 400px;
      }
      .warning-card {
        /*margin: 0 auto;*/
        float: right;
        margin-right: 2%;
        width: 64%;
        min-height: 400px;
      }
      .dominance-card {
        float: left;
        margin-left: 1%;
        width: 10%;
        min-height: 400px;
      }
      img {
        width: 320px;
        height: 285px;
      }

    }
    .long-short-div {
      margin-top: 10px;
      position: relative;
      width: 100%;
      height: 400px;
      .long-div {
        width: 47%;
        height: 400px;
        float: left;
        margin-left: 2%;
      }
      .short-div {
        width: 47%;
        height: 400px;
        float: right;
        margin-right: 2%;
      }
    }
    .otc-div {
      margin-top: 20px;
      .otc-card {
        width: 96%;
        margin-left: 2%;
        .otc-data {
          text-align: center;
          .otc-data-card {
            margin-left: 40%;
            margin-top: 50px;
            width: 150px;
            height: 80px;
            font-size: 15px;
          }
        }
        .otc-chart {
          height: 450px;
          .chart-header {
            text-align: center;
            .chart-title {
              margin-bottom: 10px;
              font-size: 18px;
            }
          }
        }
      }

    }
  }

</style>

