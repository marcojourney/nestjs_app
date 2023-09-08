//Decorator
function logger(target: any) {
    console.log(`Creating an instance of ${target.name}`);
}

function logMethod(target: any, key: string, descriptor: PropertyDecorator) {
    console.log(`Calling ${key} method`);
}

function logProperty(target: any, key: string) {
    console.log(`Accessing ${key} property`);
}
//End decorator

//Generic
function identity<T>(arg: T): T {
    return arg;
}

//Enum
enum CarType {
    GAS = 'gas',
    EV = 'ev',
    HYBRID = 'hybrid'
}

//Tuple
let wheel: [string, string, string, string] = ['BBS', 'Rotiform', 'Enkei', 'Konig'];
let country: [number, string, boolean, string];

//Namespaces
namespace Order {
    export function getItems() {
        console.log('Get items execute');
    }
    export function getTotal() {
        console.log('Get total execute');
    }
    export function getDiscount() {
        console.log('Get discount execute');
    }
    export function getTax() {
        console.log('Get tax execute');
    }
}

//Condition Type
type IsString<T> = T extends string ? true : false;
let a: IsString<string> = true;
let b: IsString<number> = false;
const isNumber = (value: any) => typeof value == 'number';
console.log("A:", a);
console.log("B:", isNumber('12992'));

//Advance
//Intersection Types
type person = { id: number, gender: string, age: number };
type student = { major: string, university: string };
type PersonAndStudent = person & student;
let obj: PersonAndStudent = {id: 1, gender: 'Male', age: 12, major: 'MIT', university: 'RUPP'};
console.log('Advance Type:', obj);

//Union Types
let unionType: number | string | boolean = 'Hello';
console.log('Union Type:', unionType);

//Type Aliases
type Name = string;
let typeAlias: Name = 'Hello here is type aliases';
console.log("Type Alias:", typeAlias);

//keyof
type Keys = keyof {id: 1, name: 2, description: 'Hello World'};
const keys: Keys = "id";
console.log("Keys:", keys);

//In operator
let inOperator = { a: 1, b: 'hello'};
console.log("In Operator:", 'a' in inOperator);

//Immutable Types
const ErrorMessages = {
    InvalidEmail: "Invalid email",
    InvalidPassword: "Invalid password",
    // ...
} as const;
  
// This will throw an error
// ErrorMessages.InvalidEmail = "New error message";

//There are three levels of generics in 
/**
 * Type parameter: This is the most basic level of generics. 
 * Type parameters are used to define the type of a variable or function. 
 * For example, the following code defines a function that takes a generic type parameter T
 */
function genericFunction1<T>(value: T) {
    console.log("generic function 1 type:", typeof value);
    return value;
}
/**
 * Constraint: This is a level of generics that allows you to specify constraints on the type parameter. 
 * For example, the following code defines a function that takes a generic type parameter T and constrains it to be a number:
 */
function genericFunction2<T extends number>(value: T) {
    return value;
}

/**
 * Reified generics: This is the highest level of generics. 
 * Reified generics allow you to get the actual type of the generic parameter at runtime. 
 * For example, the following code defines a function that takes a generic type parameter T and returns the actual type of T
 */
function genericFunction3<T>(value: T): T {
    return value;
}

/**
* Here are some of the benefits of using generics in TypeScript:
Type safety: Generics help to ensure type safety in your code. This means that you can be sure that the types of your variables and functions are correct.
Code reuse: Generics allow you to reuse code. This can save you time and effort when you are developing your applications.
Flexibility: Generics allow you to be flexible in your code. This means that you can use generics to work with different types of data.
**/
//Example
const result1 = genericFunction1("Hello World");
const result2 = genericFunction1(999);
const result3 = genericFunction3("Hello World");
const result4 = genericFunction3(999);

// Primitive types
const number = 10; // number
const string = 'Hello, world!'; // string
const boolean = true; // boolean
// const undefined = undefined; // undefined
// const null = null; // null

// Object types
const person = {
    name: 'John Doe',
    age: 30,
}; // Object

// Union types
let age = 30; // number
age = 30; // string

// Intersection types
const product = {
    name: 'Book',
    price: 10,
}; // string & number
  
// Enum types
enum Color {
    Red,
    Green,
    Blue,
}

interface Engine {
    wheel: number;

    start(): void;
}

@logger
class GasEngine implements Engine {
    @logProperty
    wheel: number;

    start() {
        console.log('Start the engine using gasoline.');
    }
}

class ElectricEngine implements Engine {
    wheel: number;
    
    start(): void {
        console.log('Start the engine using electricity.');
    }

}

class WaterEngine implements Engine {
    wheel: number;

    start(): void {
        console.log('Start the engine using water');
    }

}

class DependencyInjectionContainer {
    private dependencies: Map<string, Function> = new Map();

    constructor() {
        this.dependencies.set(GasEngine.name, () => new GasEngine());
        this.dependencies.set(ElectricEngine.name, () => new ElectricEngine());
    }

    createDependency(type: string) {
        return this.dependencies.get(type)();
    }

    createEngine(type: string) {
      if (type === 'gas') {
        return new GasEngine();
      } else if (type === 'electric') {
        return new ElectricEngine();
      } else if (type == 'water') {
        return new WaterEngine();
      } else {
        throw new Error('Unknown engine type');
      }
    }
  }

class Car {
    private engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    startEngine() {
        this.engine.start();
    }
}

const container = new DependencyInjectionContainer();
const bmw: Car = new Car(container.createDependency(GasEngine.name));
bmw.startEngine();