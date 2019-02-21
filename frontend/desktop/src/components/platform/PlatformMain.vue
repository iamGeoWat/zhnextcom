<template>
  <div class="platformMain">
    <p class="title">{{$t('platform.body.title1')}}</p>
    <div class="top-data">
      <div class="item">
        <div class="item-title">
          <img src="../../assets/platform/交易页面_19.png" height="40">
          <p>{{$t('platform.body.body1_1')}}</p>
        </div>
        <div class="item-content">
          <div style="margin-top: 15px">
            <img src="../../assets/platform/向上.png" height="13">
            <p style="font-size: 38px;">{{this.showData.totalEquity}}</p>
            <p style="vertical-align: bottom;">BTC</p>
            <br/>
            <p style="font-size: 12px;color: rgb(181,181,181);">TOTAL NET WORTH</p>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-title">
          <img src="../../assets/platform/交易页面_21.png" height="40">
          <p>{{$t('platform.body.body1_2')}}</p>
        </div>
        <div class="item-content">
          <div style="margin-top: 15px">
            <img src="../../assets/platform/向上.png" height="13">
            <p style="font-size: 38px;">{{this.showData.currentProfitRatio}}</p>
            <p style="vertical-align: bottom;">%</p>
            <br/>
            <p style="font-size: 12px;color: rgb(181,181,181);">TOTAL PROFIT RATIO</p>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-title">
          <img src="../../assets/platform/交易页面_23.png" height="40">
          <p>{{$t('platform.body.body1_3')}}</p>
        </div>
        <div class="item-content">
          <div style="margin-top: 15px">
            <img src="../../assets/platform/向上.png" height="13">
            <p style="font-size: 38px;">{{showData.estimatedYearly}}</p>
            <p style="vertical-align: bottom;">%</p>
            <br/>
            <p style="font-size: 12px;color: rgb(181,181,181);">YEARLY ESTIMATE</p>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-title">
          <img src="../../assets/platform/交易页面_25.png" height="40">
          <p>{{$t('platform.body.body1_4')}}</p>
        </div>
        <div class="item-content">
          <div style="margin-top: 15px">
            <img src="../../assets/platform/向上.png" height="13">
            <p style="font-size: 38px;">{{showData.equityRatio}}</p>
            <br/>
            <p style="font-size: 12px;color: rgb(181,181,181);">TOTAL EQUITY RATIO</p>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-title">
          <img src="../../assets/platform/初始资产.png" height="40">
          <p>{{$t('platform.body.body1_5')}}</p>
        </div>
        <div class="item-content">
          <div style="margin-top: 15px">
            <img src="../../assets/platform/向上.png" height="13">
            <p style="font-size: 38px;">{{this.showData.startEquity}}</p>
            <p style="vertical-align: bottom;">BTC</p>
            <br/>
            <p style="font-size: 12px;color: rgb(181,181,181);">START EQUITY</p>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-title">
          <img src="../../assets/platform/交易页面_27.png" height="40">
          <p>{{$t('platform.body.body1_6')}}</p>
        </div>
        <div class="item-content">
          <div style="margin-top: 15px">
            <img src="../../assets/platform/向上.png" height="13">
            <p style="font-size: 38px;">{{showData.runningTime}}</p>
            <p style="vertical-align: bottom;">天</p>
            <br/>
            <p style="font-size: 12px;color: rgb(181,181,181);">EXISTING TIME</p>
          </div>
        </div>
      </div>
    </div>
    <p class="title" style="margin-top: 40px;">{{$t('platform.body.title2')}}</p>
    <div class="chart">
      <div class="lineChart">
        <div class="lineChartTitle">
          <p>{{$t('platform.body.body2_1')}}</p>
          <div class="button">
            <el-button round @click="clickFun($event)" :class="{ active: isActive==='6h' }">6h</el-button>
            <el-button round @click="clickFun($event)" :class="{ active: isActive==='Day' }">Day</el-button>
            <el-button round @click="clickFun($event)" :class="{ active: isActive==='Week' }">Week</el-button>
            <el-button round @click="clickFun($event)" :class="{ active: isActive==='Month' }">Month</el-button>
          </div>
        </div>
        <div id="lineChart" :style="{width: '100%', height: '80%'}"></div>
      </div>
      <div class="pieChart">
        <p>{{$t('platform.body.body2_2')}}</p>
        <div id="pieChart" :style="{width: '95%', height: '80%'}"></div>
      </div>
    </div>
    <div class="listTable">
      <p>{{$t('platform.body.title3')}}</p>
      <div class="tableMargin">
        <el-table
          :data="tableData"
          size="mini"
          height="500"
          style="width: 100%;">
          <el-table-column
            prop="type"
            :label="$t('platform.body.body3_1')"
            align="center">
          </el-table-column>
          <el-table-column
            prop="lever"
            :label="$t('platform.body.body3_2')"
            align="center">
          </el-table-column>
          <el-table-column
            :label="$t('platform.body.body3_3')"
            align="center">
            <template slot-scope="scope">
              <span>{{tableData[scope.$index].time | filterDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="num"
            :label="$t('platform.body.body3_4')"
            align="center">
          </el-table-column>
          <el-table-column
            prop="price"
            :label="$t('platform.body.body3_5')"
            align="center">
          </el-table-column>
          <el-table-column
            prop="avg"
            :label="$t('platform.body.body3_6')"
            align="center">
          </el-table-column>
          <el-table-column
            prop="income"
            :label="$t('platform.body.body3_7')"
            align="center">
          </el-table-column>
        </el-table>
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
        lineChartDate:[],
        lineChartData:[],
        infoEngine: '',
      }
    },
    mounted() {
      console.log(sessionStorage.getItem("userId"))
      if (sessionStorage.getItem("userId") === null) {
        this.$router.push({ path: '/' })
      }
      // this.drawLine();
      this.getDot("6h");
      this.drawPie();
    },
    created(){
      this.showInfo()
      this.infoEngine = setInterval(() => {
        this.showInfo()
      }, 10000)
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
                color: "rgb(112, 152, 242)", //折线点的颜色
                lineStyle: {
                  color: "rgb(197, 224, 69)" //折线的颜色
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
          console.log(response.data);
          for (let i=0; i< response.data.length;i++){
            response.data[i].value=response.data[i].value.toFixed(8);
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
                    formatter: '  {b|{b}：}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                      b: {
                        fontSize: 16,
                        lineHeight: 30
                      },
                      per: {
                        // color: '#eee',
                        // backgroundColor: '#334455',
                        padding: [2, 4],
                        borderRadius: 2,
                        fontSize:16,
                        lineHeight: 30
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
      clickFun(value) {
        this.isActive = value.path[0].textContent;
        if (this.isActive==="6h"){
          // console.log('6h');
          this.getDot(this.isActive);
        }
        else if (this.isActive==="Day") {
          console.log('Day');
          this.getDot(this.isActive);
        }
        else if (this.isActive==="Week") {
          console.log('Week');
          this.getDot(this.isActive);
        }
        else if (this.isActive==="Month") {
          console.log('Month');
          this.getDot(this.isActive);
        }
      },
      showInfo(){
        this.$http({
          method: 'post',
          url: '/showinfo',
          data: {
            userid: sessionStorage.getItem("userId")
          }
        }).then((response)=> {
          console.log(response);
          this.showData=response.data;
          // this.showData.startEquity = (parseFloat(this.showData.startEquity)*30*4).toFixed(2)
          // this.showData.totalEquity = (parseFloat(this.showData.totalEquity)*30*4).toFixed(2) //调整数据
          console.log(this.showData);
        });
      },
      getDot(value){
        this.lineChartDate=[];
        this.lineChartData=[];
        this.$http({
          method: 'post',
          url: '/dot'+value,
          data: {
            userid: sessionStorage.getItem("userId")
          }
        }).then((response)=> {
          for (let i=0;i<response.data[1].length;i++){
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
          this.lineChartData=response.data[0];
          console.log(this.lineChartData,this.lineChartDate);
          this.drawLine();
        });
      }
    },
    filters:{
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
    height: 100%;
    background-color: rgb(243, 247, 248);
    .title {
      color: rgb(58, 67, 72);
      font-size: 24px;
    }
    .top-data {
      width: 100%;
      height: 180px;
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      min-width: 1300px;
      .item {
        width: 16%;
        height: 100%;
        background: white;
        border-radius: 5px;
        .item-title {
          height: 40px;
          margin-top: 15px;
          margin-left: 25px;
          img {
            vertical-align: middle;
          }
          p {
            color: rgb(58, 67, 72);
            font-size: 16px;
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
    .chart {
      width: 100%;
      height: 500px;
      min-width: 1300px;
      margin-top: 15px;
      .lineChart {
        display: inline-block;
        background: white;
        height: 100%;
        width: 60%;
        border-radius: 10px;
        .lineChartTitle {
          margin-top: 30px;
          p {
            color: rgb(58, 67, 72);
            font-size: 22px;
            margin-left: 50px;
            display: inline-block;
          }
          .button {
            margin-right: 50px;
            display: inline-block;
            float: right;
          }
        }
      }
      .pieChart {
        display: inline-block;
        height: 100%;
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
    .listTable {
      padding-top: 1px;
      height: 600px;
      width: 100%;
      background: white;
      border-radius: 10px;
      margin-top: 15px;
      margin-bottom: 20px;
      min-width: 1300px;
      p {
        color: rgb(58, 67, 72);
        font-size: 22px;
        margin-left: 50px;
        margin-top: 30px;
      }
      .tableMargin {
        width: 95%;
        height: 500px;
        margin: 30px auto 0 auto;
      }
    }
  }
</style>
