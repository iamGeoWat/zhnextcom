<template>
  <div class="home">
    <div class="menu">
      <ul>
        <li><img src="../assets/home/logo.png" alt="logo"></li>
        <li><a href="#">大龙鱼的故事</a></li>
        <li><a href="#">我们的合作伙伴</a></li>
        <li><a href="#">出席的活动</a></li>
        <li><a href="#">合作意向</a></li>
        <li><img style="margin-top: 19px" src="../assets/home/点点.png"></li>
        <li class="lang">
          {{lang}}
          <img src="../assets/home/icon_三角形.png" height="20" style="vertical-align: middle;">
          <ul style="margin-left: 0">
            <li><a href="#" @click="selectLang($event)">简体中文</a></li>
            <li><a href="#" @click="selectLang($event)">English</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="main-left">
        <p style="margin-top: 38%;font-size: 100px;">大龙鱼资本<br>智汇未来</p>
        <p style="margin-top: 50px;font-size: 50px;">共聚智慧&nbsp;共赢未来</p>
        <a href="#">LEARN MORE ></a>
      </div>
      <div class="main-right">
        <img src="../assets/home/logo1.png" height="110">
        <p>VIP登录系统</p>
        <el-input
          v-model="user.username"
          style="width:60%;margin-top: 17px;"
          placeholder="输入您的账号">
          <!--<i slot="prefix" class="iconfont icon-suo"></i>-->
        </el-input>
        <el-input
          v-model="user.password"
          style="width:60%;margin-top: 17px;"
          placeholder="输入您的密码">
          <!--<i slot="prefix" class="iconfont icon-suo"></i>-->
        </el-input>
        <br/>
        <el-button style="margin-top: 17px;width: 60%;background-color: rgb(210,190,140);border: 0;color: #000;" @click="login">登录</el-button>
        <div class="more">
          <span style="float: left;"><a href="#">游客登录</a></span><span style="float: right;"><a
          href="#">联系我们</a></span><span style="float: right;">&nbsp;&nbsp;|&nbsp;&nbsp;</span><span
          style="float: right;"><a href="#">忘记会员名</a></span>
        </div>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
  import Footer from '../common/Footer';

  export default {
    name: 'Home',
    components:{
      "myFooter": Footer,
    },
    data() {
      return {
        lang: "简体中文",
        user:{
          username:"",
          password:""
        }
      }
    },
    methods: {
      selectLang(e) {
        console.log(e.target.innerText);
        this.lang = e.target.innerText;
      },
      login() {
        this.$http({
          method: 'post',
          url: '/login',
          data: this.user
        }).then((response)=> {
          console.log(response);
          sessionStorage.setItem("auth",response.data.content);
          sessionStorage.setItem("userId",response.data.userid);
          console.log(sessionStorage.getItem("userId"));
          this.$router.push({ path: '/platform' });
        });
      }
    },
  }
</script>
<style lang="less">
  .el-input__inner {
    border-radius: 18px;
  }
</style>
<style scoped lang="less">
  .home {
    /*padding-top: 1px;*/
    height: 100%;
    width: 100%;
    /*min-height: 900px;*/
    /*min-width: 1300px;*/
    background: url("../assets/home/背景.jpg") center center;
    background-size: cover;
    .menu {
      position: absolute;
      font-weight: bold;
      font-size: 15px;
      /*float: left;*/
      margin-top: 8px;
      ul {
        list-style: none;
        padding: 0;
        overflow: hidden;
        height: auto;
        margin-left: 15px;
        li {
          float: left;
          a {
            color: #fff;
            width: 160px;
            text-decoration: none;
            text-align: center;
            display: block;
            line-height: 56px;
            cursor: pointer;
            font-family: "Source Han Sans CN";
          }
          p {
            color: #fff;
            width: 160px;
            text-align: center;
            line-height: 56px;
            cursor: pointer;
          }
        }
        .lang {
          width: 160px;
          color: #fff;
          line-height: 56px;
          text-align: center;
          ul {
            display: none;
            li {
              float: none;
            }
          }
        }
        .lang:hover ul {
          display: block;
        }
      }
    }
    .main {
      .main-left {
        width: 50%;
        display: inline-block;
        p {
          font-family: font1, serif;
          color: #fff;
          margin-left: 25%;
        }
        a {
          color: #fff;
          margin-left: 25%;
          font-size: 25px;
          font-weight: bold;
          line-height: 40px;
        }
      }
      .main-right {
        position: absolute;
        top: 25%;
        right: 5%;
        display: inline-block;
        width: 460px;
        height: 480px;
        background-color: #000;
        text-align: center;
        img {
          margin-top: 50px;
        }
        p {
          color: #fff;
          font-size: 25px;
          margin-top: 10px;
        }
        .more {
          width: 60%;
          margin: 10px auto 0 auto;
          span {
            a {
              text-decoration: none;
              color: rgb(175, 175, 175);
              font-size: 11px;
            }
          }
          .vline {
            width: 1px;
            height: 15px;
            background-color: #fff;
          }
        }
      }
    }
  }
</style>
