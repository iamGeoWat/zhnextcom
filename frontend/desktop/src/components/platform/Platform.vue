<template>
  <div style="width: 100%;height: 100%;position: relative;box-sizing: border-box;padding-top: 60px;">
    <sub-header></sub-header>
    <el-container style="width: 100%;height: 100%;background-color: rgb(245, 245, 245);">
      <sub-nav></sub-nav>
      <el-main class="platformMainContainer">
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script>

  import SubHeader from './common/SubHeader';
  import SubNav from './common/SubNav';
  export default {
    name: "Platform",
    components: {
      "sub-header":SubHeader,
      "sub-nav":SubNav
    },
    mounted(){
      this.$router.push({ path: '/platform/1' });
    }, // 3
    beforeRouteEnter (to, from, next) {
      if (to.meta.requireAuth) {         //如果需要跳转 ，往下走（1）
        console.log(sessionStorage.getItem("userId"));
        if (sessionStorage.getItem("userId") !== null){
          next();
        }
        else{
          console.log('没有登录');      //如果没有登陆过，或者token 过期， 那么跳转到登录页
          next('/');
        }
      } else {                           //不需要跳转，直接往下走
        next();
      }
    },
  }
</script>

<style>

  /* .el-main{
    padding: 0;
  } */

  .platformMainContainer {
    background-color: rgb(243, 247, 248);
  }

</style>
