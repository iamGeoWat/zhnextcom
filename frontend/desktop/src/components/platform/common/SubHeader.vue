<template>
  <el-container style="position: absolute;top: 0;width: 100%;">
      <el-header style="height: 60px;padding: 0;">
        <div class="left">
        </div>
        <div class="more">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <div class="lang">
          {{lang}}
          <img src="../../../assets/platform/下拉.png" height="20" style="vertical-align: middle;">
          <ul style="margin-left: 0;background: #fff;">
            <li style="cursor: pointer;" @click="selectLang($event,'zh')">简体中文</li>
            <li style="cursor: pointer;" @click="selectLang($event,'en')">English</li>
          </ul>
        </div>
        <div class="right">
          <!--<div class="radio"></div>-->
          <div class="radio">
            <img src="../../../assets/platform/交易页面_04.png" height="30">
          </div>
          <div class="tixing">
            <img src="../../../assets/platform/提醒.png" height="30">
          </div>
          <div class="message">
            <img src="../../../assets/platform/信息.png" height="30">
          </div>
          <div class="morefun">
            <img src="../../../assets/platform/更多.png" height="30">
          </div>
        </div>
      </el-header>
    </el-container>
</template>
<style lang="less">
  .el-header{
    padding: 0;
  }
</style>
<style scoped lang="less">
*{
  text-decoration: none;
}
  .left {
    width: 200px;
    height: 100%;
    text-align: center;
    display: inline-block;
    float: left;
    background: #000 url('../../../assets/platform/交易页面_01.png') center center;
    background-size: 100% 100%;
    img {
      vertical-align: middle;
    }
    span {
      font-family: font1;
      line-height: 60px;
      font-size: 16px;
      color: #fff;
      cursor: pointer;
    }
  }
  .right {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
    color: #000;
    font-size: 14px;
    cursor: pointer;
    height: 60px;
    .tixing,.message,.morefun{
      margin-left: 30px;
    }
  }
  .more{
    float: left;
    height: 12px;
    width: 20px;
    margin: 24px 0 24px 20px;
    display: inline-block;
    vertical-align: middle;
    .line {
      height: 2px;
      width: 20px;
      background-color: rgb(142,153,155);
      margin-bottom: 3px;
    }
  }
.lang{
  float: left;
  width: 160px;
  color: #3A4348;
  line-height: 56px;
  text-align: center;
  display: inline-block;
  ul{
    display: none;
    list-style: none;
    li{
      float:none;
      a{
        text-decoration: none;
        color: #3A4348;
      }
    }
  }
}
.lang:hover ul{
  display: block;
}
</style>
<script>

  export default {
    name: "SubHeader",
    data(){
      return {
        "lang":"简体中文"
      }
    },
    created() {
    },
    destroyed(){

    },
    methods:{
      selectLang(e,value){
        console.log(e.target.innerText);
        this.lang=e.target.innerText;
        this.$i18n.locale = value;
      }
    }
  }

</script>
