<template>
  <div class="participer">
    <div id="nav">
      <Nav msg="Welcome to Your Vue.js App"/> 
    </div>

    <h1>Participer à un Tour</h1>

    <div class="liste-tour">
      <div class="tour" v-for="(tour, index) in this.tours" :key="index" >
        <div class="tourTitle">
          <h3>Tour de : {{tour.user}}</h3> 
          <p> Fait le :{{tour.created_at | heure(tour.created_at)}}</p>
        </div>
          <CarteTour :tour="tour"/>
          
      </div>
      
    </div>
    <Footer />
  </div>
</template>
<script>
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CarteTour from '../components/CarteTour'
import { db } from '../firebase';


export default {
  name:'Participer',
  
  components:{
    Nav,
    Footer,
    CarteTour
  },
  firestore() {
    return {
      tours: db.collection('Tour').orderBy("created_at", "desc"),
    }
  },
  data() {
    return {  
      user : localStorage.getItem("username")
    };
  },
   methods: {
  },
  filters:{
      heure(value) {
        let time = new Date(value*1000)
      //return time.getHours()+":"+time.getMinutes()
      return time.toLocaleTimeString('fr-FR', {day: '2-digit',month: '2-digit',hour: '2-digit', minute:'2-digit', second: '2-digit'})
      }
  },
  created(){
   // console.log(this.tours)
  }
}
</script>

<style lang="scss" >
.participer{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#maCarte{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
}
.headerMap{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
}
h1{
  padding: 0 .5rem !important;
}
.liste-tour{
  width: 90%;
  padding: 2rem;
}
.tour{
 overflow: hidden;

  border: 1px solid hsl(271, 100%, 71%);
  margin: 1rem 0;
  padding: .5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  box-shadow: 3px 3px 10px 1px #282c34;
}
.tourTitle{
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  justify-content: flex-start;
  padding-top: 2rem;
  h3{
    font-size: 2rem;
    padding-right: 2rem;
  }
  p{
    font-size: 1.2rem;
    display: flex;
    align-items: flex-end;
  }
}
@media screen and (max-width: 900px){
  .liste-tour{
    width: 100%;
    padding: 1rem;
    margin-bottom: 2rem;
  }
  .tour{
    align-items: flex-start;
  }
   .tourTitle{
     align-items: center;
     justify-content: flex-start;
     padding-left: 1rem;
     h3{
       text-align: start;
       font-size: 1.3rem;
       padding-right: 1rem;
     }
     p{
       font-size: .9rem;
       text-align: start;
     }
   }
}
</style>