function calculoPesoPlaneta(peso, planeta){
    let earthG = 9.9
    let neptuneG = 11.15
    let marsG = 3.71
    if (planeta.toLowerCase() == 'nepturno'){
        return ((parseInt(peso) / earthG) * neptuneG).toFixed(4)
    }else if((planeta.toLowerCase() == 'marte')){
        return ((parseInt(peso) / earthG) * marsG).toFixed(4)
    }
}
var peso= prompt('Coloca tu peso: (En KG)')
var textos = document.getElementsByTagName('h2');
textos[0].textContent = 'Tu peso en marte es ='+ calculoPesoPlaneta(peso, 'marte')
textos[1].textContent = 'Tu peso en nepturno es ='+ calculoPesoPlaneta(peso, 'nepturno')