<template>
    <div class="attractions">
        <el-table v-loading.body="loading" :data="tableData" style="width: 100%" :default-sort="{prop: '名稱', order: 'descending'}">
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
            <el-table-column label="門票資訊" prop="門票資訊">
                <template scope="scope">
                    <el-button size="small" type="info" icon="plus" @click="adddToWishlist(scope.$index, scope.row)">加入願望清單</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'attractions',
    data() {
        return {
            tableData: [],
            loading: true
        }
    },
    methods: {
        adddToWishlist(index, row) {
            console.log(index, row);
        }
    },
    mounted() {
        this.$http.get('http://data.tainan.gov.tw/api/action/datastore_search?resource_id=7442fe75-c23b-4826-8416-5982fbdcf912&q=zh-tw&limit=700')
            .then(response => {
                this.tableData = response.data.result.records;
                this.loading = false;
                console.log(this.tableData);
            }, response => {
                console.error("get tainan data error!!!");
            });
    }
}
</script>
