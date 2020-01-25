<template>
  <div class="questionCard">
    <!-- <div :v-if="type=='input'">
      <h1 class="title">{{ question.number }}</h1>
      <br>
      <h2>Enter Input</h2>
      <br>
      <div v-if="question.number == 'Final Question'" class="columns is-centered">
        <div class="column">
          <input class="inputField" type="text" v-model="finalInput.inputValue1" :placeholder="question.instruction">
        </div>
        <div class="column">
          <input class="inputField" type="text" v-model="finalInput.inputValue2" :placeholder="question.instruction">
        </div>
        <div class="column">
          <input class="inputField" type="text" v-model="finalInput.inputValue3" :placeholder="question.instruction">
        </div>
        <br>
      </div>
      <input v-else class="inputField" type="text" v-model="inputValue" :placeholder="question.instruction">
      <br>
      <br>
      <h2>Output : {{outputValue}}</h2>
      <br>
      <br>
      <br>
      <Button text="Get Output" @click.native="getOutput" />
    </div> -->
    <div :v-if="question.type=='mcq'">
      <div class="mcq_options">
        {{question.number}}
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
      imgUrl:String
    }
  },
  methods:{
    submitAnswer(ans){
      firebaseApp.db.doc('answers/'+this.question.number).onSnapshot(snapshot=>{
        if(snapshot.data().ans == ans){
          let uid = localStorage.getItem('uid')
          firebaseApp.db.doc('users/'+uid).update({
            "currentQuestion":question.number + 1,
            "points": firebase.firestore.FieldValue.increment(10)
          })
        }
        else {
          //MOVE TO DIVERSION QUESTIONS
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
