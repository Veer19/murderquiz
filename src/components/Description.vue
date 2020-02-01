<template>
  <div class="container">
    <!-- <h1>{{heading}}</h1> -->
    <div v-html="text" class="description"></div>
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
    heading:String,
    text:String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.description{
  text-align: left;
  padding: 20px;
}
.questionCard{
  text-align: center;
  padding: 50px;
  color: white;
  background: #1d1d1d;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
.inputField{
  padding: 20px;
  font-size: 110%;
  background: #1d1d1d;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px #A32A29 solid;
  color: whitesmoke;
  width: 100%;
}
.button{
  border: none;
}
.title{
    padding: 30px;
    background: #1d1d1d;
    width: 100%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    color: whitesmoke;
}

</style>
