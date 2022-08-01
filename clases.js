//const Rectangulo = class R {} // expresion de clases
// const Rectangulo = class {}  <-- expresion de clases esto tambien funciona
//const r = new Rectangulo();

class Rectangulo{}; // Clases declaradas con Class no tienen hoisting

function Cuadrado(){} // <- util hoisting. mas una clase que funcion

// console.log(Cuadrado,Rectangulo);

const r = new Rectangulo();

class Chancho {
    popiedad = "mi propiedad"
    #hambre;
    static estatico = 42
    constructor(estado = 'infeliz', hambre = false){
       this.estado = estado;
       this.#hambre = hambre;
    }
    hablar() {
        console.log(`soy un chancho ${this.estado} ${this.#hambre ? 'con mucha hambre!' : 'satisfecho'}`)
    }
    static comer() {
        console.log(this.estatico, 'estoy comiendo!')
    }
}


const feliz = new Chancho('feliz');
Chancho.comer();
console.log();
//feliz.hablar();
const triste = new Chancho('triste');
//triste.hablar();
const nose = new Chancho();
nose.hablar();

