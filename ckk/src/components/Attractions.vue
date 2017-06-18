<template>
    <div class="attractions">
        <el-table v-loading.body="loading" :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template scope="props">
                    <h3>
                        <icon name="flag"></icon> 介紹
                    </h3>
                    <p v-html="props.row.介紹"></p>
                    <h3>
                        <icon name="car"></icon> 交通服務
                    </h3>
                    <p>{{ props.row.交通服務 }}</p>
                    <h3>
                        <icon name="map-marker"></icon> 地址
                    </h3>
                    <p>{{ props.row.地址 }}</p>
                    <h3>
                        <icon name="phone"></icon> 電話
                    </h3>
                    <p>{{ props.row.電話 }}</p>
                </template>
            </el-table-column>
            <el-table-column label="名稱" prop="名稱"></el-table-column>
            <el-table-column label="開放時間" prop="開放時間"></el-table-column>
            <el-table-column label="門票資訊" prop="門票資訊"></el-table-column>
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
        this.$http.get('http://data.tainan.gov.tw/api/action/datastore_search?resource_id=7442fe75-c23b-4826-8416-5982fbdcf912&q=zh-tw&limit=700')
            .then(response => {
                this.tableData = response.data.result.records;
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
