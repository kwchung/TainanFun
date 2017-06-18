<template>
    <div class="wishlist">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="9" :lg="9">
                <el-row>
                    <el-col :span="24">
                        <el-input placeholder="請輸入出發地點..." v-model="map.origin"></el-input>
                    </el-col>
                    <el-col :span="24">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column type="index"></el-table-column>
                            <el-table-column label="名稱" prop="location.名稱"></el-table-column>
                            <el-table-column label="順序">
                                <template scope="scope">
                                    <el-button size="small" type="info" icon="caret-top" @click="upWishlist(scope.$index)"></el-button>
                                    <el-button size="small" type="info" icon="caret-bottom" @click="downWishlist(scope.$index)"></el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="移除">
                                <template scope="scope">
                                    <el-button size="small" type="danger" icon="minus" @click="deleteFromWishlist(scope.$index)">從願望清單移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24">
                        <el-button id="proc" type="success" @click="showMap()" :disabled="val==0">安排行程</el-button>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :xs=" 24 " :sm="24 " :md="15 " :lg="15 ">
                <iframe width="100% " height="600 " frameborder="0 " style="border:0 " :src="mapSrc " allowfullscreen>
                </iframe>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'wishlist',
    props: ['val'],
    data() {
        return {
            map: {
                mapView: 'https://www.google.com/maps/embed/v1/view?key=AIzaSyCbcuNUFkOg_YFyz7lYf1y8Y7692XLLWKo&center=23.58,120.59&zoom=7&maptype=satellite',
                mapEndPoint: 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyCbcuNUFkOg_YFyz7lYf1y8Y7692XLLWKo',
                origin: '',
                mapOrigin: '&origin=',
                mapWaypoints: '&waypoints=',
                mapDestination: '&destination=',
                show: false
            },
            tableData: [],
        }
    },
    computed: {
        mapSrc() {
            var mapSrc = "";
            if (this.map.show == true) {
                mapSrc = this.map.mapEndPoint + this.map.mapOrigin + this.map.mapDestination + this.map.mapWaypoints;
            } else {
                mapSrc = this.map.mapView
            }
            return mapSrc;
        }
    },
    methods: {
        showMap() {
            this.map.mapOrigin += "臺南+" + this.map.origin;
            this.tableData.forEach(function (element, index, array) {
                if (index !== this.tableData.length - 1) {
                    this.map.mapWaypoints += "臺南+" + element.location.名稱 + '|';
                }
            }, this);
            this.map.mapWaypoints = this.map.mapWaypoints.slice(0, -1);
            this.map.mapDestination += "臺南+" + this.tableData[this.tableData.length - 1].location.名稱;
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
            this.tableData.forEach(function (element, index, array) {
                element.index = index
            }, this);
            this.$emit('wishlistValChanged', this.tableData.length);
            localStorage.setItem("wishlist", JSON.stringify(this.tableData));
        }
    },
    mounted() {
        var wishlist = localStorage.getItem("wishlist");
        if (wishlist !== null) {
            this.tableData = JSON.parse(wishlist);
        }
    }
}
</script>

<style>
.wishlist {
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
}

#proc {
    float: right;
}

.el-table,
.el-input {
    margin-bottom: 10px;
}
</style>
