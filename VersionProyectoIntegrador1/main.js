var titulo = document.getElementById("titulo_calculadora");
var subtitulo = document.getElementById("subtitulo_calculadora");
titulo.textContent = "Tabla de ingresos y egresos";
var person = null;
var divTable = document.getElementById("divTables");

tbodyRef = document
  .getElementById("tableBalance")
  .getElementsByTagName("tbody")[0];

formInput = document.getElementById("formInputData");
itemInput = document.getElementById("itemInput");
incomeInput = document.getElementById("incomeInput");
expenseInput = document.getElementById("expenseInput");

function createRow(tbodyRef, expense) {
  var newRow = tbodyRef.insertRow();
  var newCell0 = newRow.insertCell(0);
  var newCell1 = newRow.insertCell(1);
  var newCell2 = newRow.insertCell(2);
  var newCell3 = newRow.insertCell(3);
  newCell0.innerHTML = "Id-" + expense.id;
  newCell1.innerHTML = expense.item;
  newCell2.innerHTML = expense.income + "$";
  newCell3.innerHTML = expense.expense + "$";
}

function insertDataFromUser(e) {
  let expense = new Expense(
    Math.floor(Math.random() * 10001),
    itemInput.value,
    incomeInput.value,
    expenseInput.value
  );
  person.addExpense(expense);
  sessionStorage.setItem("user", JSON.stringify(person));
}

function updateRows() {
  tbodyRef.innerHTML = "";
  person.expensesList.forEach((e) => {
    createRow(tbodyRef, e);
  });
  updateResult();
}
function updateResult() {
  let incomeAll = 0;
  let expenseAll = 0;
  let items = 0;
  person.expensesList.forEach((e) => {
    incomeAll += parseFloat(e.income);
    expenseAll += parseFloat(e.expense);
    items += 1;
  });

  if (personJson.expensesList.length > 1) {
    let tableResult = document.createElement("table")
    if (incomeAll>expenseAll){
      var color1 = "#caf7e3"
      var color2 = "#edffec"
    }else{
      var color1 = "#e4bad4"
      var color2 = "#f6dfeb"
    }
    tableResult.className="table"
    tableResult.style='background-color:'+color1+'; margin-top:40px;'
    tableResult.innerHTML = 
    '<thead class="titleRow" style="background-color:'+color2+';"> \
        <tr> \
          <th scope="col">Cantidad de Items totales</th> \
          <th scope="col">Ingresos totales</th> \
          <th scope="col">Egresos totales</th> \
        </tr> \
    </thead> \
    <tbody class="itemsRow" style="background-color:'+color2+';"> \
      <tr> \
        <td  >'+items+' Items</td> \
        <td>'+incomeAll+'$</td> \
        <td>'+expenseAll+'$</td> \
      </tr> \
    </tbody>'
    
    divTable.appendChild(tableResult)
  }
}

function obtainDataFromInit() {
  console.log("reload");
  personJson = JSON.parse(sessionStorage.getItem("user"));
  if(personJson!=null){
    person = new Person(personJson.id, personJson.name);

    if (personJson.expensesList.length != 0) {
      personJson.expensesList.forEach((e) => {
        person.addExpense(new Expense(e.id, e.item, e.income, e.expense));
      });
    }
    subtitulo.textContent = "Buen dia " + person.name + "!!";
    updateRows();
  }else{
    alert("Carga un usuario!")
    window.location.href = "index.html";
  }

}

document.addEventListener("DOMContentLoaded", obtainDataFromInit);

formInput.addEventListener("submit", insertDataFromUser);
