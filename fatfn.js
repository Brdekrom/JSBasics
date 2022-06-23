//funciones que se declaran con la palabra reservada con function. podemos utilizarlos como clases

function Fn() {
    this.prop = 'propiedad'
    return 'chanchito feliz'
}

Fn.prototype.lala = function FuncionDePrototipo() { }

const r = new Fn();

//console.log(r.__proto__);

//
//fat arrow function.
console.log(this);
const fatFn = () => { // NO TIENEN CONTEXTO DE THIS!!!
    this.prop = 'lala'
    // console.log(this)

}

const r1 = fatFn();
console.log(this)