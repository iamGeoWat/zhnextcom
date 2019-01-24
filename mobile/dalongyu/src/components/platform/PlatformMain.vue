<template>
  <div class="platformMain">
    <div class="topBack">
      <img style="margin-left: 10px;" src="../../assets/platform/logo.png" height="30">
      <p class="bigTitle">智汇未来</p>
      <img style="float: right;margin-right: 10px;" src="../../assets/platform/交易页面_04.png" height="30">
      <div class="top">
        <p class="title" style="color: rgb(243,247,248);">基金情况披露</p>
        <div class="top-data">
          <div class="data1">
            <div class="item">
              <div class="item-title">
                <img src="../../assets/platform/交易页面_19.png" height="30">
                <p>总资产</p>
              </div>
              <div class="item-content">
                <div>
                  <img src="../../assets/platform/向上.png" height="10">
                  <p style="font-size: 24px;">{{this.showData.totalEquity*30}}</p>
                  <p style="vertical-align: bottom;font-size: 11px;">BTC</p>
                  <br/>
                  <p style="font-size: 5px;color: rgb(181,181,181);">TOTAL NET WORTH</p>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item-title">
                <img src="../../assets/platform/交易页面_21.png" height="30">
                <p>目前收益</p>
              </div>
              <div class="item-content">
                <div>
                  <img src="../../assets/platform/向上.png" height="10">
                  <p style="font-size: 24px;">{{this.showData.currentProfitRatio}}</p>
                  <p style="vertical-align: bottom;font-size: 11px;">%</p>
                  <br/>
                  <p style="font-size: 5px;color: rgb(181,181,181);">TOTAL PROFIT RATIO</p>
                </div>
              </div>
            </div>
          </div>
          <div class="data1">
            <div class="item">
              <div class="item-title">
                <img src="../../assets/platform/交易页面_23.png" height="30">
                <p>动态年化</p>
              </div>
              <div class="item-content">
                <div>
                  <img src="../../assets/platform/向上.png" height="10">
                  <p style="font-size: 24px;">{{showData.estimatedYearly}}</p>
                  <p style="vertical-align: bottom;font-size: 11px;">%</p>
                  <br/>
                  <p style="font-size: 5px;color: rgb(181,181,181);">YEARLY ESTIMATE</p>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item-title">
                <img src="../../assets/platform/交易页面_25.png" height="30">
                <p>净值</p>
              </div>
              <div class="item-content">
                <div>
                  <img src="../../assets/platform/向上.png" height="10">
                  <p style="font-size: 24px;">{{showData.equityRatio}}</p>
                  <br/>
                  <p style="font-size: 5px;color: rgb(181,181,181);">TOTAL EQUITY RATIO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <p class="title" style="margin-top: 25px;">基金情况披露</p>
      <div class="chart">
        <div class="lineChart">
          <div class="lineChartTitle">
            <p>单位百分比</p>
            <div class="button">
              <el-button round @click="clickFun($event)" :class="{ active: isActive==='6h' }" type="mini">6h</el-button>
              <el-button round @click="clickFun($event)" :class="{ active: isActive==='Day' }" type="mini">Day</el-button>
              <el-button round @click="clickFun($event)" :class="{ active: isActive==='Week' }" type="mini">Week
              </el-button>
              <el-button round @click="clickFun($event)" :class="{ active: isActive==='Month' }" type="mini">Month
              </el-button>
            </div>
          </div>
          <div id="lineChart" :style="{width: '100%', height: '80%'}"></div>
        </div>
        <p class="title" style="margin-top: 20px">当前帐号持币比例</p>
        <div class="pieChart">
          <div id="pieChart" :style="{width: '100%', height: '90%'}"></div>
        </div>
      </div>
      <p class="title" style="margin-top: 25px;">交易记录</p>
      <div class="listTable">
        <div class="tableMargin">
          <el-table
            :data="tableData"
            size="mini"
            height="400"
            style="width: 100%;">
            <el-table-column
              prop="type"
              label="合约类型"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="lever"
              label="杠杆"
              align="center"
              width="45">
            </el-table-column>
            <el-table-column
              label="交易时间"
              align="center"
              width="55">
              <template slot-scope="scope">
                <span>{{tableData[scope.$index].time | filterDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="num"
              label="委托数量"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="price"
              label="委托价格"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="avg"
              label="成交均价"
              align="center"
              width="50">
            </el-table-column>
            <el-table-column
              prop="income"
              label="收益"
              align="center"
              width="50">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "PlatformMain",
    data() {
      return {
        isActive: '6h',
        lineChart: null,
        pieChart: null,
        tableData: [
          {
            type: "EOS0329",
            lever: "20",
            time: 1546876800000,
            num: "498.6254",
            price: "2.547",
            avg: "2.548",
            income: "1254.3532"
          },
          {
            type: "EOS0329",
            lever: "20",
            time: 1546876800000,
            num: "498.6254",
            price: "2.547",
            avg: "2.548",
            income: "1254.3532"
          }
        ],
        showData: {},
        lineChartDate: [],
        lineChartData: [],
      }
    },
    mounted() {
      // this.drawLine();
      this.getDot("6h");
      this.drawPie();
    },
    created() {
      this.showInfo();
    },
    methods: {
      drawLine() {
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
            data: this.lineChartDate
          },
          yAxis: {
            type: 'value',
          },
          series: [{
            data: this.lineChartData,
            type: 'line',
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: "rgb(112, 152, 242)",//折线点的颜色
                lineStyle: {
                  color: "rgb(197, 224, 69)"//折线的颜色
                }
              }
            },
          }],
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 50
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
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].value = response.data[i].value.toFixed(6);
          }
          // 基于准备好的dom，初始化echarts实例
          this.pieChart = this.$echarts.init(document.getElementById('pieChart'));
          // 绘制图表
          this.pieChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              // orient: 'vertical',
              x: 'left',
              // data: ['BTC', 'ETH', 'LTC', 'EOS', 'USDT','其他']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['30%', '55%'],
                avoidLabelOverlap: true,
                label: {
                  normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}\n  {c}  \n  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    // textAlign:center,
                    rich: {
                      a: {
                        color: '#999',
                        lineHeight: 15,
                        align: 'center',
                        fontSize: 10
                      },
                      hr: {
                        borderColor: '#aaa',
                        width: '100%',
                        borderWidth: 0.5,
                        height: 0
                      },
                      b: {
                        fontSize: 11,
                        lineHeight: 15
                      },
                      per: {
                        color: '#eee',
                        backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2
                      }
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '15',
                      fontWeight: 'bold'
                    }
                  }
                },
                data: response.data
              }
            ]
          });
          window.addEventListener("resize", () => {
            this.pieChart.resize();
          });
        })

      },
      clickFun(value) {
        this.isActive = value.path[0].textContent;
        if (this.isActive === "6h") {
          // console.log('6h');
          this.getDot(this.isActive);
        }
        else if (this.isActive === "Day") {
          console.log('Day');
          this.getDot(this.isActive);
        }
        else if (this.isActive === "Week") {
          console.log('Week');
          this.getDot(this.isActive);
        }
        else if (this.isActive === "Month") {
          console.log('Month');
          this.getDot(this.isActive);
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
          console.log(response);
          this.showData = response.data;
          console.log(this.showData);
        });
      },
      getDot(value) {
        this.lineChartDate = [];
        this.lineChartData = [];
        this.$http({
          method: 'get',
          url: '/dot' + value,
        }).then((response) => {
          for (let i = 0; i < response.data[1].length; i++) {
            let t = response.data[1][i]
            let d = new Date(t);
            let Y = d.getFullYear() + '-';
            let M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
            let D = d.getDate() + ' ';
            let h = d.getHours() + ':';
            let m = (d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()) + ':';
            let s = (d.getSeconds() < 10 ? '0' + (d.getSeconds()) : d.getSeconds());
            this.lineChartDate.push(Y + M + D + h + m + s);
          }
          this.lineChartData = response.data[0];
          console.log(this.lineChartData, this.lineChartDate);
          this.drawLine();
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
    .cell{
      padding-left: 0;
      padding-right: 0;
      font-size: 8px;
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
    height: 100%;
    margin: 0 auto;
    background-color: rgb(243, 247, 248);
    .title {
      color: rgb(58, 67, 72);
      font-size: 15px;
      margin-left: 5px;
    }
    .topBack{
      background: url("../../assets/platform/手机back.jpg") center center;
      background-size: 100% 100%;
      img{
        vertical-align: middle;
        margin-top: 10px;
      }
      .bigTitle{
        display: inline-block;
        font-family: font1;
        color: #fff;
        vertical-align: middle;
        font-size: 18px;
        margin-top: 10px;
      }
      .top{
        width: 97.5%;
        margin: 30px auto 0 auto;
        .top-data {
          width: 100%;
          /*height: 180px;*/
          margin-top: 5px;
          padding-bottom: 1px;
          .data1 {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .item {
              width: 49%;
              height: 110px;
              background: white;
              border-radius: 5px;
              .item-title {
                /*height: 40px;*/
                margin-top: 10px;
                margin-left: 10px;
                img {
                  vertical-align: middle;
                }
                p {
                  color: rgb(58, 67, 72);
                  font-size: 12px;
                  display: inline-block;
                  vertical-align: middle;
                }
              }
              .item-content {
                text-align: center;
                p {
                  color: rgb(58, 67, 72);
                  vertical-align: middle;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }
    .bottom{
      width: 97.5%;
      margin: 0 auto;
      .lineChart {
        background: white;
        height: 300px;
        width: 100%;
        border-radius: 10px;
        padding-top: 1px;
        .lineChartTitle {
          margin-top: 10px;
          p {
            color: rgb(58, 67, 72);
            font-size: 10px;
            margin-left: 15px;
            display: inline-block;
          }
          .button {
            margin-right: 10px;
            display: inline-block;
            float: right;
          }
        }
      }
      .pieChart {
        height: 400px;
        width: 100%;
        border-radius: 10px;
        background: white;
        padding-top: 1px;
        p {
          color: rgb(58, 67, 72);
          font-size: 22px;
          margin-left: 20px;
          margin-top: 30px;
          display: inline-block;
        }
        #pieChart {
          margin-top: 10px;
        }
      }
      .listTable {
        padding-top: 1px;
        height: 400px;
        width: 100%;
        background: white;
        border-radius: 10px;
        margin-top: 5px;
        margin-bottom: 20px;
        p {
          color: rgb(58, 67, 72);
          font-size: 22px;
          margin-left: 50px;
          margin-top: 30px;
        }
        .tableMargin {
          width: 100%;
          height: 400px;
        }
      }
    }
  }
</style>
