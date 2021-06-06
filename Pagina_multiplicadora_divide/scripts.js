

function recoreLista(textos, numero, funcion){
    let maxTabla = textos.length
    for(let i=0; i<maxTabla; i++){
        funcion(textos[i], numero, i)
    }
}

const multiplicacion = (texto, numeroMultiplicar, indice) => texto.textContent = numeroMultiplicar + ' X '+(indice+1)+' = '+ (numeroMultiplicar*(indice+1));
const dividir = (texto, numeroDividir, indice) => texto.textContent = numeroDividir + ' ÷ '+(indice+1)+' = '+ (numeroDividir/(indice+1));
const suma = (texto, numeroSuma, indice) => texto.textContent = numeroSuma + ' + '+(indice+1)+' = '+ (numeroSuma+(indice+1));

var numero= parseInt(prompt('Ingrese un numero para ver su tabla de multiplicar'))
var titulo = document.getElementsByClassName('titulo')
titulo[0].textContent = 'Tabla de Multiplicar del numero = '+numero
titulo[1].textContent = 'Tabla de Dividir del numero = '+numero
titulo[2].textContent = 'Tabla de Sumar del numero = '+numero
var texto_suma = document.getElementsByClassName('tabla_suma')
var texto_dividir = document.getElementsByClassName('tabla_dividir')
var texto_multiplicar = document.getElementsByClassName('tabla_multiplar')

recoreLista(texto_multiplicar,numero , multiplicacion)
recoreLista(texto_dividir,numero , dividir)
recoreLista(texto_suma,numero , suma)

import { exec } from 'child_process';

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  let { stdout } = await sh('ls');
  for (let line of stdout.split('\n')) {
    console.log(`ls: ${line}`);
  }
}

main();