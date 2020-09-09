<template>
  <div class="participer">
    <div id="nav">
      <Nav msg="Welcome to Your Vue.js App"/> 
    </div>

    <h1>C'est parti pour un Tour</h1>

   
      <div class="tour">
        <div class="tourTitle">
          <h3>Tour de : {{this.currentTour.user}}</h3> 
          <p> fait à : {{this.currentTour.created_at | heure(this.currentTour.created_at)}}</p>
        </div>
          
          <div class="innerTour"  >
        <div class="headerMap">
          <p><strong>Le centre de la carte se trouve : </strong> {{ currentCenter }} <strong>niveau de zoom :</strong> {{ currentZoom }}</p>
          
        </div>
        <l-map
          :zoom="zoom"
          :center="center"
          style="height: 100%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
          @update:userPosition="userPositionUpdate"
          >

          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
     
          <l-marker 
            v-for="(marker, index) in markers" 
            :key="index" 
            :lat-lng="marker" 
            icon-url="/images/baseball-marker.png"
            ></l-marker>

            
            <l-marker 
            :lat-lng="this.userPosition"
            >
            <l-icon
              icon-url='https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
             />
            </l-marker>

        </l-map>
        <p><strong>Votre position : </strong> {{ this.userPosition }}</p>
        <ul class="listMarkers">

          <li>
            <div class="buttons validBtn" >
              <a class="button is-primary">
                  <strong>Valider marker</strong>
              </a>
            </div>
          </li>

          <li v-for="(marker, index) in this.markers"
          class="item" 
            :key="index" ><strong>Marker {{index +1 }} :</strong> Coordonées / Latitude:{{marker.lat}}   Longitude:{{marker.lng}}
          </li>
          
      </ul>
      </div>
      
      
    </div>


    
    <Footer />
  </div>
</template>
<script>
import Nav from '../components/Nav'
import Footer from '../components/Footer'
//import CarteTour from '../components/CarteTour'
//import { db } from '../firebase';

import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import { latLng, Icon } from "leaflet";


export default {
  name:'Tour',
  components:{
    LMap,
    LTileLayer,
    LMarker,
    Nav,
    LIcon,
    Footer
  },
  data() {
    return {
      userPosition:[50.471156, 4.42841],
      user : localStorage.getItem("username"),
      show: false,
      currentTour : {},
      date : new Date(),
      zoom: 16,
      center: latLng(50.471156, 4.42841),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 9,
      currentCenter: latLng(50.471156, 4.42841),
      showParagraph: false,
      markers: [],
      
      greenIcon : new Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }
  },
   methods: {
     userPositionUpdate(userPosition){
       this.userPosition = userPosition
     },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    maPosition(position) {
      this.userPosition = [position.coords.latitude, position.coords.longitude]
      console.log("thisuserposition",this.userPosition)
      
      this.center = latLng(position.coords.latitude, position.coords.longitude)
      this.currentCenter = latLng(position.coords.latitude, position.coords.longitude)
    }
  },
  filters:{
      heure(value) {
        let time = new Date(value*1000)
      //return time.getHours()+":"+time.getMinutes()
      return time.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit', second: '2-digit'})
      }
  },
  created(){
    if(navigator.geolocation)
   navigator.geolocation.getCurrentPosition(this.maPosition)

    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  //marker([51.5, -0.09], {Icon: greenIcon}).addTo(map);
    this.currentTour = JSON.parse(localStorage.getItem('Tour'))
    this.markers = JSON.parse(this.currentTour.markers)
    //console.log('data recu',this.currentTour.markers)
  }
}
</script>

<style lang="scss" scoped>
.participer{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:0 1rem;
  margin-bottom: 4rem;
}
.leaflet-container{
 
  height: 60% !important;
  margin: 0 0 2rem 0 ;
}
.tour{
  width: 100%;
  height: 150vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;

  border: 1px solid hsl(271, 100%, 71%);
  margin: 1rem 0;
  padding: 1rem;
 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  box-shadow: 3px 3px 10px 1px #282c34;
}
#maCarte{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  
}
.headerMap{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.liste-tour{
  width: 90%;
  padding: 2rem;
}

.tourTitle{
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2rem;
  h3{
    font-size: 2rem;
    padding-right: 2rem;
  }
  p{
    font-size: 1.2rem;
  }
}
.validBtn{
  display: flex;
  justify-content: center !important;
  padding: 1rem 0;
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
     h3{
       text-align: start;
       font-size: 1.2rem;
       padding-right: 1rem;
     }
     p{
       font-size: .9rem;
       text-align: start;
     }
   }
}
</style>