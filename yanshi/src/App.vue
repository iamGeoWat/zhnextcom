<template>
  <div id="app">
    <div style="font-size: 24pt; position: absolute; left: 30%; right: 30%;">
      <div style="width: 24pt; height: 24pt; border-radius: 12pt; background-color: #7b98f3; position: relative; float: left; margin-top: 5px">
        <i class="el-icon-tickets" style="font-size: 12pt; color: #FFFFFF; position: relative; top: -8pt;"></i>
      </div>
      <div style="position: relative; float: left">提币订单已提交，请耐心等待</div>
    </div>

    <div style="position: absolute; left: 10%; right: 10%; margin-top: 75pt;">
      <div style="width: 72pt; height: 72pt; border-radius: 36pt; background-color: #7b98f3; position: relative; float: left; margin-top: 5px;">
        <span style="font-size: 18pt; color: #ffffff; position: relative; top: 22pt;">提交</span>
      </div>
      <div style="width: 144pt; height: 3pt; background-color: #7b98f3; position: relative; float: left; margin-top: 36pt"></div>

      <div style="width: 72pt; height: 72pt; border-radius: 36pt; background-color: #7b98f3; position: relative; float: left; margin-top: 5px">
        <span style="font-size: 18pt; color: #ffffff; position: relative; top: 22pt;">审批</span>
      </div>
      <div style="width: 72pt; height: 3pt; background-color: #7b98f3; position: relative; float: left; margin-top: 36pt"></div>
      <div style="width: 72pt; height: 3pt; background-color: #f2f3f8; position: relative; float: left; margin-top: 36pt"></div>

      <div style="width: 72pt; height: 72pt; border-radius: 36pt; background-color: #f2f3f8; position: relative; float: left; margin-top: 5px">
        <span style="font-size: 18pt; color: #888888; position: relative; top: 22pt;">处理</span>
      </div>
      <div style="width: 144pt; height: 3pt; background-color: #f2f3f8; position: relative; float: left; margin-top: 36pt"></div>

      <div style="width: 72pt; height: 72pt; border-radius: 36pt; background-color: #f2f3f8; position: relative; float: left; margin-top: 5px">
        <span style="font-size: 18pt; color: #888888; position: relative; top: 22pt;">完成</span>
      </div>
    </div>

    <div style="position: absolute; left: 5%; right: 5%; margin-top: 250pt; text-align: left">
      <span style="color: #777777; font-size: 14pt; margin-left: 50pt;">币种：</span><input value="BTC" style="border: none; font-size: 14pt; color: #000000;" />
      <hr style="background-color: #dddddd; height: 1px; border: none; margin-bottom: 15pt; margin-top: 15pt;" />

      <span style="color: #777777; font-size: 14pt; margin-left: 50pt;">提币地址：</span><input value="16tTArN33F6iNFAEo7hTPJDQxSKhFT1Efm" style="border: none; font-size: 14pt; color: #000000; width: 300pt" />
      <br/>
      <span style="color: #777777; font-size: 12pt; margin-left: 120pt">此地址未保存</span><span style="color: #4f94f0; font-size: 12pt">  立即保存</span>
      <hr style="background-color: #dddddd; height: 1px; border: none; margin-bottom: 15pt; margin-top: 15pt;" />

      <span style="color: #777777; font-size: 14pt; margin-left: 50pt;">到账数量：</span><input value="19.9995" style="border: none; font-size: 14pt; color: #000000;" />
      <hr style="background-color: #dddddd; height: 1px; border: none; margin-bottom: 15pt; margin-top: 15pt;" />
      <span style="color: #777777; font-size: 14pt; margin-left: 50pt;">申请时间：</span><input value="2019-02-15 14:32:11" style="border: none; font-size: 14pt; color: #000000;" />
      <hr style="background-color: #dddddd; height: 1px; border: none; margin-bottom: 15pt; margin-top: 15pt;" />

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
  font-family: "Microsoft YaHei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
