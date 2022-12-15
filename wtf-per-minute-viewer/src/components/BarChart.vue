<template>
  <div class="title">
    <Bar id="my-chart-id" :options="chartOptions" :data="fileData" />
  </div>
</template>
  
<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {mapGetters} from "vuex";
import {has, keys, reduce, values} from "lodash";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true
      }
    }
  },
  computed: {
    events() {
      return this.getEventsOfProject(this.getSelectedProject());
    },
    fileData() {
      const dataByFile = reduce(this.events, function(catalog, event) {
        if (!has(catalog, event.file)) {
          catalog[event.file] = 0;
        }
        catalog[event.file]++;
        return catalog;
      }, {});
      console.log(dataByFile);
      const labels = keys(dataByFile);
      const data = values(dataByFile);
      console.log(labels);
      console.log(data);
      return {
        labels: labels,
        datasets: [{ data: data }],
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
#my-chart-id {
  max-height: 400px;

}
</style>