<template>
    <div class="container">
        <Options :question="currentQuestionObject"></Options>
    </div>
</template>

<script>
// @ is an alias to /src
import firebaseApp from '../firebaseConfig'
import Options from '../components/QuestionCard.vue'
export default {
    data : function(){
        return {
            userData : {},
            currentQuestionObject : {}
        }
    },
    beforeMount(){
        // Redirect to Home when the event is finished
        firebaseApp.db.doc('admin/controls').onSnapshot(snapshot=>{
            if(!snapshot.data().start){
                this.$router.push('finish')
            }
        })
        //Getting User Info
        let uid = localStorage.getItem('uid')
        firebaseApp.db.doc('users/'+uid).onSnapshot(snapshot=>{
            this.userData = snapshot.data()
            firebaseApp.db.doc('mainQuestions/'+ (this.userData['currentQuestion']-1)).onSnapshot(snapshot=>{
                this.currentQuestionObject = snapshot.data();
            })
        })
        //DUMMY VALUE
        // this.currentQuestionObject = {
        //     "type":"mcq",
        //     "number":1,
        //     "text":"Question Text",
        //     "imgUrl":"",
        //     "options":['option 1','Option 2','option 3','option 4'],
        // }
    },
    name: 'questions',
    components: {
        // ComicPanel,
        Options
    },
    methods:{

    }
  }

</script>
<style scoped>
.columns{
    background: #1d1d1d;
    padding: 50px;
}
.questionContainer {
    margin-top: -100px;
}
.title{
    padding: 60px;
    background: #1d1d1d;
    width: 100%;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    color: #A32A29;
    font-size: 70px;
}
.ladderImage{
    
}
</style>