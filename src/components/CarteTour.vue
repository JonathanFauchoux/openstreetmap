<template>
  <div class="opencarte">
    <div class="buttons showTour" @click="showTour()" >
        <a class="button is-primary">
            <strong>Voir ce tour</strong>
        </a>
      </div>
    <div id="maCarte" v-if="this.show">
      
      <div class="innerTour"  >
        <div class="headerMap">
          
          <p>Le centre de la carte se trouve : {{ currentCenter }} niveau de zoom: {{ currentZoom }}</p>
        </div>
        <l-map
        
          :zoom="zoom"
          :center="center"
        
          style="height: 100%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
          
          >

          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
     
          <l-marker 
            v-for="(marker, index) in markers" 
            :key="index" 
            :lat-lng="marker" 
            
            >
       
          </l-marker>
        </l-map>
         <div class="buttons participeBtn" @click="jeParticipe()">
              <a class="button is-primary">
                <strong>Je participe</strong>
              </a>
            </div>
        <ul class="listMarkers">
          <li>
           
          </li>
        <li v-for="(marker, index) in markers"
        class="item" 
            :key="index" ><strong>Marker {{index +1 }} :</strong> Coordonées / Latitude:{{marker.lat}}   Longitude:{{marker.lng}}</li>
      </ul>
      </div>
      
      
    </div>
  </div>
</template>

<script>

import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { Icon } from 'leaflet';

import { db } from '../firebase';


export default {
  name:'Organise',
  props:['tour'],
  
  components:{
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      currentTour : this.tour,
      date : new Date(),
      zoom: 16,
      center: latLng(50.471156, 4.42841),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 9,
      currentCenter: latLng(50.471156, 4.42841),
      showParagraph: false,
      markers: JSON.parse(this.tour.markers),
      user : localStorage.getItem("username"),
      show: false
    };
  },
   methods: {
     jeParticipe () {
    // this.$router.push({name:"Tour", params:{tour : this.currentTour}})
     localStorage.setItem('Tour',  JSON.stringify(this.currentTour))
     this.$router.push('/tour')
     console.log('data', this.currentTour)
   },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showTour(){
      this.show = !this.show
     // console.log(this.show)
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
      //console.log(newTour)
      db.collection('Tour').add({
        user: this.user,
        markers: markersString,
        created_at : this.date
      })
      
      localStorage.setItem('Tour',  JSON.stringify(newTour))
      this.markers = []
    }
  },
  created(){
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    //console.log(JSON.parse(this.tour.markers))
  }
}
</script>

<style lang="scss" scoped >

.opencarte{
  width: 100% ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #maCarte{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.innerTour{
height: 300px;
width: 100%
}
.headerMap{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
}

.listMarkers{
  width: 100%;
  height: auto;
  
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .item{
    text-align: center;
    width: 50%;
    font-size: 0.9rem;
    padding-bottom: .4rem;
  }
  
}
.participeBtn{
  display: flex;
  justify-content: center;
}
.showTour{
  position: relative;
  top: -35px;
  left: 40%;
}
.leaflet-container{
  margin-bottom: 2rem;
}

</style>