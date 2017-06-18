<template>
    <div class="weather">
        <h1>This is Weather.vue</h1>
    </div>
</template>

<script>
export default {
    name: 'weather',
    mounted() {
        this.$http.get('http://opendata.cwb.gov.tw/opendataapi?dataid=F-D0047-079&authorizationkey=CWB-2F10DEF1-D5AF-4559-8C93-44E6EE94BBD6')
            .then(response => {
                console.log(response);
            }, response => {
                this.$notify({
                    title: 'Oops...',
                    message: '取得氣象資訊發生錯誤',
                    type: 'warning'
                });
            });
    }
}
</script>
