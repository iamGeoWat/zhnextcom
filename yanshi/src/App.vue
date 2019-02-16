<template>
  <div id="app">
    <div style="font-size: 19pt; position: absolute; left: 23.5%; right: 30%;">
      <!--<div style="width: 24pt; height: 24pt; border-radius: 12pt; background-color: #7b98f3; position: relative; float: left; margin-top: 5px">-->
        <!--<i class="el-icon-tickets" style="font-size: 12pt; color: #FFFFFF; position: relative; top: -8pt;"></i>-->
      <!--</div>-->
      <img src="./assets/icon.png" style="width: 19pt; height: 19.5pt; float: left; margin-top: 3pt; margin-right: 6pt;"/>
      <div style="position: relative; float: left; color: #172140">提币订单已提交，请耐心等待</div>
    </div>

    <div style="position: absolute; left: 10%; right: 10%; margin-top: 70pt; font-size: 11pt">
      <div style="width: 46pt; height: 46pt; border-radius: 36pt; background-color: #7b98f3; position: relative; float: left; margin-top: 5px;">
        <span style="color: #ffffff; position: relative; top: 15pt;">提交</span>
      </div>
      <div style="width: 110pt; height: 3pt; background-color: #7b98f3; position: relative; float: left; margin-top: 25pt"></div>

      <div style="width: 46pt; height: 46pt; border-radius: 36pt; background-color: #7b98f3; position: relative; float: left; margin-top: 5px">
        <span style="color: #ffffff; position: relative; top: 15pt;">审批</span>
      </div>
      <div style="width: 55pt; height: 3pt; background-color: #7b98f3; position: relative; float: left; margin-top: 25pt"></div>
      <div style="width: 55pt; height: 3pt; background-color: #f2f3f8; position: relative; float: left; margin-top: 25pt"></div>

      <div style="width: 46pt; height: 46pt; border-radius: 36pt; background-color: #f2f3f8; position: relative; float: left; margin-top: 5px">
        <span style="color: #888888; position: relative; top: 15pt;">处理</span>
      </div>
      <div style="width: 110pt; height: 3pt; background-color: #f2f3f8; position: relative; float: left; margin-top: 25pt"></div>

      <div style="width: 46pt; height: 46pt; border-radius: 36pt; background-color: #f2f3f8; position: relative; float: left; margin-top: 5px">
        <span style="color: #888888; position: relative; top: 15pt;">完成</span>
      </div>
    </div>

    <div style="position: absolute; left: 2%; right: 5%; margin-top: 180pt; text-align: left">
      <span style="color: #777777; font-size: 13pt; margin-left: 50pt;"><span style="color: #FFFFFF">你好</span>币种：&nbsp;</span><input value="BTC" style="border: none; font-size: 13pt; color: #000000;" />
      <hr style="background-color: #EEEEEE; height: 1px; border: none; margin-bottom: 15pt; margin-top: 14pt; width: 650pt; margin-left: 10pt;" />

      <span style="color: #777777; font-size: 13pt; margin-left: 50pt;">提币地址：&nbsp;</span><input value="16tTArN33F6iNFAEo7hTPJDQxSKhFT1Efm" style="border: none; font-size: 13pt; color: #000000; width: 300pt" />
      <br/>
      <div style="height: 8pt"></div>
      <span style="color: #777777; font-size: 11.5pt; margin-left: 120pt;">此地址未保存</span><span style="color: #4f94f0; font-size: 11.5pt">  立即保存</span>
      <hr style="background-color: #EEEEEE; height: 1px; border: none; margin-bottom: 14pt; margin-top: 12pt; width: 650pt; margin-left: 10pt;" />

      <span style="color: #777777; font-size: 13pt; margin-left: 50pt;">到账数量：&nbsp;</span><input value="19.9995" style="border: none; font-size: 13pt; color: #000000;" />
      <hr style="background-color: #EEEEEE; height: 1px; border: none; margin-bottom: 14pt; margin-top: 14pt; width: 650pt; margin-left: 10pt;" />
      <span style="color: #777777; font-size: 13pt; margin-left: 50pt;">申请时间：&nbsp;</span><input value="2019-02-15 14:32:11" style="border: none; font-size: 13pt; color: #000000;" />
      <hr style="background-color: #EEEEEE; height: 1px; border: none; margin-bottom: 14pt; margin-top: 14pt; width: 650pt; margin-left: 10pt;" />

    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
#app {
  font-family: "微软雅黑", "Microsoft YaHei", sans-serif !important;
  text-align: center;
  margin-top: 60px;
  background-color: #FFFFFF;

}
</style>
