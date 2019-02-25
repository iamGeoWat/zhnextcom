<template>
  <div style="width: 100%;height: 100%;">
    <el-container style="width: 100%;height: 100%;">
      <el-main class="platformMainContainer">
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: "Platform",
    mounted(){
      this.$router.push({ path: '/platform/1' });
    },
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

  .el-main{
    padding: 0;
  }

  .platformMainContainer {
    background-color: rgb(243, 247, 248) !important;
  }

</style>
