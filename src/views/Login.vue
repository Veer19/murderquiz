<template class='background'>
<div class="columns">
  <div class="column">
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <Button class="button" @click.native="login" text="Login"></Button>
  </div>
  
</div>

</template>
<script>
import Button from '@/components/Button.vue'
import firebase from 'firebase'
import firebaseApp from '../firebaseConfig'
export default {
  name: 'login',
  components: {
    Button
  },
  methods:{
    login(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebaseApp.auth.signInWithPopup(provider)
      .then(snapshot=>{
        let user = snapshot.user
        localStorage.setItem('uid',user.uid)
        return firebaseApp.db.doc("users/"+user.uid).get()
        .then(doc => {
          if(!doc.exists){
            return firebaseApp.db.doc("users/"+ user.uid).set({
              name : user.displayName,
              currentQuestion: 0,
              points : 200,
              uid:user.uid,
              sidePaths: 0,
              atSidePath : false,
              loadSecondPart:false
            })
          }
        })
      })
      .then(()=>{
          this.$router.push('home')
      })
    }
  }
}

</script>
<style scoped>
.columns {
  height: 100vh;
  width: 100vw;
  margin: 0;
  background: url('../assets/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>
