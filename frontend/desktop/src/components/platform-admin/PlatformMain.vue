<template>
  <div class="platformMain">
    <sub-header></sub-header>
    <div class="content">
      <p class="title" style="font-family: 'Microsoft YaHei', sans-serif; font-size: 25px;">智汇未来总账户</p>
      <div class="top-data">
        <div class="item">
          <div class="item-title">
            <img src="../../assets/admin/top_01.png">
            <div class="item-data">
              <p class="digit" style="color: rgb(200,165,108);">{{ showData[1].totalEquity }}</p>
              <p class="character">总资产(BTC)</p>
            </div>

          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <img src="../../assets/admin/top_02.png">
            <div class="item-data">
              <p class="digit"> {{ showData[1].currentProfitRatio }}</p>
              <p class="character">目前收益%</p>
            </div>

          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <img src="../../assets/admin/top_03.png">
            <div class="item-data">
              <p class="digit">{{ showData[1].estimatedYearly }}</p>
              <p class="character">动态年化%</p>
            </div>

          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <img src="../../assets/admin/top_04.png">
            <div class="item-data">
              <p class="digit">{{ showData[1].equityRatio }}</p>
              <p class="character">净值</p>
            </div>

          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <img src="../../assets/admin/top_05.png">
            <div class="item-data">
              <p class="digit">{{ showData[1].startEquity }}</p>
              <p class="character">初始资产(BTC)</p>
            </div>

          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <img src="../../assets/admin/top_06.png">
            <div class="item-data">
              <p class="digit"> {{ showData[1].runningTime }} days</p>
              <p class="character">已经运行</p>
            </div>

          </div>
        </div>
      </div>

      <div class="chart">
        <div class="lineChart">
          <div class="lineChartTitle">
            <p style="font-family: 'Microsoft YaHei', sans-serif; font-size: 25px;">资金总体收益走势报表</p>
            <div class="button">
              <el-button class="myButton" round @click="download()">导出表格</el-button>
              <el-button round @click="clickFun($event)" :class="{ active: isActive==='6h' }">6h</el-button>
              <el-button round @click="clickFun($event)" :class="{ active: isActive==='Day' }">Day</el-button>
              <el-button round @click="clickFun($event)" :class="{ active: isActive==='Week' }">Week</el-button>
              <el-button round @click="clickFun($event)" :class="{ active: isActive==='Month' }">Month</el-button>
            </div>
          </div>
          <div id="lineChart" :style="{width: '100%', height: '80%'}" style="margin-left: 20px; margin-top: 20px"></div>
        </div>
        <div class="pieChart">
          <p style="font-size: 25px; font-family: 'Microsoft YaHei', sans-serif">持币比例</p>
          <div id="pieChart" :style="{width: '90%', height: '80%'}" style="margin-top: 30px"></div>
        </div>
      </div>

      <p class="title" style="margin-top: 30px;">资金子账号</p>
      <div class="bottom-data">
        <div class="bottom-item" v-for="(account, index) in showData">
          <div class="item-top" v-if="index !== 3">
            <p style="font-family: 'Microsoft YaHei', sans-serif; font-size: 20px">子账户 {{ index + 1 }}</p>
            <el-button class="myButton" size="mini" round @click="download()">导出表格</el-button>
          </div>
          <div class="item-top" v-else>
            <p style="font-family: 'Microsoft YaHei', sans-serif; font-size: 20px">开发测试账户</p>
            <el-button class="myButton" size="mini" round @click="download()">导出表格</el-button>
          </div>
          <div class="item-content">
            <div class="top-item">
              <p class="fontFamily">总资产(BTC)</p>
              <p class="data">{{ account.totalEquity }}</p>
            </div>
            <div class="top-item">
              <p class="fontFamily">运行天数</p>
              <p class="data">{{ account.runningTime }}</p>
            </div>
            <div class="top-item">
              <p class="fontFamily">净值</p>
              <p class="data">{{ account.equityRatio }}</p>
            </div>
          </div>
          <div class="item-content2">
            <div class="top-item">
              <p class="fontFamily">目前收益(BTC)</p>
              <p class="data">{{ account.currentProfit }}</p>
            </div>
            <div class="top-item">
              <p class="fontFamily">动态年化</p>
              <p class="data">{{ account.estimatedYearly }}</p>
            </div>
          </div>
          <div :id="'item-lineChart' + index" :style="{width: '100%', height: '50%'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import SubHeader from "../platform-admin/common/SubHeader";
  import Vue from 'vue'

  export default {
    name: "PlatformMain",
    components: {
      "sub-header": SubHeader,
    },
    data() {
      return {
        isActive: '6h',
        lineChart: null,
        itemLineChart: [null, null, null, null],
        pieChart: null,
        showData: [{}, {}, {}, {}],
        lineChartDate: '',
        lineChartData: '',
        lineIntvWord: ['6h', 'Day', 'Week', 'Month'],
        infoEngine: '',
      }
    },
    mounted() {
      // console.log(sessionStorage.getItem("userId"))
      if (sessionStorage.getItem("userId") === null) {
        this.$router.push({path: '/'})
      }
      // this.getDot("6h");
      this.drawPie();
      this.getAllDot()
      this.getAllShowInfo()
      this.infoEngine = setInterval(() => {
        this.getAllShowInfo()
      }, 10000)
      // this.drawLine()
      setTimeout(() => {
        this.drawLine(1)
        this.drawItemLine(0, 1)
        this.drawItemLine(1, 1)
        this.drawItemLine(2, 1)
        this.drawItemLine(3, 1)

      }, 2000)
    },
    created() {

    },
    methods: {
      async getShowInfo(i) {
        // console.log("userid: " + i)
        this.$http({
          method: 'post',
          url: '/showInfo',
          data: {
            userid: i
          }
        }).then((response) => {
          this.showData[i-1] = response.data;
          Vue.set(this.showData, i-1, response.data)
        });
      },
      async getAllShowInfo() {
        for (var i = 1; i <= 4; i++) {
          await this.getShowInfo(i)
        }
        // console.log("showData updated.")
      },
      async getDot(value, userid) {
        this.$http({
          method: 'post',
          url: '/dot' + this.lineIntvWord[value-2],
          data: {
            userid: userid
          }
        }).then((response) => {

          // this.lineChartData = response.data[0];
          // console.log(this.lineChartData, this.lineChartDate);
          // this.drawLine();
          // this.drawItemLine();
          // this.drawItemLine2();
          // this.drawItemLine3();
          // this.drawItemLine4();

          this.lineChartData[userid-1][value-2] = response.data[0]
          var tempChartDate = []
          for (let i = 0; i < response.data[1].length; i++) {
            let t = response.data[1][i]
            let d = new Date(t);
            let Y = d.getFullYear() + '-';
            let M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            let D = d.getDate() + ' ';
            let h = d.getHours() + ':';
            let m = (d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()) + ':';
            let s = (d.getSeconds() < 10 ? '0' + (d.getSeconds()) : d.getSeconds());
            tempChartDate.push(Y + M + D + h + m + s);
          }
          this.lineChartDate[userid-1][value-2] = tempChartDate
        });
      },
      async getAllDot() {
        for (var i = 0; i < 4; i++ ) {
          this.lineChartData = new Array(4).fill(0)
          this.lineChartDate = new Array(4).fill(0)
        }
        for (var j = 0; j < 4; j++) {
          this.lineChartData[j] = new Array(4).fill(0)
          this.lineChartDate[j] = new Array(4).fill(0)
        }

        for (var intv = 2; intv <= 5; intv++) {
          for (var userid = 1; userid <= 4; userid++) {
            await this.getDot(intv, userid)
          }
        }
        // console.log(this.lineChartData)
        // console.log(this.lineChartDate)
      },
      drawLine(intv) {
        // console.log(this.lineChartData[1][0])
        this.lineChart = this.$echarts.init(document.getElementById('lineChart'));
        this.lineChart.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          xAxis: {
            type: 'category',
            data: this.lineChartDate[1][intv-1]
          },
          yAxis: {
            type: 'value',
          },
          legend: {
            x: 'left',
          },
          series: [
            {
              name:"币本位收益",
              data: this.lineChartData[1][intv-1],
              type: 'line',
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: "rgb(112, 152, 242)", //折线点的颜色
                  lineStyle: {
                    color: "rgb(20, 99, 162)" //折线的颜色
                  }
                }
              },
            },
            {
              name:"法币本位",
              data: [],
              type: 'line',
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: "rgb(225, 210, 120)", //折线点的颜色
                  lineStyle: {
                    color: "rgb(219, 197, 111)" //折线的颜色
                  }
                }
              },
            }
          ],
          dataZoom: [
            {
            type: 'inside',
            start: 50,
            end: 100
          }, {
            start: 0,
            end: 50,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }],
        });
        window.addEventListener("resize", () => {
          this.lineChart.resize();
        });
      },
      drawItemLine(id, intv) {
        this.itemLineChart[id] = this.$echarts.init(document.getElementById('item-lineChart'+id));
        this.itemLineChart[id].setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          xAxis: {
            type: 'category',
            data: this.lineChartDate[id][intv]
          },
          yAxis: {
            type: 'value',
          },
          grid: {
            right: '8%',
            left: '15%',
            top: '15%'
          },
          legend: {
            x: 'left',
            top: 0,
            left: 10
          },
          series: [
            {
              name:"币本位收益",
              data: this.lineChartData[id][intv],
              type: 'line',
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: "rgb(112, 152, 242)", //折线点的颜色
                  lineStyle: {
                    color: "rgb(20, 99, 162)" //折线的颜色
                  }
                }
              },
            },
            {
              name:"法币本位",
              data: [],
              type: 'line',
              symbol: 'circle',
              itemStyle: {
                normal: {
                  color: "rgb(225, 210, 120)", //折线点的颜色
                  lineStyle: {
                    color: "rgb(219, 197, 111)" //折线的颜色
                  }
                }
              },
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              start: 50,
              end: 100
            }, {
              start: 0,
              end: 50,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }],
        });
        window.addEventListener("resize", () => {
          this.lineChart.resize();
        });
      },
      drawPie() {
        this.$http({
          method: 'get',
          url: '/pie'
        }).then((response) => {
          // console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].value = response.data[i].value.toFixed(8);
          }
          // 基于准备好的dom，初始化echarts实例
          this.pieChart = this.$echarts.init(document.getElementById('pieChart'));
          // 绘制图表
          this.pieChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{b}: ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              // data: ['BTC', 'ETH', 'LTC', 'EOS', 'USDT','其他']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['35%', '65%'],
                avoidLabelOverlap: true,
                label: {
                  normal: {
                    formatter: '{b|{b}:  }\n{per|{d}%}  ',
                    borderColor: '#aaa',
                    borderWidth: 0,
                    borderRadius: 4,
                    rich: {
                      b: {
                        fontSize: 18,
                        lineHeight: 25,
                        fontFamily: "Microsoft YaHei",
                        color: '#666666'
                      },
                      per: {
                        // color: '#eee',
                        // backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2,
                        fontSize: 18,
                        lineHeight: 25,
                        fontFamily: "Microsoft YaHei",
                        color: '#666666'
                      }
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '20',
                      fontWeight: 'bold'
                    }
                  }
                },
                data: response.data
              }
            ],
            color: ['#9F9F9F', '#E6C71F', '#0D1F87']
          });
          window.addEventListener("resize", () => {
            this.pieChart.resize();
          });
        })

      },
      download() {
         alert("暂未开放功能");
      },
      clickFun(value) {
        this.isActive = value.path[0].textContent;
        if (this.isActive === "6h") {
          // console.log('6h');
          // this.getDot(this.isActive);
          this.drawLine(1)
        }
        else if (this.isActive === "Day") {
          this.drawLine(2)
        }
        else if (this.isActive === "Week") {
          this.drawLine(3)
        }
        else if (this.isActive === "Month") {
          this.drawLine(4)
        }
      },
      showInfo() {
        this.$http({
          method: 'post',
          url: '/showinfo',
          data: {
            userid: sessionStorage.getItem("userId")
          }
        }).then((response) => {
          // console.log(response);
          this.showData = response.data;
          this.showData.startEquity = (parseFloat(this.showData.startEquity) * 30 * 4).toFixed(2)
          this.showData.totalEquity = (parseFloat(this.showData.totalEquity) * 30 * 4).toFixed(2) //调整数据
          // console.log(this.showData);
        });
      }
    },
    filters: {
      filterDate: function (val) {
        if (val == null) return '-';
        let date = new Date(val);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
        return Y + M + D + h + m + s;
      },
    }
  }
</script>

<style lang="less">
  .platformMain {
    .el-button {
      background: rgb(243, 247, 250);
      border: 0;
    }
  }
</style>
<style scoped lang="less">
  .active {
    background: rgb(110, 169, 237);
    color: #000;
  }

  .platformMain {
    width: 100%;
    height: auto;
    padding-bottom: 20px;
    /*background-color: rgb(243, 247, 248);*/
    background: url("../../assets/home/背景.jpg") no-repeat fixed;
    background-size: 130% auto;
    .content {
      padding: 0 20px;
      .title {
        color: #fff;
        font-size: 25px;
        font-family: "Microsoft YaHei", sans-serif;
      }
      .top-data {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        min-width: 1300px;
        .item {
          width: 16%;
          height: 100%;
          border-radius: 5px;
          .item-title {
            margin-top: 15px;
            margin-left: 25px;
            img {
              display: inline-block;
            }
            text-align: center;
            .item-data {
              display: inline-block;
              p {
                color: #fff;
                font-size: 18px;
              }
              .digit {
                font-size: 50px;
                color: #FFFFFF;
                font-family: digitFont, sans-serif;
              }
              .character {
                font-size: 15px;
                font-family: 'Microsoft YaHei', sans-serif;
                font-weight: bold;
                margin-top: -5px;
              }
            }

          }
        }
      }
      .chart {
        width: 100%;
        height: 500px;
        min-width: 1300px;
        margin-top: 15px;
        .lineChart {
          display: inline-block;
          background: white;
          height: 105%;
          width: 60%;
          border-radius: 10px;
          .lineChartTitle {
            margin-top: 30px;
            .myButton {
              background-color: rgb(10, 31, 138);
              color: #fff;
            }
            p {
              color: rgb(58, 67, 72);
              font-size: 22px;
              margin-left: 50px;
              display: inline-block;
            }
            .button {
              margin-top: 10px;
              margin-right: 50px;
              display: inline-block;
              float: right;
            }
          }
        }
        .pieChart {
          display: inline-block;
          height: 105%;
          width: 39%;
          float: right;
          border-radius: 10px;
          background: white;
          p {
            color: rgb(58, 67, 72);
            font-size: 22px;
            margin-left: 20px;
            margin-top: 30px;
            display: inline-block;
          }
          #pieChart {
            margin-left: 30px;
            margin-top: 20px;
          }
        }
      }
      .bottom-data{
        display: flex;
        justify-content: space-between;
        height: 600px;
        width: 100%;
        min-width: 1300px;
        margin-top: 5px;
        .bottom-item{
          display: inline-block;
          height: 520px;
          width: 24%;
          background:#fff;
          border-radius: 10px;
          .item-top{
            width: 90%;
            margin: 15px auto;
            p{
              display: inline-block;
              font-size: 18px;
            }
            .myButton{
              background-color: rgb(240,240,240);
              color: #000;
              font-size: 18px;
              float: right;
            }
          }
          .item-content{
            display: flex;
            justify-content: space-between;
            width: 90%;
            margin: 0 auto;
            .top-item{
              text-align: center;
              .fontFamily{
                font-family: "Microsoft YaHei", sans-serif;
                font-size: 18px;
              }
              .data{
                font-size: 40px;
                font-family: digitFont, sans-serif;
              }
            }
          }
          .item-content2{
            width: 90%;
            margin: 15px auto;
            .top-item{
              display: inline-block;
              text-align: center;
              .fontFamily{
                font-family: "Microsoft YaHei", sans-serif;
                font-size: 16px;
              }
              .data{
                font-size: 40px;
                font-family: digitFont, sans-serif;
              }
            }
          }
        }
      }
    }
  }
</style>
