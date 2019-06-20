<script>
import { Line, mixins } from 'vue-chartjs';

export default Line.extend({
  mixins: [mixins.reactiveProp],
  data() {
    return {
      options: { responsive: true, maintainAspectRatio: false },
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
});
</script>
