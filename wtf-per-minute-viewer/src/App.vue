<template>
  <Header title="WTFs Per Minute Browser" />
  <!-- <BarChart/> -->
  <div class="body">
    <Projects class="project-tree" />
    <MainContent class="stats-views" />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Projects from './components/Projects.vue';
import MainContent from './components/MainContent.vue'

export default {
  name: 'App',
  components: {
    Header,
    // BarChart,
    Projects,
    MainContent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.project-tree {
  flex-basis: 300px;
}
.stats-views {
  flex-grow: 1;
}
</style>
