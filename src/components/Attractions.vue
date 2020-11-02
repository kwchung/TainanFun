<template>
  <div>
    <v-text-field
      label="搜尋景點"
      v-model="search"
      outline
    ></v-text-field>
    <v-card>
      <v-list>
        <v-list-tile v-if="tableData.length <= 0">
          查無景點
        </v-list-tile>
        <v-list-tile v-else avatar v-for="(item, i) in tableData" :key="i">
          <v-list-tile-avatar>
            <v-btn icon ripple>
              <v-icon color="success" @click="addToWishlist(item)">fas fa-plus</v-icon>
            </v-btn>
          </v-list-tile-avatar>
          <v-list-tile-content @click="openDialog(item)">
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="gray">fas fa-angle-right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
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
            <v-icon>fas fa-angle-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ dialogData.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="success" icon depressed>
              <v-icon @click="addToWishlist(dialogData)">fas fa-plus</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="height: calc(100% - 56px - 56px)">
          <h3>
            <v-icon>fas fa-info-circle</v-icon> 介紹
          </h3>
          <p v-html="dialogData.introduction"></p>
          <p>
            <v-chip v-for="(c, ci) in dialogData.category" :key="ci" type="orange">{{ c }}</v-chip>
          </p>
          <h3>
            <v-icon>fas fa-clock</v-icon> 開放時間
          </h3>
          <p>{{ dialogData.open_time }}</p>
          <h3>
            <v-icon>fas fa-map-marker-alt</v-icon> 地址
          </h3>
          <p>{{ dialogData.address }}</p>
          <h3>
            <v-icon>fas fa-phone-alt</v-icon> 電話
          </h3>
          <p>{{ dialogData.tel }}</p>
          <h3 v-if="typeof dialogData.services != 'undefined'">
            <v-icon>fas fa-star</v-icon> 服務
          </h3>
          <p v-if="typeof dialogData.services != 'undefined'">
            <v-chip v-for="(s, si) in dialogData.services" :key="si">{{ s }}</v-chip>
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      取得景點資訊發生錯誤
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import attraction from '../assets/attraction_zh-tw.json';

export default {
  name: 'attractions',
  props: ['val'],
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      attraction,
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
  computed: {
    tableData(){
      if (this.search){
        return this.attraction.filter(a => a.name.includes(this.search));
      }
      else{
        return this.attraction;
      }
    }
  },
  mounted() {
    // let url = 'https://www.twtainan.net/data/attractions_zh-tw.json';
    // let url = '../assets/attraction_zh-tw.json';
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': '*',
    //   },
    //   crossdomain: true,
    // };
    // this.$http.get(url, config)
    //     .then(response => {
    //         console.log(response.data)
    //         this.attraction = response.data;
    //         this.loading = false;
    //     }, response => {
    //         this.loading = false;
    //         this.snackbar = true;
    //     });
    this.loading = false;
  },
};
</script>

<style>
.v-dialog__content--active {
  z-index: 3 !important;
}
</style>
