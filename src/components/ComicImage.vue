<template>
  <div class="imgContainer">
    {{name}}
    <img class="image" :src="require(`../assets/${name}.jpg`)" />
  </div>
</template>

<script>
import firebaseApp from '../firebaseConfig'
import firebase from 'firebase'
import 'firebase/firestore'
export default {
  name: 'QuestionCard',
  data: function(){
    return {
      
    }
  },
  props: {
    name:String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image{
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  /* border-radius: 20px; */
  margin-right: 20px;
}
</style>
