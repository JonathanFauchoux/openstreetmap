<template>
  <div class="home">
    <div id="nav">
      <Nav msg="Welcome to Your Vue.js App"/> 
    </div>
    <h1>Home</h1>
    <p>Bonjour {{this.user}}</p>
    <div class="homeTitle">
      <h4>titre du paragraphe</h4>
    <p>Un text pour presenter le but du site</p>
    </div>
    
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'



export default {
  name: 'Home',
  
  data(){
    return{
      user: ""
    }
  },
  components: {
    Nav
  /*  Login,
   SignUp */
  },
  created(){
    this.user = this.$route.params.user || localStorage.getItem('username')
  }
}
</script>
<style lang="scss" >
.home{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .homeTitle{
    padding-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    h4{
      font-size: 1.5rem;
    }
  }
}
</style>