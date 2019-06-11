<template>
  <!-- <div class="wishlist container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="9" :lg="9">
                <el-row>
                    <el-col :span="24">
                        <el-input placeholder="請輸入出發地點..." v-model="map.origin"></el-input>
                    </el-col>
                    <el-col :span="24">
                        <el-table :data="tableData" style="width: 100%" empty-text="請前往「景點」頁面新增願望清單">
                            <el-table-column type="index"></el-table-column>
                            <el-table-column label="名稱" prop="location.name"></el-table-column>
                            <el-table-column label="順序">
                                <template scope="scope">
                                    <el-button size="mini" type="primary" icon="el-icon-arrow-up" @click="upWishlist(scope.$index)"></el-button>
                                    <el-button size="mini" type="primary" icon="el-icon-arrow-down" @click="downWishlist(scope.$index)"></el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="移除">
                                <template scope="scope">
                                    <el-button size="small" type="danger" icon="el-icon-minus" @click="deleteFromWishlist(scope.$index)">從願望清單移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24">
                        <el-button id="proc" type="success" @click="showMap()" icon="el-icon-position" :disabled="val==0">安排行程</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xs=" 24 " :sm="24 " :md="15 " :lg="15 ">
            </el-col>
        </el-row>
  </div>-->
  <div>
    <v-text-field label="出發地點" v-model="map.origin" outline></v-text-field>
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
          <v-btn-toggle mandatory>
            <v-btn depressed color="primary" @click="downWishlist(loc.index)" small>
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-btn depressed color="primary" @click="upWishlist(loc.index)" small>
              <v-icon>arrow_drop_up</v-icon>
            </v-btn>
            <v-btn depressed color="error" @click="deleteFromWishlist(loc.index)" small>
              <v-icon>cancel</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-btn color="success" @click="showMap()" :disabled="val==0"><v-icon>near_me</v-icon>安排行程</v-btn>
    <iframe
      width="100% "
      height="600"
      frameborder="0 "
      style="border:0 "
      :src="mapSrc "
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import { GOOGLE_API_KEY } from "../apiKey.json";

export default {
  name: "wishlist",
  props: ["val"],
  data() {
    return {
      map: {
        mapView: `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_API_KEY}&center=23.58,120.59&zoom=7&maptype=satellite`,
        mapEndPoint: `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_API_KEY}`,
        origin: "",
        mapOrigin: "&origin=",
        mapWaypoints: "&waypoints=",
        mapDestination: "&destination=",
        show: false
      },
      tableData: []
    };
  },
  computed: {
    mapSrc() {
      var mapSrc = "";
      if (this.map.show == true) {
        mapSrc =
          this.map.mapEndPoint +
          this.map.mapOrigin +
          this.map.mapDestination +
          this.map.mapWaypoints;
      } else {
        mapSrc = this.map.mapView;
      }
      return mapSrc;
    }
  },
  methods: {
    showMap() {
      this.map.mapOrigin += "臺南+" + this.map.origin;
      this.tableData.forEach(function(element, index, array) {
        if (index !== this.tableData.length - 1) {
          this.map.mapWaypoints += "臺南+" + element.location.name + "|";
        }
      }, this);
      this.map.mapWaypoints = this.map.mapWaypoints.slice(0, -1);
      this.map.mapDestination +=
        "臺南+" + this.tableData[this.tableData.length - 1].location.name;
      this.map.show = true;
    },
    upWishlist(_index) {
      if (_index > 0) {
        console.log("upWishlist");
        this.tableData[_index].index--;
        this.tableData[_index - 1].index++;
        this.tableData.sort(function compareNumbers(a, b) {
          return a.index - b.index;
        });
        localStorage.setItem("wishlist", JSON.stringify(this.tableData));
      }
    },
    downWishlist(_index) {
      if (_index < this.tableData.length - 1) {
        console.log("downWishlist");
        this.tableData[_index].index++;
        this.tableData[_index + 1].index--;
        this.tableData.sort(function compareNumbers(a, b) {
          return a.index - b.index;
        });
        localStorage.setItem("wishlist", JSON.stringify(this.tableData));
      }
    },
    deleteFromWishlist(_index) {
      console.log("deleteFromWishlist");
      this.tableData.splice(_index, 1);
      this.tableData.forEach(function(element, index, array) {
        element.index = index;
      }, this);
      this.$emit("wishlistValChanged", this.tableData.length);
      localStorage.setItem("wishlist", JSON.stringify(this.tableData));
    }
  },
  mounted() {
    var wishlist = localStorage.getItem("wishlist");
    if (wishlist !== null) {
      this.tableData = JSON.parse(wishlist);
    }
  }
};
</script>
