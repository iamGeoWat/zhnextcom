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

    <div style="margin-top: 20px">
      <el-card style="width: 96%; margin-left: 2%;">
        <div id="kraken_container" style="height: 640px; width: 49%; float: left; margin-bottom: 20px"></div>
        <div id="huobi_container" style="height: 640px; width: 49%; float: right; margin-bottom: 20px"></div>
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

      <el-card class="warning-card">
        <div slot="header">
          <span>价格预警</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12" style="margin-top: 50px;">
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
          <el-col :span="12">
            <p v-if="watchedPairs.length === 0">未选择交易对</p>
            <div style="width: 600px">
              <div v-for="pair in watchedPairs" style="margin-top: 5px; float: right">
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


  </div>
</template>

<script>

  // import axios from 'axios'
  export default {
    name: "MarketPage",
    components: {

    },
    methods: {
      onPairSelect() {
        console.log(this.watchedPairs)
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
        if (this.startBtnText === '启动') {
          this.switchBtnText =  '停止'
          this.switchBtnType = 'danger'
          this.engineStart()
        } else if (this.startBtnText === '停止') {
          this.filled = false
          this.switchBtnText =  '启动'
          this.switchBtnType = 'primary'
          this.engineStop()
        }
      },
      engineStart() {

      },
      engineStop() {

      }
    },
    data() {
      return {
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
      // axios.get('https://datamish.com/api/datasources/proxy/1/query?db=bfx&q=SELECT%20last(%22long_pct%22)%20FROM%20%22bfx_pct_long_short%22%20WHERE%20(%22symbol%22%20%3D%20%27BTC%27)%20AND%20time%20%3E%3D%20now()%20-%206h%20GROUP%20BY%20time(1m)%20fill(previous)%3BSELECT%20last(%22short_pct%22)%20FROM%20%22bfx_pct_long_short%22%20WHERE%20(%22symbol%22%20%3D%20%27BTC%27)%20AND%20time%20%3E%3D%20now()%20-%206h%20GROUP%20BY%20time(1m)%20fill(previous)&epoch=ms').then((res)=>{
      //   console.log(res.data)
      // })
      new AICoin.chart({
        "symbol": "KRAKENUSDTUSD",
        "default_step": "3600",
        "default_theme": "light",
        "disable_theme_change": true,
        "container": "kraken_container",
        "lang": "zh",
        "title": "USDTUSDTRENDING"
      })
      new AICoin.chart({
        "symbol": "HUOBIPROUSDTHUSD",
        "default_step": "3600",
        "default_theme": "light",
        "disable_theme_change": true,
        "container": "huobi_container",
        "lang": "zh",
        "title": "USDTUSDTRENDING"
      })
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
        width: 75%;
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

  }

</style>

