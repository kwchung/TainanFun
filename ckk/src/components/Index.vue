<template>
    <div class="index">
        <el-table :data="tableData" style="width: 70%">
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
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        this.$http.get('http://data.tainan.gov.tw/api/action/datastore_search?resource_id=7442fe75-c23b-4826-8416-5982fbdcf912&q=zh-tw')
            .then(response => {
                this.tableData = response.data.result.records;
            }, response => {
                console.error("get tainan data error!!!");
            });
    }
}
</script>
