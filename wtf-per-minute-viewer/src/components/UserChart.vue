<template>
  <h3>Reports by user</h3>
  <Doughnut class="chart" :options="chartOptions" :data="userData" />
</template>
  
<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {mapGetters} from "vuex";
import {has, keys, reduce, values} from "lodash";
import { Colors } from 'chart.js';

ChartJS.register(Colors);
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  components: { Doughnut },
  data() {
    return {
      chartOptions: {
        responsive: true,
        showDataPoints: true,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    }
  },
  computed: {
    events() {
      return this.getEventsOfProject(this.getSelectedProject());
    },
    userData() {
      const dataByUser = reduce(this.events, function(catalog, event) {
        if (!has(catalog, event.user)) {
          catalog[event.user] = 0;
        }
        catalog[event.user]++;
        return catalog;
      }, {});
      console.log(dataByUser);
      const labels = keys(dataByUser);
      const data = values(dataByUser);
      console.log(labels);
      console.log(data);
      return {
        labels: labels,
        datasets: [{ data }],
      }
    }
  },
  methods: {
    ...mapGetters({
      getEventsOfProject: 'getEventsOfProject',
      getSelectedProject: 'getSelectedProject',
    }),
  }
}


</script>

<style scoped>
.chart {
  max-height: 400px;
}
</style>