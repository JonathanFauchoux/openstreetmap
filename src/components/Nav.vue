<template>
    <b-navbar class="navBar">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="#">
               <router-link to="/home">Home</router-link>
      
            </b-navbar-item>
            <b-navbar-item href="#">
                <router-link to="/organise">Organiser</router-link>
            </b-navbar-item>

            <b-navbar-item href="#">
                <router-link to="/participer">Participer</router-link>
            </b-navbar-item>

            
        </template>

        <template slot="end" class="right">
            <h3>Hello, {{this.user}}</h3>
            <b-navbar-item tag="div">
                <div class="buttons logOut" @click="logOut">
                    <a class="button is-primary is-outlined">
                        <strong>Se deconnecter</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<script>

export default {
    
  name: 'Nav',
data (){
    return{
        user : localStorage.getItem('username')
    }
},
  components: {
 
  }, 
  methods:{
      logOut () {
          this.$router.push('/')
      }
  }
}
</script>
<style lang="scss" scoped>
.navBar{
    width: 100%;
}
.navbar-end h3{
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    padding-right: 1rem;
}
.button{
    color: hsl(271, 100%, 71%) !important;
    :hover{
        color: white !important;
    }
}
.logOut{
    width: 80% !important;
}
</style>