
nameInput = document.getElementById("nameInput")
itemInputMain = document.getElementById("itemInputMain")

function getDataUser(e){
    //e.preventDefault()
    nameInput = document.getElementById("nameInput")
    nameUser = nameInput.value
    let personId = Math.floor(Math.random() * 10001);
    let person = new Person(personId,nameUser )
    console.log(person)

    sessionStorage.setItem("user", JSON.stringify(person));
  }
itemInputMain.addEventListener("click", getDataUser)