<template>
    <div class="index">
        <el-table :data="_data" style="width:70%">
            <el-table-column label="名稱" prop="名稱"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            _data: []
        }
    },
    mounted() {
        this.$http.get('http://data.tainan.gov.tw/api/action/datastore_search?resource_id=7442fe75-c23b-4826-8416-5982fbdcf912&q=zh-tw')
            .then(response => {
                this._data = response.data.result.records;
                console.log(this._data);
            }, response => {
                console.error("error");
            });
    }
}
</script>
