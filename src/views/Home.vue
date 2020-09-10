<template>
  <div class="home">
    <div id="nav">
      <Nav msg="Welcome to Your Vue.js App"/> 
    </div>
    <h1>Home</h1>
    <p>Bonjour <strong>{{this.user}}</strong></p>

    <div class="homeTitle">
      <img src="https://images.unsplash.com/photo-1567004314453-ed46f03527fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=911&q=80" alt="image">
      <div class="homeTitle_text">
        <h4>Titre du paragraphe</h4>
        <p>Un text pour presenter le but du site. This is the end of the tutorial. I do hope you’ve enjoyed what you learned here: building a live map with Vue.js, Leaflet and Pusher Channels. The knowledge acquired here can help you achieve more astonishing things. You can get the full source</p>
      </div>
     
    </div>

    <div class="resultats">
      <h4 class="resultats_title">Résultats des parcours terminés</h4>

      <div class="resultats_tableau">
        <ul>
          <li class="resultats_items" v-for="(resultat,index) in this.listeResultats" :key="index">
              <p>Le parcours de <strong>{{resultat.organisateur}}</strong> fait le {{resultat.dateTour.seconds | heure(resultat.dateTour.seconds)}}
               à éte terminé par <strong>{{resultat.participant}}</strong>   le {{resultat.dateFin | heure(resultat.dateFin.seconds)}} </p>

          </li>
        </ul>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import { db } from '../firebase';


export default {
  name: 'Home',
  
  data(){
    return{
      user: "",
      listeResultats:[]
    }
  },
  components: {
    Nav,
    Footer
  
  },
  firestore() {
      return {
        listeResultats: db.collection('tourFini').orderBy("dateFin", "desc"),
      }
    },
  methods:{ 
    maPosition(position) {
      let infopos = "Votre position :\n";
      infopos += "Latitude : "+position.coords.latitude +"\n";
      infopos += "Longitude: "+position.coords.longitude+"\n";
    
      document.getElementById("infoposition").innerHTML = infopos;
    }

  },
  filters:{
      heure(value) {
        let time = new Date(value*1000)
      //return time.getHours()+":"+time.getMinutes()
      return time.toLocaleTimeString('fr-FR', {day: '2-digit',month: '2-digit',hour: '2-digit', minute:'2-digit'})
      }
  },
  created(){
    this.user = this.$route.params.user || localStorage.getItem('username')
    console.log(this.listeResultats)
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
  margin-bottom: 4rem;
  .homeTitle{
    padding: 2rem;
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    img{
      width: 50%;
      height: 300px;
      object-fit: cover;
    }
    &_text{
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0 2rem  ;
      h4{
        font-size: 2rem;
      }
      p{
        text-align: start;
      }
    }
  }
}
.resultats{
  &_title{
    padding: 2rem 0;
    font-size: 2rem;
  }
  &_tableau{
    padding: 0 3rem;
    text-align: start;
  }
  &_items{
    padding: .5rem 0;
  }
}
@media only screen and (max-width: 900px){
  .homeTitle{
    padding: 1rem !important;
    flex-direction: column !important;
    img{
      width: 100% !important;
      
    }
    &_text{
      width: 100% !important;
      padding-top: 2rem !important;
    }
  }
}
</style>