var titulo = document.getElementById("titulo");
titulo.textContent = "Tabla de ingresos y egresos";
var dataRow = []
var tbodyRef = document
  .getElementById("tableBalance")
  .getElementsByTagName("tbody")[0];
var salida = 0
function createRow(tbodyRef, index, item, enter, out) {
  var newRow = tbodyRef.insertRow();
  var newCell0 = newRow.insertCell(0);
  var newCell1 = newRow.insertCell(1);
  var newCell2 = newRow.insertCell(2);
  var newCell3 = newRow.insertCell(3);
  newCell0.innerHTML = index;
  newCell1.innerHTML = item;
  newCell2.innerHTML = enter;
  newCell3.innerHTML = out;
}
function createRowData() {
    let item= prompt('Que item desea agregar??');
    let ingreso= parseInt(prompt('Coloque el monto de ingreso de este item'));
    let egreso= parseInt(prompt('Coloque el monto de egreso de este item'));
    let rowData = [item, ingreso, egreso]
    return rowData;
}
function calculateDataRow(dataRow,tbodyRef) {
  let i=1
  dataRow.forEach(data => createRow(tbodyRef, i++ , data[0], data[1], data[2]));
}

var i=1
do{
    dataRow.push(createRowData())
    salida= parseInt(prompt('Ingresa 1 si desea salir, cualquier tecla si desea agregar otro item'));
}while (salida!=1);
calculateDataRow(dataRow,tbodyRef)






