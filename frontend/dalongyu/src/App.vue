<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import './common/font/font.css'
  export default {
    name: 'App'
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    border: 0;
  }
  html,body{
    width: 100%;
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
