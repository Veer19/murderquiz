<template>
  <div class="home">
    <div class="container">
      <h1 class="title">INSTRUCTIONS</h1>
      <div class="container inst">
       - This is a team event. There can be 1-2 members in a team.
<br>
<br>
- Your team will be required to deduce the logic according to the output of your given inputs and write program to solve the problems.
<br>
<br>
- Your programs can be written in any language.
<br>
<br>
- The winner will be declared on the basis of number of questions solved.
<br>
<br>
- If number of questions solved is same, the winner will be the team who solves the problems in least amount of time.
<br>
<br>
- Team will have no access to cellphones. Taking help of any kind will result in immediate disqualification.
      </div>
<br>
<br>
      <Button v-if="startBool" text="START" @click.native="start" />
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button.vue'
import firebaseApp from '../firebaseConfig'
export default {
  name: 'home',
  components: {
    Button
  },
  data : function(){
      return {
        startBool:false
      }
  },
  methods:{
    start(){
      this.$router.push('questions')
    }
  },
  beforeMount(){
    firebaseApp.db.doc("admin/controls").onSnapshot(snapshot=>{
      this.startBool = snapshot.data().start
    })
  }
  
}
</script>
<style scoped>
.inst{
  text-align: left;
  font-size: 120%;
  /* font-family: sans-serif; */
}
.title{
    padding: 80px;
    background: #1d1d1d;
    width: 100%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    color: #A32A29;
    font-size: 70px;
}
.container{
    background: #1d1d1d;
    padding: 50px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>
