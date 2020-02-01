<template>
  <div class="questionCard">
    <div>
      <div class="mcq_options">
        <div class="option" v-for="option in question.options" v-on:click="submitAnswer(option)" v-bind:key="option">{{option}}</div>
      </div>
    </div>

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
    question:{
      type:String,
      number:String,
      options:Array,
      text:String,
      imgUrl:String,
      correct:String,
      path:String
    }
  },
  methods:{
    submitAnswer(ans){
      if(this.question.path == "main"){
        console.log(ans)
        console.log(ans)
        let uid = localStorage.getItem('uid')
        if(this.question.correct == ans){
          firebaseApp.db.doc('users/'+uid).update({
            "currentQuestion":firebase.firestore.FieldValue.increment(1),
            "points": firebase.firestore.FieldValue.increment(10)
          })
        }
        else {
          firebaseApp.db.doc('users/'+uid).update({
            "sidePaths": firebase.firestore.FieldValue.increment(1),
            "atSidePath":true
          })
        }
      }
      else if(this.question.path == "side"){
        let uid = localStorage.getItem('uid')
        if(this.question.number == "1"){
          if(this.question.correct == ans){
            firebaseApp.db.doc('users/'+uid).update({
              "loadSecondPart":true
            })
          }
          else {
            firebaseApp.db.doc('users/'+uid).update({
              "points": firebase.firestore.FieldValue.increment(-5),
              "loadSecondPart":true
            })
          }
        }
        else {
          if(this.question.correct == ans){
            firebaseApp.db.doc('users/'+uid).update({
              "atSidePath":false,
              "loadSecondPart":false,
              "currentQuestion":firebase.firestore.FieldValue.increment(1)
            })
          }
          else {
            firebaseApp.db.doc('users/'+uid).update({
              "points": firebase.firestore.FieldValue.increment(-5),
              "atSidePath":false,
              "loadSecondPart":false,
              "currentQuestion":firebase.firestore.FieldValue.increment(1)
            })
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.questionCard{
  text-align: center;
  color: white;
}
.mcq_options{
  padding: 30px;
}
.option {
  padding: 10px 30px;
  background:brown;
  margin: 20px;
  border-radius: 5px;

  font-size: 110%;
  cursor: pointer;
}
.option:hover {
  box-shadow: 0 34px 100px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>
