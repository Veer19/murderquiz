<template>
  <div class="home">
    <div class="container">
      <h1 class="title">Admin Panel</h1>
      <div v-if="!loggedIn">
            <input class="inputField" type="password" v-model="adminPass" placeholder="Password">
            <br>
            <br>
            <Button text="Login" @click.native="adminLogin" />
      </div>
    </div>
    
    <div v-if="loggedIn" class="container is-fluid">
        <input class="inputField" type="text" v-model="search" placeholder="Search">
        <br>
        <br>
        <div class="columns is-multiline">
            <div class="column userCard is-one-quarter" v-for="(user,index) in filterItems(users)" v-bind:key="user.name" >
                <div class="columns is-multiline" >
                    <div class="column is-two-thirds"><h1>{{index + 1}} : {{user.name}}</h1></div>
                    <div class="column"><h1>{{user.pointNumber}}</h1></div>
                </div>
                <br>
                <div class="columns is-multiline" v-for="question in Object.keys(user.questions)" v-bind:key="question">
                    <div class="column is-half"><h2>Question {{question}}</h2></div>
                    <div class="column">
                        <div class="roundButton" @click="updatePoints(user.uid,question)">{{ user.points[question+'l']?'-':'+' }}</div>
                    </div>
                    <div class="column">
                        <div class="roundButton" @click="updateQuestions(user.uid,question)">{{ user.questions[question]?'-':'+' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebaseConfig'
import Button from '@/components/Button.vue'
export default {
    name: 'admin',
    data : function(){
        return {
            adminPass:"",
            loggedIn:false,
            users : [],
            search:""
        }
    },
    components: {
        Button
    },
    methods:{
        adminLogin:function(){
            firebaseApp.auth.signInWithEmailAndPassword('admin@gmail.com',this.adminPass)
            .then(user=>{
                localStorage.setItem('adminLoggedIn',true)
                this.loggedIn = true;
            })
        },
        updatePoints:function(uid,qno){
            firebaseApp.db.doc("users/"+uid).get().then(snapshot=>{
                let points = snapshot.data().points
                points[qno+'l'] = !points[qno+'l']
                console.log(points)
                firebaseApp.db.doc("users/"+uid).update({
                    timestamp: Date.now(),
                    points:points
                })
            })
        },
        updateQuestions:function(uid,qno){
            firebaseApp.db.doc("users/"+uid).get().then(snapshot=>{
                let questions = snapshot.data().questions
                let points = snapshot.data().points
                points[qno+'c'] = !points[qno+'c']
                questions[qno] = !questions[qno]
                firebaseApp.db.doc("users/"+uid).update({
                    timestamp: Date.now(),
                    questions:questions,
                    points:points
                })
            })
        },
        filterItems: function(users) {
            var app = this;
            console.log("STUFF")
            return users.filter(function(user) {
                let regex = new RegExp('(' + app.search + ')', 'i');
                return user.name.match(regex);
            })
        },
    },
    beforeMount(){
        let scope = this;
        let data;
        let points = 0
        this.loggedIn = localStorage.getItem('adminLoggedIn')
        firebaseApp.db.collection("users").onSnapshot(snapshot=>{
            scope.users = []
            snapshot.forEach(function(doc) {
                data = doc.data()
                points = 0
                Object.keys(data.points).forEach(key=>{
                    if(data.points[key])
                    points = points + 50
                })
                data.pointNumber = points
                scope.users.push(data)
            });
            scope.users.sort(
            function(a, b) {          
                if (a.pointNumber === b.pointNumber) {
                    // Price is only important when cities are the same
                    return b.timestamp - a.timestamp;
                }
                return a.pointNumber > b.pointNumber ? 1 : -1;
            });
            scope.users = scope.users.reverse()
            console.log(scope.users)
            console.log("IGNORE")
            // let usersSplit = {
            //     0:[],
            //     50:[],
            //     100:[],
            //     150:[],
            //     200:[],
            //     250:[],
            //     300:[],
            //     350:[],
            //     400:[],
            //     450:[],
            //     500:[],
            //     550:[],
            //     600:[]
            // }
            // let arr = []
            // for(let j=0;j<users.length;j++){
            //     for(let i=0;i<600;i=i+50){   
            //         if(users[j].pointNumber == i){
            //             usersSplit[i].push(users[j])
            //         }
                    
            //     }
            // }
            // console.log("SPLIT")
            // console.log(usersSplit)
            // let finalUsers = []
            // Object.keys(usersSplit).forEach(userGroupKey=>{
            //     if(usersSplit[userGroupKey].length!=0){
            //         usersSplit[userGroupKey].sort(function(a, b) {
            //             return a['timestamp'] - b['timestamp'];
            //         });
            //         //TRY REVERSING AND SEE WHAT WORKS
            //         console.log(usersSplit[userGroupKey])
            //         finalUsers.concat(usersSplit[userGroupKey])
            //     }
            // })
            // scope.users = finalUsers;
            // console.log(scope.users)
            // users.forEach(user=>{

            // })
        })
    }


}
</script>
<style scoped>
.userCard{
    margin: 5px;
    background: #1d1d1d;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    padding: 50px;
    text-align: left;
}
.roundButton {
    font-size: 250%;
    border-radius: 50%;
    background: black;
    padding: 20px;
    display: inline-block;
    cursor: pointer;
    line-height: 16px;
}
.userCard h1 {
    color: #A32A29;
    font-size: 40px;
}
.userCard h2 {
    font-size: 30px;
}
.title{
    padding: 80px;
    background: #1d1d1d;
    width: 100%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    color: #A32A29;
    font-size: 40px;
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
  width: 400px;
}
.container{
    padding: 50px;
}
</style>
