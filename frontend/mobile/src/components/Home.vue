<template>
  <div class="home">
    <div class="main">
      <img src="../assets/home/logo.png" height="110">
      <p>智汇未来VIP登录系统</p>
      <p>大龙鱼资本</p>
      <div class="login" @click="clickFun($event)" :class="{ active: isActive==='登录' }">
        <p>登录</p>
        <div class="line"></div>
      </div>
      <div class="login" @click="clickFun($event)" :class="{ active: isActive==='游客登录' }">
        <p>游客登录</p>
        <div class="line"></div>
      </div>
      <br/>
      <router-view/>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        isActive:"登录"
      }
    },
    mounted(){
      this.$router.push({ path: '/login' });
    },
    methods: {
      clickFun(value) {
        this.isActive = value.path[0].innerText;
        console.log(value.path[0].innerText);
        if (this.isActive==='登录'){
          this.$router.push('/login')
        }
        else if (this.isActive==='游客登录'){
          this.$router.push('/visitor')
        }
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
  .active{
    .line{
      background: rgb(175,175,175);
    }
  }
  .home {
    height: 100%;
    width: 100%;
    background: url("../assets/home/背景.jpg") center center;
    background-size: cover;
    .main {
      text-align: center;
      img {
        margin-top: 40%;
      }
      p {
        color: #fff;
        font-size: 25px;
        margin-top: 10px;
        font-family: font1;
      }
      .login{
        display: inline-block;
        text-align: center;
        p{
          font-family: font1;
          font-size: 15px;
          color: rgb(175, 175, 175);
        }
        .line{
          height: 2px;
          width: 25px;
          /*background: rgb(175,175,175);*/
          margin: 5px auto 0 auto;
        }
      }

    }
  }
</style>
