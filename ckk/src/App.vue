<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="router">
      <el-menu-item index="" id="logo">臺南好好玩</el-menu-item>
      <el-menu-item index="attractions">景點</el-menu-item>
      <el-menu-item index="weather">氣象資訊</el-menu-item>
      <el-menu-item index="wishlist">
        願望清單
        <el-badge :value="wishlistBadgeVal" :hidden="isWishlisthidden"></el-badge>
      </el-menu-item>
    </el-menu>
    <router-view :val="wishlistBadgeVal" @wishlistValChanged="wishlistBadgeVal = $event"></router-view>
    <!--<div class="page-component-up"><i class="el-icon-caret-top"></i></div>-->
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      activeIndex: 'attractions',
      router: true,
      wishlistBadgeVal: 0
    };
  },
  computed: {
    isWishlisthidden() {
      return !(this.wishlistBadgeVal > 0);
    }
  },
  mounted() {
    var wl = localStorage.getItem("wishlist");
    this.wishlistBadgeVal = (wl == null) ? 0 : JSON.parse(wl).length;
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
}

#logo {
  font-size: 24px;
  color: #13CE66;
}

.el-badge {
  top: -10px
}

.page-component-up {
  background-color: #58b7ff;
  position: fixed;
  right: 100px;
  bottom: 150px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  opacity: .4;
  transition: .3s;
}

.page-component-up:hover {
  opacity: 1;
}

.page-component-up i {
  color: #fff;
  display: block;
  line-height: 50px;
  text-align: center;
  font-size: 22px;
}
</style>
