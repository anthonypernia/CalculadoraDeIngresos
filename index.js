
var nameInput = "#nameInput";
var buttonSendData = '#buttonSendDataMain';
var buttonOpenDataMainUserRegistered = '#buttonOpenDataMainUserRegistered';
var buttonSendDataMainUserRegistered = '#buttonSendDataMainUserRegistered'
var formInputDataUserRegistered = '#formInputDataUserRegistered';
var nameInputUserRegistered = '#nameInputUserRegistered';
var passwordInputUserRegistered = '#passwordInputUserRegistered';
var subtituloInit = '#subtituloInit';
var titulo = "#titulo_init";
var URLJSON = "data/users.json";
var users = null;
$(titulo).text("Calculadora de gastos personales");


function defineSubtitle(){
  initText = 'Ingrese su nombre si es usuario nuevo'
  subtitle = $(subtituloInit).text()
  if (subtitle == initText){
    $(subtituloInit).text("Ingrese usuario y contraseña")
  }else{
    $(subtituloInit).text(initText)
  }
}

//Recopilo la data del main
function getDataUser(e){
    nameUser = $(nameInput).val()
    if(nameUser.length>3){
      let personId = Math.floor(Math.random() * 10001);
      let person = new Person(personId,nameUser )
      
      sessionStorage.setItem("user", JSON.stringify(person));
      location.href = "main.html";
    }
    else{
      $('.alert').fadeIn();
      
    }
  }
  //obtengo el json con datos por si quieren ingresar con usuario registrado
  function getJsonFromData(){
    $.getJSON(URLJSON, function(response, state){
      if (state == "success"){
        
        users = response;
      }
    })
  }


$( document ).ready(function() {
  $(buttonSendData).fadeIn()
  $(nameInput).fadeIn()
  $(titulo).fadeIn()
  getJsonFromData()
  defineSubtitle()
});


$(buttonSendData).on('click', () => {
  getDataUser()

});

$(buttonOpenDataMainUserRegistered).on('click', () => {
  $(buttonSendData).toggle()
  $(nameInput).toggle()
  $(titulo).toggle()
  $(buttonSendDataMainUserRegistered).toggle()
  $(formInputDataUserRegistered).toggle()
  defineSubtitle()
});

$(buttonSendDataMainUserRegistered).on('click', () => {
  let name = $(nameInputUserRegistered).val()
  let password  = $(passwordInputUserRegistered).val()
  
  
  users.forEach(element => {
    
    if((name == element.name) && (password == element.password)){      
      sessionStorage.setItem("user", JSON.stringify(element));
      location.href = "main.html";
    }else{
      console.log('no reconoce')
    }
  });
});

$(nameInput).keyup(function(){
  
  if(($(nameInput).val().length==0) || ($(nameInput).val().length>=4) ){
    $(nameInput).css("background-color", "white");
    $('.alert').fadeOut();
  }else{
    $(nameInput).css("background-color", "#FAD2E1");
    
  }
});