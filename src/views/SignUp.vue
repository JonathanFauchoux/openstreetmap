<template>
   <section class="section signUp">
     <div class="form">
        <h2 class="titleLog"> S'inscrire</h2>
         <b-field label="Name">
            <b-input type="text" v-model="name"></b-input>
        </b-field>

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
        <div class="buttons signUpBtn" @click="signUp()" >
          <a class="button is-primary is-outlined">
              <strong>S'inscrire</strong>
          </a>
        </div>
        <br>
        <br>
        <p>Dejà inscrit ? <router-link to="/">Se connecter</router-link></p>

        <!-- <ul class="reptileList">
          <li v-for="user in users" :key=user.name >
            {{ user.name }}
          </li>
        </ul> -->
 
     </div>
       
    </section>
</template>

<script>
import firebase from 'firebase'
import { db } from '../firebase';

// @ is an alias to /src


export default {
  name: 'SignUp',
  
  components: {
   
  },
  data(){
    return{
      //user:[],
      name: "",
      email: "",
      password: ""
    }
  },
  firestore(){
   return{
     users : db.collection('users')
   } 
  },
  methods: {
    signUp (){
      // log the user in
      firebase.auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(
        user => {
          console.log(user)
         db.collection('users').doc(this.name).set({
          name: this.name,
          email: this.email,
          password: this.password,
          create_at: new Date()
         })
          localStorage.setItem("username", this.name);
          this.$router.push({name: "Home", params:{user : this.name}})
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
.signUp{
  height: 100vh;
  width: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form{

  max-width: 600px;
  width: 100% !important;
}
.signUpBtn{
  display: flex;
  justify-content: center !important;
}
</style>