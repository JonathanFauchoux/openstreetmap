<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',

  components: {
    
  },
  data (){
    return{
    
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#nav {
  width: 100%;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: hsl(271, 100%, 71%);
    }
  }
}
h1{
  font-size: 3rem !important;
  text-transform: uppercase;
}

b-button{
  color: white !important;
}
@media screen and (max-width: 900px){
   h1{
     font-size: 2rem !important;
   }
}
</style>
