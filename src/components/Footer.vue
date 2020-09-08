<template>
    <footer>
        <p class="title">Jonathan Fauchoux / 2020 © Tous droits réservés</p>
    </footer>
</template>

<script>
export default {
  name: 'Footer',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
footer{
  z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  
    height: 2rem;
    width: 100%;
    background-color: white;
    position: fixed;
    bottom: 0;
}
footer .title{
  text-align: center;
  color: hsl(271, 100%, 71%);
  font-size: .8rem;
}


</style> >