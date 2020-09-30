const firebaseConfig = {
  apiKey: "AIzaSyA4oxe55fphhAoCe18gZ2TcK5nWKUM0jAs",
  authDomain: "teste-chat-300bf.firebaseapp.com",
  databaseURL: "https://teste-chat-300bf.firebaseio.com",
  projectId: "teste-chat-300bf",
  storageBucket: "teste-chat-300bf.appspot.com",
  messagingSenderId: "636832643047",
  appId: "1:636832643047:web:a8021e31858a5fef532f42",
  measurementId: "G-X1XWSMCDYR"
};firebase.initializeApp(firebaseConfig)





var banco = firebase.firestore()
var localizacao = banco.collection("teste").doc("site")
var divFundo = document.querySelector('#div1')
var nome = undefined





while(nome == undefined){
  nome = prompt(`Informe seu nome!\nCaso não queira clique em ok com o um nome alerorio sera gerado`)
}
while(nome == ''){
  nome = 'user' + Math.floor(Math.random()*1000)
}





function buttonClick(){
  var input = document.querySelector('#input1').value
  enviarDados(input)
  document.querySelector('#input1').value = ''
}





function enviarDados(input){
  localizacao.update({
    dados: firebase.firestore.FieldValue.arrayUnion(`${nome}: ${escapeHtml(input)}`)
  })
}





divFundo.innerHTML = 'carregando...'

localizacao.onSnapshot(function(dados){ 
  
  divFundo.innerHTML = ''
  
  var mensagens = dados.data().dados
  let quantidadeDados = mensagens.length
  
  for(let linha = 0; linha < quantidadeDados; linha++){
    let paragrafo = document.createElement('div')
    paragrafo.innerHTML =`<div class="fundoTextoPost"><p class="textoPost">${mensagens[linha]}</p></div>`
    divFundo.appendChild(paragrafo)
  }
  
})

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

