
nameInput = document.getElementById("nameInput")
itemInputMain = document.getElementById("buttonSendDataMain")
var titulo = document.getElementById("titulo_init");
var subtitulo = document.getElementById("subtitulo_init");
titulo.textContent = "Tabla de ingresos y egresos";
//Recopilo la data del main
function getDataUser(e){
    nameInput = document.getElementById("nameInput")
    nameUser = nameInput.value
    if(nameUser.length>2){
      let personId = Math.floor(Math.random() * 10001);
      let person = new Person(personId,nameUser )
      console.log(person)
      sessionStorage.setItem("user", JSON.stringify(person));
      itemInputMain.href="main.html"
    }

   
  }
itemInputMain.addEventListener("click", getDataUser)