var titulo = "#title_main"
var subtitulo = document.getElementById("subtitle_main");
var subtitulo = "#subtitle_main"
$(titulo).text("Tabla de ingresos y egresos");
var person = null;
var divTable = document.getElementById("divTables");
var buttonBack = document.getElementById("buttonBack");
var modalItems = document.getElementById("modalItems");
tbodyRef = document
  .getElementById("tableBalance")
  .getElementsByTagName("tbody")[0];

formInput = document.getElementById("formInputData");
itemInput = document.getElementById("itemInput");
incomeInput = document.getElementById("incomeInput");
expenseInput = document.getElementById("expenseInput");
itemCountInput = document.getElementById("itemCountInput");

//inserto los datos ordenados en la tabla
function createRow(tbodyRef, expense) {
  var newRow = tbodyRef.insertRow();
  var newCell0 = newRow.insertCell(0);
  var newCell1 = newRow.insertCell(1);
  var newCell2 = newRow.insertCell(2);
  var newCell3 = newRow.insertCell(3);
  var newCell4 = newRow.insertCell(4);
  newCell0.innerHTML = "Id-" + expense.id;
  newCell1.innerHTML = expense.item;
  newCell2.innerHTML = expense.count;
  if(expense.count>1){
    $('#tableBalance').DataTable();
    if(expense.income>0 && expense.expense==0){
      newCell3.innerHTML = "$" + expense.income + " ($"+ expense.income * expense.count+") " ;
      newCell4.innerHTML = "$" + expense.expense;

    }else if(expense.expense>0 && expense.income==0){
      newCell3.innerHTML = "$" + expense.income;
      newCell4.innerHTML = "$" + expense.expense+ " ($"+ expense.expense * expense.expense+") ";

    }else{
      newCell3.innerHTML = "$" + expense.income + " ($"+ expense.income * expense.count+") " ;
      newCell4.innerHTML = "$" + expense.expense+ " ($"+ expense.expense * expense.expense+") ";
    }

  }else{
    newCell3.innerHTML = "$" + expense.income;
    newCell4.innerHTML = "$" + expense.expense;
  }

}
//aca actualizo e ingreso el gasto que carga el usuario a mano, al objeto persona, como objeto expense
//a cada uno le agrego un id que queda guardado.
//si no lo agrega, se setea un 0, o un "no definido"
function insertDataFromUser(e) {
  if (itemCountInput.value.length == 0) {
    itemCountInput.value = 1;
  }
  if (incomeInput.value.length > 0 || expenseInput.value.length > 0) {
    if (incomeInput.value.length == 0) {
      incomeInput.value = 0;
    }
    if (expenseInput.value.length == 0) {
      expenseInput.value = 0;
    }
    if (itemInput.value.length == 0) {
      itemInput.value = "No definido";
    }

    let expense = new Expense(
      Math.floor(Math.random() * 10001),
      itemInput.value,
      itemCountInput.value,
      incomeInput.value,
      expenseInput.value
    );
    person.addExpense(expense);
    sessionStorage.setItem("user", JSON.stringify(person));
  }
}
//veo la lista de gastos del usuario y la recorro y imprimo en la tabla superior
function updateRows() {
  tbodyRef.innerHTML = "";
  person.expensesList.forEach((e) => {
    createRow(tbodyRef, e);
  });
  updateResult();
}

//aca se crea las lnieas finales donde estan las cantidades sumadas
function updateResult() {
  let incomeAll = 0;
  let expenseAll = 0;
  let items = 0;
  person.expensesList.forEach((e) => {
    incomeAll += parseFloat(e.income) * parseInt(e.count);
    expenseAll += parseFloat(e.expense) * parseInt(e.count);
    items += 1 * parseInt(e.count);
  });

  if (personJson.expensesList.length > 1) {
    let tableResult = document.createElement("table");
    if (incomeAll > expenseAll) {
      var color1 = "#67B99A";
      var color2 = "#99E2B4";
    } else if (incomeAll == expenseAll) {
      var color1 = "#FCF45D";
      var color2 = "#FCF6BD";
    } else {
      var color1 = "#FF0A54";
      var color2 = "#FAE0E4";
    }
    ///generamos el html final que se pondra rojo, verde o amarillo
    tableResult.className = "table";
    tableResult.style = "margin-top:50px;";
    tableResult.innerHTML =
      '<thead class="titleRow" style="background-color:' +
      color1 +
      ';"> \
        <tr> \
          <th scope="col">Cantidad de Items totales</th> \
          <th scope="col">Ingresos totales</th> \
          <th scope="col">Egresos totales</th> \
        </tr> \
    </thead> \
    <tbody class="itemsRow" style="background-color:' +
      color2 +
      ';"> \
      <tr> \
        <td  data-toggle="modal" data-target=".bd-modal-sm" >' +
      items +
      " Items</td> \
        <td>" +
      incomeAll +
      "$</td> \
        <td>" +
      expenseAll +
      "$</td> \
      </tr> \
    </tbody>";
    divTable.appendChild(tableResult);
    updateModal(personJson.expensesList);
  }
}

function updateModal(expensesList) {

  let tableTotalItems = document.createElement("table");
  headerTable = '<thead class="titleRow"> \
    <tr> \
      <th scope="col">Items</th>  \
      <th scope="col">Cantidad</th> \
    </tr> \
</thead> '
row = "";
expensesList.forEach((e) => {
  row+=
  '<tbody class="itemsRow"> \
  <tr> \
    <td >' + e.item +"</td> \
    <td>" + e.count + "</td> \
  </tr> \
</tbody>";
});
tableTotalItems.innerHTML = headerTable + row
  modalItems.appendChild(tableTotalItems);

}

//esta funcion es la que se activa al inicio, llama al objeto creado anteriormente
function obtainDataFromInit() {
  personJson = JSON.parse(sessionStorage.getItem("user"));
  console.log(personJson)
  if (personJson != null) {
    person = new Person(personJson.id, personJson.name);

    if (personJson.expensesList.length != 0) {
      personJson.expensesList.forEach((e) => {
        person.addExpense(
          new Expense(e.id, e.item, e.count, e.income, e.expense)
        );
      });
    }
    $(subtitulo).text("Buen dia " + person.name + "!!");
    console.log(personJson)
    updateRows();
    $('#tableBalance').DataTable();
  } else {
    alert("Carga un usuario!");
    window.location.href = "index.html";
  }
}
//funcion que se activa al apretar boton de delete all
function backAndDelete() {
  sessionStorage.clear();
  window.location.href = "index.html";
}


$(document).ready(obtainDataFromInit());

$("#buttonBack").on("click", () => {
  $('#buttonBack').fadeOut("slow");
  $('#buttonBack').fadeIn("slow");
  $('#buttonBack').hide();
  $('#divTables').hide();
  backAndDelete();

});
$("#formInputData").on("submit", () => {
  $('#formInputData').fadeOut("slow");
  $('#formInputData').fadeIn("slow");
  insertDataFromUser();
});




