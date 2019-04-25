<template>
    <div class="attractions">
        <el-table v-loading.body="loading" :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <h3>
                        <icon name="flag"></icon> 介紹
                    </h3>
                    <p v-html="props.row.introduction"></p>
                    <h3>
                        <icon name="map-marker"></icon> 地址
                    </h3>
                    <p>{{ props.row.address }}</p>
                    <h3>
                        <icon name="phone"></icon> 電話
                    </h3>
                    <p>{{ props.row.tel }}</p>
                </template>
            </el-table-column>
            <el-table-column label="名稱" prop="name"></el-table-column>
            <el-table-column label="開放時間" prop="open_time"></el-table-column>
            <el-table-column>
                <template scope="scope">
                    <el-button size="small" type="info" icon="plus" @click="addToWishlist(scope.$index, scope.row)">加入願望清單</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'attractions',
    props: ['val'],
    data() {
        return {
            tableData: [],
            loading: true
        }
    },
    methods: {
        addToWishlist(index, row) {
            var ans = [];
            var wishlist = localStorage.getItem("wishlist");
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
            localStorage.setItem("wishlist", JSON.stringify(ans));
        }
    },
    mounted() {
        // https://data.tainan.gov.tw/dataset/landmark2

        // let path = 'https://www.twtainan.net/data/attractions_zh-tw.json'
        let path = '/static/attraction_zh-tw.json'
        this.$http.get(path)
            .then(response => {
                console.log(response.data)
                this.tableData = response.data;
                this.loading = false;
            }, response => {
                this.loading = false;
                this.$notify({
                    title: 'Oops...',
                    message: '取得景點資訊發生錯誤',
                    type: 'warning'
                });
            });
    }
}
</script>
