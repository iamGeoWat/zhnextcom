<template>
  <div class="mynav">
    <el-aside
      style="background-color: rgb(32,44,54);overflow: hidden;border:0;max-width: 200px;"
      width="auto"
      @mouseenter.native="collapseOpen">
      <!--@mouseleave.native="collapseClose"-->
      <el-menu
        class="el-menu-vertical-demo el-menu--collapse-my"
        background-color="rgb(32,44,54)"
        text-color="#fff"
        active-text-color="#fff"
        router
        :collapse="isCollapse"
        @select="handleSelect">
        <div class="menu-item-header">
          <img src="../../../assets/platform/chart-图表.png" height="23">
          <p>{{$t('platform.navMenu.title1')}}</p>
        </div>
        <el-menu-item index="/platform/1">
          <i class="icon-nav"><img src="../../../assets/platform/AK-MN折线图_fill.png" height="20"/></i>
          <span slot="title">{{$t('platform.navMenu.menuItem1_1')}}</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="icon-nav"><img src="../../../assets/platform/docket-单据查询-1.png" height="20"/></i>
            <span slot="title">{{$t('platform.navMenu.menuItem1_2')}}</span>
          </template>
          <el-menu-item index="2" @click="collapseClose">查询1</el-menu-item>
          <el-menu-item index="2" @click="collapseClose">查询2</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="icon-nav"><img src="../../../assets/platform/切换.png" height="20"/></i>
            <span slot="title">{{$t('platform.navMenu.menuItem1_3')}}</span>
          </template>
          <el-menu-item index="3" @click="collapseClose">收益1</el-menu-item>
          <el-menu-item index="3" @click="collapseClose">收益2</el-menu-item>
        </el-submenu>
        <div class="menu-item-header">
          <img src="../../../assets/platform/应用.png" height="23">
          <p>{{$t('platform.navMenu.title2')}}</p>
        </div>
        <el-submenu index="6">
          <template slot="title">
            <i class="icon-nav"><img src="../../../assets/platform/钱包.png" height="20"/></i>
            <span slot="title">{{$t('platform.navMenu.menuItem2_1')}}</span>
          </template>
          <el-menu-item index="4">钱包1</el-menu-item>
          <el-menu-item index="4">钱包2</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="icon-nav"><img src="../../../assets/platform/小程序.png" height="20"/></i>
            <span slot="title">{{$t('platform.navMenu.menuItem2_2')}}</span>
          </template>
          <el-menu-item index="5">应用1</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>
<style lang="less">
  .mynav {
    // overflow: hidden;
    background-color: rgb(32, 44, 54);
    border: 0;
    max-width: 200px;
    .el-menu--collapse {
      width: 65px;
      border: 0;
    }
    .is-active {
      background-color: rgb(3, 130, 202) !important;
    }

    .el-menu-item:hover, .el-submenu__title:hover {
      background-color: rgb(3, 130, 202) !important;
    }
  }

</style>
<style scoped lang="less">
  .mynav {
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    .icon-nav {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: top;
    }
    .menu-item-header{
      width: 100%;
      height:60px;
      padding-right: 1px;
      background: rgb(32,44,54);
      img{
        margin-left: 15px;
      }
      p{
        margin-left: 10px;
        display: inline-block;
        line-height: 60px;
        color: #fff;
        font-weight: bold;
      }
    }
  }
</style>
<script>
  // import {sessionToken} from "../../utils/auth";

  export default {
    name: "SubNav",
    data() {
      return {
        collapseBtnClick: false,
        isCollapse: false,
        show: true,
        hide: false,
      }
    },
    methods: {
      collapseOpen() {
        if (this.collapseBtnClick) return;
        this.isCollapse = false;
      },
      collapseClose() {
        if (this.collapseBtnClick) return;
        this.isCollapse = true;
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        sessionStorage.setItem("key", key);
        this.index = sessionStorage.getItem("key");
      }
    }

  }
</script>
