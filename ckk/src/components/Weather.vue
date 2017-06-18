<template>
    <div class="weather">
        <h1>This is Weather.vue</h1>
        <el-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
            显示整页加载，3 秒后消失
        </el-button>
    </div>
</template>

<script>
import '../assets/xml2json.js'
export default {
    name: 'weather',
    data() {
        return {
            fullscreenLoading: false
        }
    },
    methods: {
        openFullScreen() {
            this.fullscreenLoading = true;
            this.$http.jsonp('http://opendata.cwb.gov.tw/opendataapi?dataid=F-D0047-079&authorizationkey=CWB-2F10DEF1-D5AF-4559-8C93-44E6EE94BBD6&callback=?')
                .then(response => {
                    console.log(xml2json(response, ""));
                    this.fullscreenLoading = false;
                }, response => {
                    this.$notify({
                        title: 'Oops...',
                        message: '取得氣象資訊發生錯誤',
                        type: 'warning'
                    });
                });
        }
    },
    mounted() {

    }
}
</script>