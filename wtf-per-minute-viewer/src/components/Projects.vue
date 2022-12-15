<template>
  <div class="root">
    <div class="header">
      <h2>Projects</h2>
    </div>
    <div :key="project.uuid" v-for="project in getProjects" :class="projectTileClasses(project.uuid)" @click="selectProject(project.uuid)">
      <h5>
        {{ project.name }}
      </h5>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'WTFsProjects',
  data() {
    return {
      projects: []
    }
  },
  computed: {
    ...mapGetters({
      getProjects: 'getProjects',
      getEventsByProject: 'getEventsByProject',
      getSelectedProject: 'getSelectedProject',
    })
  },
  methods: {
    ...mapActions({
      fetchProjects: 'fetchProjects',
      fetchEventsForProject: 'fetchEventsForProject',
    }),
    ...mapMutations({
      setSelectProject: 'selectProject'
    }),
    selectProject(projectUuid) {
      this.setSelectProject(projectUuid);
      this.fetchEventsForProject(projectUuid);
    },
    projectTileClasses(projectUuid) {
      return {
        'each-project-tile': true,
        'selected-project-tile': projectUuid === this.getSelectedProject,
      };
    }
  },
  mounted() {
    this.fetchProjects();
  },
}
</script>

<style scoped>

.root {
  border: 2px solid grey;
  border-radius: 5px;
  width: 300px;
  justify-content: center;
  text-align: center;
}

.header {
  background: lightseagreen;
  height: 50px;
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.each-project-tile {
  height: 50px;
  text-align: center;
  background: lightgrey;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.selected-project-tile {
  background-color: yellow;
}

.each-project-tile:hover {
  cursor: pointer;
  background: black;
  color: white;
}
</style>