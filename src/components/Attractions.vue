<template>
  <div>
    <v-list>
      <v-list-tile avatar v-for="(item, i) in tableData" :key="i">
        <v-list-tile-avatar>
          <v-btn icon ripple>
            <v-icon color="success" @click="addToWishlist(item)">fa-plus</v-icon>
          </v-btn>
        </v-list-tile-avatar>
        <v-list-tile-content @click="openDialog(item)">
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon color="gray">fa-chevron-right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-dialog
      v-model="dialog"
      scrollable
      fullscreen
      hide-overlay
      transition="slide-x-reverse-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>fa-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ dialogData.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="success" icon depressed>
              <v-icon @click="addToWishlist(dialogData)">fa-plus</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="height: calc(100% - 56px - 56px)">
          <h3>
            <v-icon>fa-info-circle</v-icon> 介紹
          </h3>
          <p v-html="dialogData.introduction"></p>
          <p>
            <v-chip v-for="(c, ci) in dialogData.category" :key="ci" type="orange">{{ c }}</v-chip>
          </p>
          <h3>
            <v-icon>far fa-clock</v-icon> 開放時間
          </h3>
          <p>{{ dialogData.open_time }}</p>
          <h3>
            <v-icon>fa-map-marker-alt</v-icon> 地址
          </h3>
          <p>{{ dialogData.address }}</p>
          <h3>
            <v-icon>fa-phone-alt</v-icon> 電話
          </h3>
          <p>{{ dialogData.tel }}</p>
          <h3 v-if="typeof dialogData.services != 'undefined'">
            <v-icon>far fa-star</v-icon> 服務
          </h3>
          <p v-if="typeof dialogData.services != 'undefined'">
            <v-chip v-for="(s, si) in dialogData.services" :key="si">{{ s }}</v-chip>
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import attraction from '../assets/attraction_zh-tw.json';

export default {
  name: 'attractions',
  props: ['val'],
  data() {
    return {
      tableData: [],
      dialogData: '',
      loading: true,
      dialog: false,
      search: '',
    };
  },
  methods: {
    openDialog(item) {
      this.dialog = true;
      this.dialogData = item;
    },
    addToWishlist(row) {
      let ans = [];
      let wishlist = localStorage.getItem('wishlist');
      if (wishlist !== null) {
        wishlist = JSON.parse(wishlist);
        if (wishlist.length !== 0) {
          ans = wishlist;
          ans.push({ index: wishlist.length, location: row });
        } else {
          ans.push({ index: 0, location: row });
        }
      } else {
        ans.push({ index: 0, location: row });
      }
      this.$emit('wishlistValChanged', ans.length);
      localStorage.setItem('wishlist', JSON.stringify(ans));
    },
  },
  mounted() {
    // https://data.tainan.gov.tw/dataset/landmark2

    // let path = 'https://www.twtainan.net/data/attractions_zh-tw.json'
    // let path = '../assets/attraction_zh-tw.json'
    // this.$http.get(path)
    //     .then(response => {
    //         console.log(response.data)
    //         this.tableData = response.data;
    //         this.loading = false;
    //     }, response => {
    //         this.loading = false;
    //         this.$notify({
    //             title: 'Oops...',
    //             message: '取得景點資訊發生錯誤',
    //             type: 'warning'
    //         });
    //     });
    this.tableData = attraction;
    this.loading = false;
  },
};
</script>

<style>
.v-dialog__content--active {
  z-index: 3 !important;
}
</style>
