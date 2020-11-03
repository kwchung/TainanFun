import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        responseive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              id: "temp",
              type: "linear",
              position: "left",
              scaleLabel: {
                display: true,
                labelString: "氣溫(℃)"
              },
              ticks: {
                beginAtZero: true
              }
            },
            {
              id: "rain",
              type: "linear",
              position: "right",
              scaleLabel: {
                display: true,
                labelString: "降雨量(mm)"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
