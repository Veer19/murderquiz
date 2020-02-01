<template>
    <div>
        <div class="columns">
            <div class="column is-one-third sidepanel" v-if='currentQuestionObject.ans_type == "mcq"'>
                <Description :heading="'Question '+currentQuestionObject.number" :text="currentQuestionObject.text"></Description>
                <Options :question="currentQuestionObject"></Options>
            </div>
            <div class="column is-one-third sidepanel" v-if='currentQuestionObject.ans_type == "input"'>
                <Description :heading="'Question '+currentQuestionObject.number" :text="currentQuestionObject.text"></Description>
                <div class="submit" v-on:click="skip()">Submit</div>
            </div>
            <div class="column is-two-thirds">
                <ComicImage :name="currentImage" style="width:100%;"/>
            </div>
        </div>
        
    </div>
</template>

<script>
// @ is an alias to /src
import firebaseApp from '../firebaseConfig'
import Options from '../components/Options.vue'
import ComicImage from '../components/ComicImage.vue'
import Description from '../components/Description.vue'
export default {
    data : function(){
        return {
            userData : {},
            currentQuestionObject : {},
            currentImage:""
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
            
            if(this.userData.atSidePath){
                let part = 1
                if(this.userData.loadSecondPart){
                    part = 2
                }
                let sideQuestionNumber = this.userData.sidePaths
                console.log(sideQuestionNumber)
                this.loadSideQuestions(sideQuestionNumber,part);
            }
            else {
                let questionNumber = this.userData['currentQuestion'];
                this.loadMainQuestions(questionNumber);
            }        
        })
        // DUMMY VALUE
        // this.currentQuestionObject = {
        //     "type":"mcq",
        //     "number":1,
        //     "text":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        //     "imgUrl":"",
        //     "options":['option 1','option 2','option 3','option 4'],
        //     "correct":"option 2"
        // }
    },
    name: 'questions',
    components: {
        ComicImage,
        Options,
        Description
    },
    methods:{
        skip(){
        let uid = localStorage.getItem('uid')
        firebaseApp.db.doc('users/'+uid).update({
            "currentQuestion":firebase.firestore.FieldValue.increment(1),
            // "points": firebase.firestore.FieldValue.increment(10),
            "loadSecondPart":false,
            "atSidePath":false
          })
        },
        loadMainQuestions(questionNumber){
            console.log(questionNumber);
            firebaseApp.db.doc('questions/'+ questionNumber).onSnapshot(snapshot=>{
                this.currentQuestionObject = snapshot.data();
                console.log(this.currentQuestionObject.correct)
                if(this.currentQuestionObject.image != "404")
                    this.currentImage = this.currentQuestionObject.image;
            })
        },
        loadSideQuestions(sideQuestionNumber,part){
            console.log("Load Side Questions Set Number " + sideQuestionNumber + "Part" + part)
            console.log("OUT")
            firebaseApp.db.doc('side_questions/'+ sideQuestionNumber).onSnapshot(snapshot=>{
                console.log("IN")
                console.log(snapshot.data())
                this.currentQuestionObject = snapshot.data()[part];
                console.log(this.currentQuestionObject.correct)
                if(this.currentQuestionObject.image != "404")
                    this.currentImage = this.currentQuestionObject.image;
            })
            // this.currentQuestionObject = {}
        }
    }
  }

</script>
<style scoped>
.sidepanel{
    background: #1d1d1d;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    height: 100vh;
    
    padding: 100px 20px;
    box-sizing: border-box;
    overflow: scroll;
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
.submit{
    padding: 10px;
    background:#A32A29;
    color: white;
}
</style>