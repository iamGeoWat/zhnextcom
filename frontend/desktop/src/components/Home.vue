<template>
  <div class="home">
    <div class="menu">
      <ul>
        <li><img src="../assets/home/logo.png" alt="logo"></li>
        <li><a href="#">{{$t('home.header.title1')}}</a></li>
        <li><a href="#">{{$t('home.header.title2')}}</a></li>
        <li><a href="#">{{$t('home.header.title3')}}</a></li>
        <li><a href="#">{{$t('home.header.title4')}}</a></li>
        <li><img style="margin-top: 19px" src="../assets/home/点点.png"></li>
        <li class="lang">
          {{lang}}
          <img src="../assets/home/icon_三角形.png" height="20" style="vertical-align: middle;">
          <ul style="margin-left: 0">
            <li @click="selectLang($event,'zh')">简体中文</li>
            <li @click="selectLang($event,'en')">English</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="main-left">
        <p style="margin-top: 38%;font-size: 100px;">{{$t('home.body.body1')}}<br>{{$t('home.body.body2')}}</p>
        <p style="margin-top: 50px;font-size: 50px;">{{$t('home.body.body3')}}</p>
        <a href="#">LEARN MORE ></a>
      </div>
      <div class="main-right">
        <img src="../assets/home/logo1.png" height="110">
        <p>{{$t('home.body.body4')}}</p>
        <el-input
          v-model="user.username"
          style="width:60%;margin-top: 17px;"
          :placeholder="$t('home.body.body5')">
          <!--<i slot="prefix" class="iconfont icon-suo"></i>-->
        </el-input>
        <el-input
          type="password"
          v-model="user.password"
          style="width:60%;margin-top: 17px;"
          :placeholder="$t('home.body.body6')">
          <!--<i slot="prefix" class="iconfont icon-suo"></i>-->
        </el-input>
        <br/>
        <el-button style="margin-top: 17px;width: 60%;background-color: rgb(210,190,140);border: 0;color: #000;"
                   @click="login">{{$t('home.body.body7')}}
        </el-button>
        <div class="more">
          <span style="float: left;"><a href="#">{{$t('home.body.body9')}}</a></span>
          <span style="float: right;"><a href="#">{{$t('home.body.body8')}}</a></span>
          <span style="float: right;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span style="float: right;"><a href="#">{{$t('home.body.body10')}}</a></span>
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
    components: {
      "myFooter": Footer,
    },
    data() {
      return {
        lang: "简体中文",
        user: {
          username: "",
          password: ""
        },
      }
    },
    methods: {
      selectLang(e, value) {
        console.log(e.target.innerText);
        this.lang = e.target.innerText;
        this.$i18n.locale = value;
      },
      login() {
        this.$http({
          method: 'post',
          url: '/login',
          data: this.user
        }).then((response) => {
          console.log(response);
          sessionStorage.setItem("auth", response.data.content);
          sessionStorage.setItem("userId", response.data.userid);
          console.log(sessionStorage.getItem("userId"));
          // let userPath = '/platform/' + response.data.userid
          this.$router.push({path: "/platform"});
          // 1
        });
      }
    },
    created() {
      let userid = sessionStorage.getItem("userId")
      if (userid !== null) {
        // let userPath = '/platform/' + userid
        this.$router.push({path: "/platform"})
      }
    }
    // 2
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
              cursor: pointer;
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
            color: rgb(175, 175, 175);
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
