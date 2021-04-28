<template>
  <div id="app" v-title data-title="数据库同步工具">
    <router-view :key="this.$route.path"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    created(){
      //在页面加载时读取sessionStorage里的状态信息
      this.$store.state.token = window.sessionStorage.getItem("token")
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        window.sessionStorage.setItem("token", this.$store.state.token)
      })
    }
  }
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
