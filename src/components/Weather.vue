<template>
  <div>
    <h1>未來六天氣象預報</h1>
    <div class="d-flex">
      <v-card v-for="w in dailyWeather" :key="w.dt" class="ma-1">
        <v-card-title class="headline">{{ w.dt * 1000 | moment("MM月DD日") }}</v-card-title>
        <v-card-text>
          <div class="d-flex">
            <v-avatar size="70">
              <v-img :src="`http://openweathermap.org/img/w/${w.weather[0].icon}.png`"></v-img>
            </v-avatar>
            <v-card-text class="display-1 text--primary">
              {{ w.temp.day.toFixed(1) }}<sup><small>℃</small></sup>
            </v-card-text>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary lighten-1"
            text
            @click="getWeatherDetail(w)"
          >
            詳細資訊
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <line-chart :chart-data="chartData" v-show="showDetail"></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart.js'
const moment = require('moment');

export default {
  name: 'weather',
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            data: []
          },
        ],
      },
      dailyWeather: [
        // {
        //   dt: 1497931200,
        //   temp: {
        //     day: 27.67,
        //     min: 27.67,
        //     max: 28.14,
        //     night: 28.14,
        //     eve: 27.67,
        //     morn: 27.67,
        //   },
        //   pressure: 1021.39,
        //   humidity: 89,
        //   weather: [
        //     {
        //       id: 804,
        //       main: 'Clouds',
        //       description: '陰，多雲',
        //       icon: '04d',
        //     },
        //   ],
        //   speed: 4.67,
        //   deg: 222,
        //   clouds: 92,
        // },
        // {
        //   dt: 1498276800,
        //   temp: {
        //     day: 28.22,
        //     min: 26.63,
        //     max: 28.22,
        //     night: 26.86,
        //     eve: 26.63,
        //     morn: 27.18,
        //   },
        //   pressure: 1005.66,
        //   humidity: 0,
        //   weather: [
        //     {
        //       id: 502,
        //       main: 'Rain',
        //       description: '大雨',
        //       icon: '10d',
        //     },
        //   ],
        //   speed: 3.37,
        //   deg: 236,
        //   clouds: 38,
        //   rain: 17.16,
        // },
      ],
      hrWeather: [
        // {
        //   dt: 1498089600,
        //   main: {
        //     temp: 29.27,
        //     temp_min: 29.27,
        //     temp_max: 29.27,
        //     pressure: 1025.18,
        //     sea_level: 1023.55,
        //     grnd_level: 1025.18,
        //     humidity: 94,
        //     temp_kf: 0,
        //   },
        //   weather: [
        //     {
        //       id: 804,
        //       main: 'Clouds',
        //       description: '陰，多雲',
        //       icon: '04d',
        //     },
        //   ],
        //   clouds: {
        //     all: 88,
        //   },
        //   wind: {
        //     speed: 4.31,
        //     deg: 174.501,
        //   },
        //   rain: {},
        //   sys: {
        //     pod: 'd',
        //   },
        //   dt_txt: '2017-06-22 00:00:00',
        // },
        // {
        //   dt: 1498100400,
        //   main: {
        //     temp: 28.73,
        //     temp_min: 28.73,
        //     temp_max: 28.73,
        //     pressure: 1025.53,
        //     sea_level: 1023.87,
        //     grnd_level: 1025.53,
        //     humidity: 99,
        //     temp_kf: 0,
        //   },
        //   weather: [
        //     {
        //       id: 500,
        //       main: 'Rain',
        //       description: '小雨',
        //       icon: '10d',
        //     },
        //   ],
        //   clouds: {
        //     all: 20,
        //   },
        //   wind: {
        //     speed: 4.31,
        //     deg: 177.002,
        //   },
        //   rain: {
        //     '3h': 1.93,
        //   },
        //   sys: {
        //     pod: 'd',
        //   },
        //   dt_txt: '2017-06-22 03:00:00',
        // },
        // {
        //   dt: 1498111200,
        //   main: {
        //     temp: 29.52,
        //     temp_min: 29.52,
        //     temp_max: 29.52,
        //     pressure: 1024.54,
        //     sea_level: 1022.89,
        //     grnd_level: 1024.54,
        //     humidity: 94,
        //     temp_kf: 0,
        //   },
        //   weather: [
        //     {
        //       id: 500,
        //       main: 'Rain',
        //       description: '小雨',
        //       icon: '10d',
        //     },
        //   ],
        //   clouds: {
        //     all: 20,
        //   },
        //   wind: {
        //     speed: 3.66,
        //     deg: 198.003,
        //   },
        //   rain: {
        //     '3h': 0.0050000000000008,
        //   },
        //   sys: {
        //     pod: 'd',
        //   },
        //   dt_txt: '2017-06-22 06:00:00',
        // },
        // {
        //   dt: 1498122000,
        //   main: {
        //     temp: 29.79,
        //     temp_min: 29.79,
        //     temp_max: 29.79,
        //     pressure: 1023.78,
        //     sea_level: 1022.19,
        //     grnd_level: 1023.78,
        //     humidity: 90,
        //     temp_kf: 0,
        //   },
        //   weather: [
        //     {
        //       id: 801,
        //       main: 'Clouds',
        //       description: '晴，少雲',
        //       icon: '02d',
        //     },
        //   ],
        //   clouds: {
        //     all: 20,
        //   },
        //   wind: {
        //     speed: 3.81,
        //     deg: 206.003,
        //   },
        //   rain: {},
        //   sys: {
        //     pod: 'd',
        //   },
        //   dt_txt: '2017-06-22 09:00:00',
        // },
        // {
        //   dt: 1498132800,
        //   main: {
        //     temp: 29.17,
        //     temp_min: 29.17,
        //     temp_max: 29.17,
        //     pressure: 1024.86,
        //     sea_level: 1023.25,
        //     grnd_level: 1024.86,
        //     humidity: 93,
        //     temp_kf: 0,
        //   },
        //   weather: [
        //     {
        //       id: 801,
        //       main: 'Clouds',
        //       description: '晴，少雲',
        //       icon: '02n',
        //     },
        //   ],
        //   clouds: {
        //     all: 24,
        //   },
        //   wind: {
        //     speed: 3.13,
        //     deg: 199,
        //   },
        //   rain: {},
        //   sys: {
        //     pod: 'n',
        //   },
        //   dt_txt: '2017-06-22 12:00:00',
        // },
        // {
        //   dt: 1498143600,
        //   main: {
        //     temp: 29.18,
        //     temp_min: 29.18,
        //     temp_max: 29.18,
        //     pressure: 1025.76,
        //     sea_level: 1024.12,
        //     grnd_level: 1025.76,
        //     humidity: 93,
        //     temp_kf: 0,
        //   },
        //   weather: [
        //     {
        //       id: 804,
        //       main: 'Clouds',
        //       description: '陰，多雲',
        //       icon: '04n',
        //     },
        //   ],
        //   clouds: {
        //     all: 88,
        //   },
        //   wind: {
        //     speed: 3.77,
        //     deg: 194.5,
        //   },
        //   rain: {},
        //   sys: {
        //     pod: 'n',
        //   },
        //   dt_txt: '2017-06-22 15:00:00',
        // },
        // {
        //   dt: 1498154400,
        //   main: {
        //     temp: 27.11,
        //     temp_min: 27.11,
        //     temp_max: 27.11,
        //     pressure: 1024.64,
        //     sea_level: 1023.02,
        //     grnd_level: 1024.64,
        //     humidity: 100,
        //     temp_kf: 0,
        //   },
        //   weather: [
        //     {
        //       id: 501,
        //       main: 'Rain',
        //       description: '中雨',
        //       icon: '10n',
        //     },
        //   ],
        //   clouds: {
        //     all: 92,
        //   },
        //   wind: {
        //     speed: 3.56,
        //     deg: 189.009,
        //   },
        //   rain: {
        //     '3h': 3.99,
        //   },
        //   sys: {
        //     pod: 'n',
        //   },
        //   dt_txt: '2017-06-22 18:00:00',
        // },
        // {
        //   dt: 1498165200,
        //   main: {
        //     temp: 26.51,
        //     temp_min: 26.51,
        //     temp_max: 26.51,
        //     pressure: 1024.57,
        //     sea_level: 1022.92,
        //     grnd_level: 1024.57,
        //     humidity: 100,
        //     temp_kf: 0,
        //   },
        //   weather: [
        //     {
        //       id: 501,
        //       main: 'Rain',
        //       description: '中雨',
        //       icon: '10n',
        //     },
        //   ],
        //   clouds: {
        //     all: 88,
        //   },
        //   wind: {
        //     speed: 2.76,
        //     deg: 132,
        //   },
        //   rain: {
        //     '3h': 5.45,
        //   },
        //   sys: {
        //     pod: 'n',
        //   },
        //   dt_txt: '2017-06-22 21:00:00',
        // },
      ],
      showDetail: false,
    };
  },
  methods: {
    getWeatherDetail(w) {
      const date = w.dt;
      const a = `${moment(date * 1000).format('YYYY-MM-DD')} 00:00:00`;
      const b1 = parseInt(moment(a).add(-1, 'seconds').format('X'));
      const b2 = parseInt(moment(a).add(1, 'days').format('X'));
      const labels = [];
      const datasets = [
        {
          label: `${moment(date * 1000).format('MM月DD日')}每3小時氣溫(℃)`,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          yAxisID: 'temp',
          data: [],
        },
        {
          label: `${moment(date * 1000).format('MM月DD日')}每3小時降雨量(mm)`,
          backgroundColor: 'rgba(12, 71, 161, 0.2)',
          yAxisID: 'rain',
          data: [],
        }
      ];
      this.hrWeather.forEach(function (element, index, array) {
        const aa = moment(element.dt * 1000).format('YYYY-MM-DD HH:mm:ss');
        const bb = moment(aa).format('X');
        if (bb > b1 && bb < b2) {
          console.log(element);
          labels.push(moment(element.dt * 1000).format('HH:mm'));
          datasets[0].data.push(element.main.temp);
          if (element.rain) {
            datasets[1].data.push(element.rain["3h"]);
          }
          else{
            datasets[1].data.push(0);
          }
        }
      }, this);

      // https://github.com/apertureless/vue-chartjs/issues/615#issuecomment-650195528
      this.chartData = {
        labels,
        datasets
      };
      this.showDetail = true;
    },
  },
  mounted() {
    this.fullscreenLoading = true;
    const mainurl = 'https://api.openweathermap.org/data/2.5/forecast';
    const cityid = '1668355'; // Tainan,TW
    const appid = process.env.VUE_APP_WEATHER_APPID;

    // 6Days / 1Day
    this.$http.get(`${mainurl}/daily?id=${cityid}&appid=${appid}&mode=json&units=metric&lang=zh_tw&cnt=6`)
      .then((response) => {
        this.dailyWeather = response.data.list;
      }, (response) => {
        this.$notify({
          title: 'Oops...',
          message: '取得氣象資訊發生錯誤',
          type: 'warning',
        });
      }, { dataType: 'json' });

    // 5Day / 3hr
    this.$http.get(`${mainurl}?id=${cityid}&appid=${appid}&mode=json&units=metric&lang=zh_tw`)
      .then((response) => {
        console.log('5d3H');
        console.log(response.data.list);
        this.hrWeather = response.data.list;
        this.fullscreenLoading = false;
      }, (response) => {
        this.$notify({
          title: 'Oops...',
          message: '取得氣象資訊發生錯誤',
          type: 'warning',
        });
        this.fullscreenLoading = false;
      }, { dataType: 'json' });
  },
};
</script>
