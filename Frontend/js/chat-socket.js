const socket = io("http://localhost:3000")

const message = document.getElementById('message');
const messages = document.getElementById('messages');
var scoredata=0;
var fallofwickets=0;
var balls=0;
var over=0;
var key=0;
const score=document.getElementById("score");
score.textContent=0;
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumber() {

  balls++;
  if(balls>5){
    balls=0;
    over++;
    
  }
  var randomNumber = getRandomNumber(-1, 6);
  if(randomNumber==-1 ){
    fallofwickets++;
    if(fallofwickets==10 || over==20){
      clearInterval(handle)
    }
  }
  else{
  scoredata+=randomNumber;
  }

}

var handle=setInterval(generateRandomNumber, 3000);


const handleSubmitNewMessage = () => {
  
  
  key++;
  localStorage.setItem(key,'India-'+scoredata+'/'+fallofwickets+'\nAustralia- '+over+'.'+balls)
  socket.emit('message', { data:'India-'+scoredata+'/'+fallofwickets+'Australia- '+over+'.'+balls})
}

socket.on('message', ({ data }) => {
  handleNewMessage(data);
})

const handleNewMessage = (scoreboard) => {
  messages.appendChild(buildNewMessage(scoreboard));
}

const buildNewMessage = (displayscore) => {
  // const li = document.createElement("li");
  // li.appendChild(document.createTextNode(message))
  // li.textContent=message;
  // return li;
  
  const score=document.getElementById("score");
  score.textContent=displayscore;


}
setInterval(handleSubmitNewMessage, 3000);
