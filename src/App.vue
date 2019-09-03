<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position:absolute;
  left:0;
  top:0;
  bottom:0;
  width:100%;
}
</style>
