<template>
   <section class="section Log">
     <div class="form">
        <h2 class="titleLog"> Se connecter</h2>
        

        <b-field label="Email">
            <b-input type="email"
              placeholder=" JohnDoe@gmail.com"
              v-model="email"
              value="john@"
              maxlength="30">
            </b-input>
       </b-field>

        <b-field label="Mot de passe">
            <b-input type="password"
              v-model="password"
              value="iwantmytreasure"
              password-reveal>
            </b-input>
        </b-field>
        <br>
         <div class="buttons signUpBtn" @click="login()" >
          <a class="button is-primary is-outlined">
              <strong>Se connecter</strong>
          </a>
        </div>
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
          this.$router.push('/home')
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