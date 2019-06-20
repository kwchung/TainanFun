<template>
  <v-app id="inspire">
    <v-toolbar color="#2c3e50" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title color="#58b7ff">臺南好好玩</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>far fa-map</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>景點</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>stars</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>願望清單</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view
          :val="wishlistBadgeVal"
          @wishlistValChanged="wishlistBadgeVal = $event">
        </router-view>
      </v-container>
    </v-content>
    <v-card height="56px" flat>
      <v-bottom-nav :active.sync="bottomNav" :value="true" fixed>
        <v-btn color="teal" flat value="attractions" to="attractions">
          <span>景點</span>
          <v-icon>far fa-map</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="weather" to="weather">
          <span>氣象資訊</span>
          <v-icon>far fa-sun</v-icon>
        </v-btn>

        <v-btn color="teal" flat value="wishlist" to="wishlist">
          <span>願望清單</span>
          <v-icon>far fa-heart</v-icon>
          <v-badge
            v-if="wishlistBadgeVal > 0"
            color="red"
            style="position:absolute; right:30%; top:15%;">
            <template v-slot:badge>
              <span>{{ wishlistBadgeVal }}</span>
            </template>
          </v-badge>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    wishlistBadgeVal: 0,
    bottomNav: 'attractions',
  }),
  props: {
    source: String,
  },
  computed: {
    isWishlisthidden() {
      return !(this.wishlistBadgeVal > 0);
    },
  },
  mounted() {
    const wl = localStorage.getItem('wishlist');
    this.wishlistBadgeVal = wl == null ? 0 : JSON.parse(wl).length;
  },
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#logo {
  font-size: 24px;
  color: #13ce66 !important;
}
</style>
