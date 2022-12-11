<template>
  <div class="root">
    <h2>
      {{ getSelectedProjectInstructionOrLabel }}
    </h2>
    <UserChart></UserChart>
    <BarChart></BarChart>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import UserChart from "@/components/UserChart";
import BarChart from "@/components/BarChart";

export default {
  name: "MainContent",
  components: {UserChart,BarChart},
  computed: {
    ...mapGetters({
      getSelectedProject: 'getSelectedProject',
    }),
    getSelectedProjectInstructionOrLabel() {
      if (this.getSelectedProject === null) {
        return 'Please select a project on the left';
      } else {
        return this.getProjectName(this.getSelectedProject);
      }
    }
  },
  methods: {
    ...mapGetters({
      getProjectName: 'getProjectName',
    })
  }
}
</script>

<style scoped>
.root {
  border: 2px solid grey;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
