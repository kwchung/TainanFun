<template>
    <div class="weather container">
        <h1>未來六天氣象預報</h1>
        <el-row type="flex" justify="space-around">
            <el-col :span="4" v-for="w in dailyWeather" :key="w.dt">
                <el-card>
                    <p>{{ w.dt * 1000 | moment("MMMDD日") }}</p>
                    <img :src="'http://openweathermap.org/img/w/'+w.weather[0].icon+'.png'">
                    <h1>{{ w.temp.day.toFixed(1) }}
                        <small style="font-size:20px;">℃</small>
                    </h1>
                    <h2>{{ w.weather[0].description }}</h2>
                    <div>
                        <div class="bottom clearfix">
                            <el-button type="info" @click="getWeatherDetail(w)">詳細資訊</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <vue-chart v-show="showDetail" :columns="columns" :rows="rows" :options="options"></vue-chart>
        </el-row>
    </div>
</template>

<script>
var moment = require('moment');
export default {
    name: 'weather',
    data() {
        return {
            fullscreenLoading: false,
            dailyWeather: [
                {
                    "dt": 1497931200,
                    "temp": {
                        "day": 27.67,
                        "min": 27.67,
                        "max": 28.14,
                        "night": 28.14,
                        "eve": 27.67,
                        "morn": 27.67
                    },
                    "pressure": 1021.39,
                    "humidity": 89,
                    "weather": [
                        {
                            "id": 804,
                            "main": "Clouds",
                            "description": "陰，多雲",
                            "icon": "04d"
                        }
                    ],
                    "speed": 4.67,
                    "deg": 222,
                    "clouds": 92
                },
                {
                    "dt": 1498017600,
                    "temp": {
                        "day": 28.61,
                        "min": 27.18,
                        "max": 29.23,
                        "night": 28.66,
                        "eve": 29.09,
                        "morn": 27.22
                    },
                    "pressure": 1024.57,
                    "humidity": 99,
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10d"
                        }
                    ],
                    "speed": 3.87,
                    "deg": 169,
                    "clouds": 56,
                    "rain": 10.85
                },
                {
                    "dt": 1498104000,
                    "temp": {
                        "day": 29.19,
                        "min": 28.06,
                        "max": 29.54,
                        "night": 28.77,
                        "eve": 29.47,
                        "morn": 28.06
                    },
                    "pressure": 1026.93,
                    "humidity": 97,
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10d"
                        }
                    ],
                    "speed": 4.01,
                    "deg": 200,
                    "clouds": 76,
                    "rain": 3.19
                },
                {
                    "dt": 1498190400,
                    "temp": {
                        "day": 28.75,
                        "min": 26.75,
                        "max": 28.75,
                        "night": 26.75,
                        "eve": 27.7,
                        "morn": 27.63
                    },
                    "pressure": 1006.18,
                    "humidity": 0,
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10d"
                        }
                    ],
                    "speed": 2.55,
                    "deg": 243,
                    "clouds": 14,
                    "rain": 7.34
                },
                {
                    "dt": 1498276800,
                    "temp": {
                        "day": 28.22,
                        "min": 26.63,
                        "max": 28.22,
                        "night": 26.86,
                        "eve": 26.63,
                        "morn": 27.18
                    },
                    "pressure": 1005.66,
                    "humidity": 0,
                    "weather": [
                        {
                            "id": 502,
                            "main": "Rain",
                            "description": "大雨",
                            "icon": "10d"
                        }
                    ],
                    "speed": 3.37,
                    "deg": 236,
                    "clouds": 38,
                    "rain": 17.16
                }
            ],
            hrWeather: [
                {
                    "dt": 1497981600,
                    "main": {
                        "temp": 27.29,
                        "temp_min": 27.29,
                        "temp_max": 28.79,
                        "pressure": 1021.99,
                        "sea_level": 1020.41,
                        "grnd_level": 1021.99,
                        "humidity": 92,
                        "temp_kf": -1.5
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 88
                    },
                    "wind": {
                        "speed": 3.96,
                        "deg": 217.503
                    },
                    "rain": {
                        "3h": 0.0075000000000001
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-20 18:00:00"
                },
                {
                    "dt": 1497992400,
                    "main": {
                        "temp": 26.33,
                        "temp_min": 26.33,
                        "temp_max": 27.45,
                        "pressure": 1021.92,
                        "sea_level": 1020.4,
                        "grnd_level": 1021.92,
                        "humidity": 99,
                        "temp_kf": -1.13
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 68
                    },
                    "wind": {
                        "speed": 2.86,
                        "deg": 180.501
                    },
                    "rain": {
                        "3h": 0.64
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-20 21:00:00"
                },
                {
                    "dt": 1498003200,
                    "main": {
                        "temp": 26.93,
                        "temp_min": 26.93,
                        "temp_max": 27.69,
                        "pressure": 1023.19,
                        "sea_level": 1021.48,
                        "grnd_level": 1023.19,
                        "humidity": 100,
                        "temp_kf": -0.75
                    },
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 56
                    },
                    "wind": {
                        "speed": 3.32,
                        "deg": 146.001
                    },
                    "rain": {
                        "3h": 4.88
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-21 00:00:00"
                },
                {
                    "dt": 1498014000,
                    "main": {
                        "temp": 29.28,
                        "temp_min": 29.28,
                        "temp_max": 29.66,
                        "pressure": 1023.2,
                        "sea_level": 1021.7,
                        "grnd_level": 1023.2,
                        "humidity": 93,
                        "temp_kf": -0.38
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 80
                    },
                    "wind": {
                        "speed": 4.06,
                        "deg": 172.003
                    },
                    "rain": {
                        "3h": 1.72
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-21 03:00:00"
                },
                {
                    "dt": 1498024800,
                    "main": {
                        "temp": 29.79,
                        "temp_min": 29.79,
                        "temp_max": 29.79,
                        "pressure": 1022.74,
                        "sea_level": 1021.13,
                        "grnd_level": 1022.74,
                        "humidity": 94,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 76
                    },
                    "wind": {
                        "speed": 5.21,
                        "deg": 207.001
                    },
                    "rain": {
                        "3h": 0.83
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-21 06:00:00"
                },
                {
                    "dt": 1498035600,
                    "main": {
                        "temp": 29.88,
                        "temp_min": 29.88,
                        "temp_max": 29.88,
                        "pressure": 1022.72,
                        "sea_level": 1021.07,
                        "grnd_level": 1022.72,
                        "humidity": 91,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 92
                    },
                    "wind": {
                        "speed": 4.26,
                        "deg": 203.5
                    },
                    "rain": {
                        "3h": 1.09
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-21 09:00:00"
                },
                {
                    "dt": 1498046400,
                    "main": {
                        "temp": 29.68,
                        "temp_min": 29.68,
                        "temp_max": 29.68,
                        "pressure": 1023.73,
                        "sea_level": 1022.12,
                        "grnd_level": 1023.73,
                        "humidity": 90,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 80
                    },
                    "wind": {
                        "speed": 3.61,
                        "deg": 190.504
                    },
                    "rain": {
                        "3h": 0.004999999999999
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-21 12:00:00"
                },
                {
                    "dt": 1498057200,
                    "main": {
                        "temp": 29.36,
                        "temp_min": 29.36,
                        "temp_max": 29.36,
                        "pressure": 1024.59,
                        "sea_level": 1022.98,
                        "grnd_level": 1024.59,
                        "humidity": 91,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 804,
                            "main": "Clouds",
                            "description": "陰，多雲",
                            "icon": "04n"
                        }
                    ],
                    "clouds": {
                        "all": 92
                    },
                    "wind": {
                        "speed": 3.11,
                        "deg": 186.502
                    },
                    "rain": {},
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-21 15:00:00"
                },
                {
                    "dt": 1498068000,
                    "main": {
                        "temp": 29.42,
                        "temp_min": 29.42,
                        "temp_max": 29.42,
                        "pressure": 1023.97,
                        "sea_level": 1022.36,
                        "grnd_level": 1023.97,
                        "humidity": 90,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 804,
                            "main": "Clouds",
                            "description": "陰，多雲",
                            "icon": "04n"
                        }
                    ],
                    "clouds": {
                        "all": 92
                    },
                    "wind": {
                        "speed": 3.41,
                        "deg": 184.001
                    },
                    "rain": {},
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-21 18:00:00"
                },
                {
                    "dt": 1498078800,
                    "main": {
                        "temp": 29.21,
                        "temp_min": 29.21,
                        "temp_max": 29.21,
                        "pressure": 1023.79,
                        "sea_level": 1022.22,
                        "grnd_level": 1023.79,
                        "humidity": 91,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 803,
                            "main": "Clouds",
                            "description": "多雲",
                            "icon": "04n"
                        }
                    ],
                    "clouds": {
                        "all": 76
                    },
                    "wind": {
                        "speed": 3.46,
                        "deg": 171.502
                    },
                    "rain": {},
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-21 21:00:00"
                },
                {
                    "dt": 1498089600,
                    "main": {
                        "temp": 29.27,
                        "temp_min": 29.27,
                        "temp_max": 29.27,
                        "pressure": 1025.18,
                        "sea_level": 1023.55,
                        "grnd_level": 1025.18,
                        "humidity": 94,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 804,
                            "main": "Clouds",
                            "description": "陰，多雲",
                            "icon": "04d"
                        }
                    ],
                    "clouds": {
                        "all": 88
                    },
                    "wind": {
                        "speed": 4.31,
                        "deg": 174.501
                    },
                    "rain": {},
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-22 00:00:00"
                },
                {
                    "dt": 1498100400,
                    "main": {
                        "temp": 28.73,
                        "temp_min": 28.73,
                        "temp_max": 28.73,
                        "pressure": 1025.53,
                        "sea_level": 1023.87,
                        "grnd_level": 1025.53,
                        "humidity": 99,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 20
                    },
                    "wind": {
                        "speed": 4.31,
                        "deg": 177.002
                    },
                    "rain": {
                        "3h": 1.93
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-22 03:00:00"
                },
                {
                    "dt": 1498111200,
                    "main": {
                        "temp": 29.52,
                        "temp_min": 29.52,
                        "temp_max": 29.52,
                        "pressure": 1024.54,
                        "sea_level": 1022.89,
                        "grnd_level": 1024.54,
                        "humidity": 94,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 20
                    },
                    "wind": {
                        "speed": 3.66,
                        "deg": 198.003
                    },
                    "rain": {
                        "3h": 0.0050000000000008
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-22 06:00:00"
                },
                {
                    "dt": 1498122000,
                    "main": {
                        "temp": 29.79,
                        "temp_min": 29.79,
                        "temp_max": 29.79,
                        "pressure": 1023.78,
                        "sea_level": 1022.19,
                        "grnd_level": 1023.78,
                        "humidity": 90,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 801,
                            "main": "Clouds",
                            "description": "晴，少雲",
                            "icon": "02d"
                        }
                    ],
                    "clouds": {
                        "all": 20
                    },
                    "wind": {
                        "speed": 3.81,
                        "deg": 206.003
                    },
                    "rain": {},
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-22 09:00:00"
                },
                {
                    "dt": 1498132800,
                    "main": {
                        "temp": 29.17,
                        "temp_min": 29.17,
                        "temp_max": 29.17,
                        "pressure": 1024.86,
                        "sea_level": 1023.25,
                        "grnd_level": 1024.86,
                        "humidity": 93,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 801,
                            "main": "Clouds",
                            "description": "晴，少雲",
                            "icon": "02n"
                        }
                    ],
                    "clouds": {
                        "all": 24
                    },
                    "wind": {
                        "speed": 3.13,
                        "deg": 199
                    },
                    "rain": {},
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-22 12:00:00"
                },
                {
                    "dt": 1498143600,
                    "main": {
                        "temp": 29.18,
                        "temp_min": 29.18,
                        "temp_max": 29.18,
                        "pressure": 1025.76,
                        "sea_level": 1024.12,
                        "grnd_level": 1025.76,
                        "humidity": 93,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 804,
                            "main": "Clouds",
                            "description": "陰，多雲",
                            "icon": "04n"
                        }
                    ],
                    "clouds": {
                        "all": 88
                    },
                    "wind": {
                        "speed": 3.77,
                        "deg": 194.5
                    },
                    "rain": {},
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-22 15:00:00"
                },
                {
                    "dt": 1498154400,
                    "main": {
                        "temp": 27.11,
                        "temp_min": 27.11,
                        "temp_max": 27.11,
                        "pressure": 1024.64,
                        "sea_level": 1023.02,
                        "grnd_level": 1024.64,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 92
                    },
                    "wind": {
                        "speed": 3.56,
                        "deg": 189.009
                    },
                    "rain": {
                        "3h": 3.99
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-22 18:00:00"
                },
                {
                    "dt": 1498165200,
                    "main": {
                        "temp": 26.51,
                        "temp_min": 26.51,
                        "temp_max": 26.51,
                        "pressure": 1024.57,
                        "sea_level": 1022.92,
                        "grnd_level": 1024.57,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 88
                    },
                    "wind": {
                        "speed": 2.76,
                        "deg": 132
                    },
                    "rain": {
                        "3h": 5.45
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-22 21:00:00"
                },
                {
                    "dt": 1498176000,
                    "main": {
                        "temp": 27.59,
                        "temp_min": 27.59,
                        "temp_max": 27.59,
                        "pressure": 1025.55,
                        "sea_level": 1023.93,
                        "grnd_level": 1025.55,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 56
                    },
                    "wind": {
                        "speed": 2.46,
                        "deg": 126.502
                    },
                    "rain": {
                        "3h": 0.09
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-23 00:00:00"
                },
                {
                    "dt": 1498186800,
                    "main": {
                        "temp": 28.6,
                        "temp_min": 28.6,
                        "temp_max": 28.6,
                        "pressure": 1025.85,
                        "sea_level": 1024.21,
                        "grnd_level": 1025.85,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 32
                    },
                    "wind": {
                        "speed": 2.71,
                        "deg": 200.5
                    },
                    "rain": {
                        "3h": 0.02
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-23 03:00:00"
                },
                {
                    "dt": 1498197600,
                    "main": {
                        "temp": 28.3,
                        "temp_min": 28.3,
                        "temp_max": 28.3,
                        "pressure": 1023.99,
                        "sea_level": 1022.37,
                        "grnd_level": 1023.99,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 32
                    },
                    "wind": {
                        "speed": 3.42,
                        "deg": 218.005
                    },
                    "rain": {
                        "3h": 1.54
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-23 06:00:00"
                },
                {
                    "dt": 1498208400,
                    "main": {
                        "temp": 28.55,
                        "temp_min": 28.55,
                        "temp_max": 28.55,
                        "pressure": 1023.02,
                        "sea_level": 1021.41,
                        "grnd_level": 1023.02,
                        "humidity": 99,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 802,
                            "main": "Clouds",
                            "description": "多雲",
                            "icon": "03d"
                        }
                    ],
                    "clouds": {
                        "all": 36
                    },
                    "wind": {
                        "speed": 3.16,
                        "deg": 220.503
                    },
                    "rain": {},
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-23 09:00:00"
                },
                {
                    "dt": 1498219200,
                    "main": {
                        "temp": 28.47,
                        "temp_min": 28.47,
                        "temp_max": 28.47,
                        "pressure": 1023.67,
                        "sea_level": 1021.99,
                        "grnd_level": 1023.67,
                        "humidity": 98,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 56
                    },
                    "wind": {
                        "speed": 2.94,
                        "deg": 217.501
                    },
                    "rain": {
                        "3h": 0.010000000000002
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-23 12:00:00"
                },
                {
                    "dt": 1498230000,
                    "main": {
                        "temp": 28.56,
                        "temp_min": 28.56,
                        "temp_max": 28.56,
                        "pressure": 1023.75,
                        "sea_level": 1022.12,
                        "grnd_level": 1023.75,
                        "humidity": 97,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 88
                    },
                    "wind": {
                        "speed": 3.81,
                        "deg": 208.503
                    },
                    "rain": {
                        "3h": 0.02
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-23 15:00:00"
                },
                {
                    "dt": 1498240800,
                    "main": {
                        "temp": 27.96,
                        "temp_min": 27.96,
                        "temp_max": 27.96,
                        "pressure": 1022.45,
                        "sea_level": 1020.93,
                        "grnd_level": 1022.45,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 92
                    },
                    "wind": {
                        "speed": 4.18,
                        "deg": 215.501
                    },
                    "rain": {
                        "3h": 0.059999999999999
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-23 18:00:00"
                },
                {
                    "dt": 1498251600,
                    "main": {
                        "temp": 27.18,
                        "temp_min": 27.18,
                        "temp_max": 27.18,
                        "pressure": 1022.24,
                        "sea_level": 1020.63,
                        "grnd_level": 1022.24,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 64
                    },
                    "wind": {
                        "speed": 2.57,
                        "deg": 205.006
                    },
                    "rain": {
                        "3h": 6.16
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-23 21:00:00"
                },
                {
                    "dt": 1498262400,
                    "main": {
                        "temp": 26.9,
                        "temp_min": 26.9,
                        "temp_max": 26.9,
                        "pressure": 1023.37,
                        "sea_level": 1021.74,
                        "grnd_level": 1023.37,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 44
                    },
                    "wind": {
                        "speed": 1.66,
                        "deg": 201.001
                    },
                    "rain": {
                        "3h": 3.05
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-24 00:00:00"
                },
                {
                    "dt": 1498273200,
                    "main": {
                        "temp": 27.78,
                        "temp_min": 27.78,
                        "temp_max": 27.78,
                        "pressure": 1023.32,
                        "sea_level": 1021.78,
                        "grnd_level": 1023.32,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 92
                    },
                    "wind": {
                        "speed": 2.87,
                        "deg": 233.501
                    },
                    "rain": {
                        "3h": 0.54
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-24 03:00:00"
                },
                {
                    "dt": 1498284000,
                    "main": {
                        "temp": 28.15,
                        "temp_min": 28.15,
                        "temp_max": 28.15,
                        "pressure": 1022.31,
                        "sea_level": 1020.81,
                        "grnd_level": 1022.31,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 64
                    },
                    "wind": {
                        "speed": 2.01,
                        "deg": 253
                    },
                    "rain": {
                        "3h": 2.69
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-24 06:00:00"
                },
                {
                    "dt": 1498294800,
                    "main": {
                        "temp": 28.74,
                        "temp_min": 28.74,
                        "temp_max": 28.74,
                        "pressure": 1021.54,
                        "sea_level": 1019.95,
                        "grnd_level": 1021.54,
                        "humidity": 98,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10d"
                        }
                    ],
                    "clouds": {
                        "all": 80
                    },
                    "wind": {
                        "speed": 2.55,
                        "deg": 245.003
                    },
                    "rain": {
                        "3h": 0.44
                    },
                    "sys": {
                        "pod": "d"
                    },
                    "dt_txt": "2017-06-24 09:00:00"
                },
                {
                    "dt": 1498305600,
                    "main": {
                        "temp": 27.31,
                        "temp_min": 27.31,
                        "temp_max": 27.31,
                        "pressure": 1022.38,
                        "sea_level": 1020.67,
                        "grnd_level": 1022.38,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 501,
                            "main": "Rain",
                            "description": "中雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 68
                    },
                    "wind": {
                        "speed": 1.87,
                        "deg": 231.001
                    },
                    "rain": {
                        "3h": 3.77
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-24 12:00:00"
                },
                {
                    "dt": 1498316400,
                    "main": {
                        "temp": 27.82,
                        "temp_min": 27.82,
                        "temp_max": 27.82,
                        "pressure": 1022.85,
                        "sea_level": 1021.21,
                        "grnd_level": 1022.85,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 88
                    },
                    "wind": {
                        "speed": 1.77,
                        "deg": 213.5
                    },
                    "rain": {
                        "3h": 0.050000000000004
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-24 15:00:00"
                },
                {
                    "dt": 1498327200,
                    "main": {
                        "temp": 27.6,
                        "temp_min": 27.6,
                        "temp_max": 27.6,
                        "pressure": 1021.37,
                        "sea_level": 1019.82,
                        "grnd_level": 1021.37,
                        "humidity": 100,
                        "temp_kf": 0
                    },
                    "weather": [
                        {
                            "id": 500,
                            "main": "Rain",
                            "description": "小雨",
                            "icon": "10n"
                        }
                    ],
                    "clouds": {
                        "all": 100
                    },
                    "wind": {
                        "speed": 3.21,
                        "deg": 221.004
                    },
                    "rain": {
                        "3h": 0.14
                    },
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2017-06-24 18:00:00"
                }],
            showDetail: false,
            columns: [{
                'type': 'string',
                'label': 'Time'
            }, {
                'type': 'number',
                'label': '氣溫(℃)'
            }, {
                'type': 'number',
                'label': '降雨量(mm)'
            }],
            rows: [],
            options: {
                title: '',
                hAxis: {
                    title: 'Time',
                    minValue: '0',
                    maxValue: '24'
                },
                vAxis: {
                    title: '',
                    minValue: 0,
                    maxValue: 40
                },
                height: 500,
                curveType: 'function'
            }
        }
    },
    methods: {
        getWeatherDetail(w) {
            var date = w.dt;
            this.options.title = moment(date * 1000).format('MMMDD日') + '每3小時氣象狀況';
            var a = moment(date * 1000).format("YYYY-MM-DD") + " 00:00:00";
            var b = parseInt(moment(a).add('days', 1).format('X'));
            this.rows = [];
            this.hrWeather.forEach(function (element, index, array) {
                if (element.dt < b) {
                    var data = [];
                    data[0] = moment(element.dt * 1000).format("HH:mm");
                    data[1] = element.main.temp;
                    data[2] = element.rain['3h'];
                    this.rows.push(data);
                }
            }, this);
            this.showDetail = true;
        }
    },
    mounted() {

        this.fullscreenLoading = true;
        // 6Days / 1Day
        this.$http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=1668352&appid=8ef0ae69eb5a0dad29a107d4e24a9934&mode=json&units=metric&lang=zh_tw&cnt=5')
            .then(response => {
                this.dailyWeather = response.data.list;
            }, response => {
                this.$notify({
                    title: 'Oops...',
                    message: '取得氣象資訊發生錯誤',
                    type: 'warning'
                });
            }, { dataType: 'json' });
        // 5Day / 3hr
        this.$http.get('http://api.openweathermap.org/data/2.5/forecast?id=1668352&appid=8ef0ae69eb5a0dad29a107d4e24a9934&mode=json&units=metric&lang=zh_tw')
            .then(response => {
                this.hrWeather = response.data.list;
                this.fullscreenLoading = false;
            }, response => {
                this.$notify({
                    title: 'Oops...',
                    message: '取得氣象資訊發生錯誤',
                    type: 'warning'
                });
                this.fullscreenLoading = false;
            }, { dataType: 'json' });

    }
}
</script>

<style>
.weather.container {
    padding-top: 0px;
}
</style>