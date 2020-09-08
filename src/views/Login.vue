<template>
   <section class="section Log">
     <div class="form">
        <h2 class="titleLog"> Se connecter</h2>
        

        <b-field label="Email">
            <b-input type="email"
                v-model="email"
                value="john@"
                maxlength="30">
            </b-input>
       </b-field>

        <b-field label="Password">
            <b-input type="password"
                v-model="password"
                value="iwantmytreasure"
                password-reveal>
            </b-input>
        </b-field>
        <br>
        <b-button @click="login">se connecter</b-button>
        <br>
        <br>
        <p>besoin d'une inscription ? <router-link to="/signup">s'inscrire</router-link></p>
 
     </div>
       
    </section>
</template>

<script>
import firebase from 'firebase'
// @ is an alias to /src


export default {
  name: 'Login',
  components: {
   
  },
  data(){
    return{
      email: "",
      password: ""
    }
  },
  methods: {
    login (){
      // log the user in
      firebase.auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(
        user => {
          console.log(user)
          this.$router.push('/')
        },
        err => {
          console.log(err)
        }
      )
    },

    clickMe() {
        this.$buefy.notification.open('Clicked!!')
    }
  }
}
</script>
<style lang="scss">
.Log{
  height: 100vh;
  width: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form{
  max-width: 800px;
  width: 100% !important;
}
.titleLog{
  margin: 2rem 0;
  font-size: 2rem;
  font-style: italic;
}
</style>