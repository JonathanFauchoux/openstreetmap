<template>
  <div class="organiser">
    <div id="nav">
      <Nav msg="Welcome to Your Vue.js App"/> 
    </div>

    <h1>Organiser un Tour</h1>

    <div id="maCarte">
      <div class="innerTour">
        <div class="headerMap">
          
          <p><strong>Centre de la carte : </strong> {{ currentCenter }} -<strong>zoom : </strong> {{ currentZoom }}</p>
        </div>
        <l-map
        
          :zoom="zoom"
          :center="center"
        
          style="height: 80%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
          @click="addMarker"
          >

          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
     
          <l-marker 
            v-for="(marker, index) in markers" 
            :key="index" 
            :lat-lng="marker" 
            @click="removeMarker(index)"
            >
       
          </l-marker>
        </l-map>
      </div>
      <div class="buttons addTourBtn" @click="addTour()" >
        <a class="button is-primary">
            <strong>Créer le tour</strong>
        </a>
      </div>
      <ul class="listMarkers">
        <li v-for="(marker, index) in markers"
          class="item" 
          :key="index" >
          <strong>Marker {{index +1 }} :</strong>
          Coordonées / Latitude:{{marker.lat}}   Longitude:{{marker.lng}}
        </li>
      </ul>
       <Footer />
    </div>

  </div>
</template>
<script>
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from 'leaflet';

import { db } from '../firebase';


export default {
  name:'Organise',
  
  components:{
    Nav,
    Footer,
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      userPosition:{},
      date : new Date(),
      center: latLng(50.471177, 4.429969),
      zoom: 16,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 9,
      currentCenter: latLng(50.471177, 4.429969),
      showParagraph: false,
      markers: [
        latLng(50.471177, 4.429969), 
      ],
      user : localStorage.getItem("username"),
      
    };
  },
   methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    removeMarker(index) {
      this.markers.splice(index, 1);
    },
    addMarker(event) {
      this.markers.push(event.latlng);
      //console.log(this.markers)
    },
    addTour(){
      let newTour = {user: this.user, markers: this.markers}
      let markersString = JSON.stringify(this.markers)
      console.log(newTour)
      db.collection('Tour').add({
        user: this.user,
        markers: markersString,
        created_at : this.date
      })
      
      this.$buefy.toast.open({type: "is-success" ,message : 'Parcours enregistré !'})
      this.markers = []
    },
    maPosition(position) {
      this.userPosition = {lat: position.coords.latitude, lng: position.coords.longitude} 
      //console.log("thisuserposition",this.userPosition.lng)
      this.markers= [
        latLng(position.coords.latitude, position.coords.longitude), 
      ]
      this.center = latLng(position.coords.latitude, position.coords.longitude)
      this.currentCenter = latLng(position.coords.latitude, position.coords.longitude)
    }
  },
  mounted(){
    if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(this.maPosition)
    //console.log("maposition", this.userPosition)
  },
  created(){
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    
    
  }
}
</script>

<style lang="scss" >

#maCarte{
  width: 100%;
  height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start !important;
    align-items: center;
    padding: 0 2rem;
}
.headerMap{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
    
  }
.organiser{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  h1{
    margin-bottom: 2rem;
  }
  .listMarkers{
    padding: 1rem 0 4rem 0;
  }
  .item{
    padding: .3rem 0;
  }
}
.addTourBtn{
  padding-top: 2rem;
}
.innerTour{
height: 600px;
width: 100%
}

@media only screen and (max-width: 900px){
  .organiser{
    padding: 0 1rem;
  }
  #maCarte{
    padding:1rem;
    width: 100%;
    justify-content: flex-start !important;;
   
  }
  l-map{
    height: 50%;
  }
  .innerTour{
height: 300px;
width: 100%
}
}
</style>