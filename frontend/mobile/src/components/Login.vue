<template>
    <div class="login">
      <el-input
        v-model="user.username"
        style="width:60%;margin-top: 17px;"
        placeholder="输入登录账号">
        <!--<i slot="prefix" class="iconfont icon-suo"></i>-->
      </el-input>
      <el-input
        type="password"
        v-model="user.password"
        style="width:60%;margin-top: 17px;"
        placeholder="输入登录密码">
        <!--<i slot="prefix" class="iconfont icon-suo"></i>-->
      </el-input>
      <br/>
      <el-button style="margin-top: 17px;width: 60%;background-color: rgb(210,190,140);border: 0;color: #000;" @click="login">登录</el-button>
      <div class="more">
        <span><a href="#">忘记会员名</a></span>
        <span><a href="#">&nbsp;联系我们</a></span>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Login",
      data(){
          return {
            user: {
              username: "",
              password: ""
            },
          }
      },
      methods:{
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
    }
</script>

<style scoped lang="less">
  .login{
    .more {
      width: 60%;
      margin: 10px auto 0 auto;
      span {
        a {
          text-decoration: none;
          color: rgb(175, 175, 175);
          font-size: 11px;
          font-family: font1;
        }
      }
    }
  }

</style>
