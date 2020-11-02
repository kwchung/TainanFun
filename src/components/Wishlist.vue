<template>
  <div>
    <v-text-field label="出發地點" v-model="map.origin" outline></v-text-field>
    <div class="d-flex">
      <div class="flex-md-row flex-sm-column">
        <v-list>
          <v-list-tile>
            <v-list-tile-action>#</v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>名稱</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(loc, i) in tableData" :key="i">
            <v-list-tile-action>{{ i }}</v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="loc.location.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn-toggle>
                <v-btn small color="primary" @click="downWishlist(loc.index)">
                  <v-icon>fas fa-caret-down</v-icon>
                </v-btn>
                <v-btn small color="primary" @click="upWishlist(loc.index)">
                  <v-icon>fas fa-caret-up</v-icon>
                </v-btn>
                <v-btn small color="error" @click="deleteFromWishlist(loc.index)">
                  <v-icon>fas fa-trash-alt</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-btn color="success" @click="showMap()" :disabled="val==0 || map.origin==''">
          <v-icon>fas fa-location-arrow</v-icon> 安排行程
        </v-btn>
      </div>
      <div class="flex-md-row flex-sm-column">
        <iframe
          width="100% "
          height="600"
          frameborder="0 "
          style="border:0 "
          :src="mapSrc "
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wishlist',
  props: ['val'],
  data() {
    return {
      map: {
        mapView: `https://www.google.com/maps/embed/v1/view?key=AIzaSyCZ65P2lF5K1hX0jbN3R-O6HFvMkr-R5Pc&center=23.58,120.59&zoom=7&maptype=satellite`,
        mapEndPoint: `https://www.google.com/maps/embed/v1/directions?key=AIzaSyCZ65P2lF5K1hX0jbN3R-O6HFvMkr-R5Pc`,
        origin: '',
        mapOrigin: '&origin=',
        mapWaypoints: '&waypoints=',
        mapDestination: '&destination=',
        show: false,
      },
      tableData: [],
    };
  },
  computed: {
    mapSrc() {
      let mapSrc = '';
      if (this.map.show === true) {
        mapSrc = this.map.mapEndPoint
          + this.map.mapOrigin
          + this.map.mapDestination
          + this.map.mapWaypoints;
      } else {
        mapSrc = this.map.mapView;
      }
      return mapSrc;
    },
  },
  methods: {
    showMap() {
      // this.map.mapOrigin
      this.map.mapOrigin = `&origin=${this.map.origin}`;
      console.log(this.map.mapOrigin);

      // this.map.mapWaypoints
      this.map.mapWaypoints = '&waypoints=';
      this.tableData.forEach(function (element, index, array) {
        if (index !== this.tableData.length - 1) {
          this.map.mapWaypoints += `${element.location.name}|`;
        }
      }, this);
      console.log(this.map.mapWaypoints);
      this.map.mapWaypoints = this.map.mapWaypoints.slice(0, -1);

      // this.map.mapDestination
      this.map.mapDestination = '&destination=';
      this.map.mapDestination
        += `臺南+${this.tableData[this.tableData.length - 1].location.name}`;
      console.log(this.map.mapDestination);

      this.map.show = true;
    },
    upWishlist(_index) {
      if (_index > 0) {
        console.log('upWishlist');
        this.tableData[_index].index--;
        this.tableData[_index - 1].index++;
        this.tableData.sort((a, b) => a.index - b.index);
        localStorage.setItem('wishlist', JSON.stringify(this.tableData));
      }
    },
    downWishlist(_index) {
      if (_index < this.tableData.length - 1) {
        console.log('downWishlist');
        this.tableData[_index].index++;
        this.tableData[_index + 1].index--;
        this.tableData.sort((a, b) => a.index - b.index);
        localStorage.setItem('wishlist', JSON.stringify(this.tableData));
      }
    },
    deleteFromWishlist(_index) {
      console.log('deleteFromWishlist');
      this.tableData.splice(_index, 1);
      this.tableData.forEach((element, index, array) => {
        element.index = index;
      }, this);
      this.$emit('wishlistValChanged', this.tableData.length);
      localStorage.setItem('wishlist', JSON.stringify(this.tableData));
    },
  },
  mounted() {
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist !== null) {
      this.tableData = JSON.parse(wishlist);
    }
  },
};
</script>
