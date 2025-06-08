// TypeScript

// Статическая типизация - типы проверяются на этапе компиляции, а не выполнения.

// Явная типизация:

let variable: number = 5;

// ВЫводимая типизация:

let variable2 = 5; // - TS сам выводит тип, нам не нужно самим его указывать. Но в дальнейшем, в переменную variable2 нельзя будет поместить другие типы, кроме number

// Структурная типизация:

type User = {
    firstName: string;
    Lastname: string;
}

// оба этих типа взаимозаменяемы

type Person = {
    firstName: string;
    Lastname: string;
}


// Объединение (union) Y | X (ИЛИ)

let data: number | string;
let color: 'red' | 'green';

type MainInfo = {
    firstName: string;
    lastname: string;
}

type AdditionalInfo = {
    age: number;
}

type FullInfo = AdditionalInfo | MainInfo;

const info0: FullInfo = {
    firstName: 'Maksim',
    lastname: 'Lvutin',
    age: 26
}

const info1: FullInfo = {
    firstName: 'Maksim',
    lastname: 'Lvutin'
}

const info2: FullInfo = {
    age: 26
}

// Пересечение (intersection) Y & X (И)

type FullInfo1 = AdditionalInfo & MainInfo;

const info3: FullInfo1 = {
    firstName: 'Maksim',
    lastname: 'Lvutin',
    age: 26
}

// Надтип (super type) и подтип (subtype)

type SuperType = {
    name: string;
}

type SubType = {
    name: string;
    age: number;
}

// Допустимо:

const subType: SubType = {name: 'Maksim', age: 26};
const superType: SuperType = subType;

// Недопустимо:

const superType1: SuperType = {name: 'Maksim'};
const subType1: SubType = superType1;


// тип any - отключает любую проверку типов, тем самым позволяя присвоить любой тип переменной.

let value: any;
value = 5;
value = {};
value = [];



// тип unknown - безопасный способ, когда мы не знаем какой тип ожидается на вход, сделать его неизвестным, а затем с помощью проверок, безопасно его обработать.

function logData(data: unknown) {

    let value33: string; 

    if (typeof data === 'string') {
        value33 = data;
    }

    if (Array.isArray(data)) {
        data;
    }
}

// unknown является супертипом всех других типов, но не является подтипом ни одного другого типа, кроме самого себя и типа any. То есть можно сделать следующее:

let value5: unknown;

value5 = 5;
value5 = [];

// но нельзя сделать так:

let value55: unknown;
let value555: string = value55;


// тип never - если какая-то функция не завершается нормально (например всегда возвращается ошибка), то она всегда возвращает тип never (или бесконечный цикл).
// также тип never является подтипом всех других типов, но не является супертипом.

// Допустимо:

let value33: never;
let valueString: string = value33;

// Недопустимо:

let str: string = '123';
let value99: never = str;

// Пример с Never:

enum Values {
    FIRST,
    SECOND
}

function fn(value: Values) {
    switch(value) {
        case Values.FIRST:
            return 1;
        case Values.SECOND:
            return 2;
        default:
            const exhaustiveCheck: never = value;
            return value    
    }
}

fn(Values.FIRST)
fn(Values.SECOND)

// тип void - означает, что функция ничего не возвращает.

function fn1(): void {
    console.log()
}

type Fn = (arg: number, arg2: string) => void;  // очень часто используемая конструкция.


// для описания объектов можно использовать interface или type

interface Address {
    city?: string;
    street?: string;  // ? - знак того, что ключ является опциональным. То есть может указываться при создании, а может и нет.
    coords: number[]
}

type User22 = {
    firstname: string;
    age?: number;
    adress: Address;
}

const user33: User22 = {
    adress: {
        coords: [5, 5]
    },
    firstname: 'Maksim'
}

type ComponentProps = {
    className: string;
    color: 'red' | 'green'
}

type ApiResponse<T> = {
    status: 'success' | 'error';
    data?: T;
}

type onClick = (event) => void;


//Литералы

type Color = 'red' | 'green' | 'blue';
type Size = 8 | 16;

const values = {
    color: 'green'
} as const;   // as const делает свойства объекта read-only (неизменяемыми)

function paint(color: Color) {

}

paint(values.color)

interface User1 {
    readonly id: string;
}

// Шаблонные литералы

type EventName = 'click' | 'change'

type EventHandler = `on$(EventName)`

type UserId = `user_id_$(string)`


// generic (обобщения)

interface MetaData {

}

interface User2 {
    username: string;
}

interface Article {
    title: string;
}

interface ApiResponses<T> {
    status?: 'error' | 'success';
    meta?: MetaData;
    requestId?: string;
    data: T;
}

const response: ApiResponses<User2> = {
    data: {
        username: 'Maksim'
    }
}

const responseFromArticle: ApiResponses<Article> = {
    data: {
        title: 'Bam'
    }
}


interface Tree<T> {
    id: string;
    value: T;
    children: Tree<T>[] | null;
}


const treeNode: Tree<User2> = {
    id: '10',
    value: {
        username: 'Instep'
    },
    children: [
        {
            id: '11',
            value: {
                username: 'Andruxa'
            },
            children: null
        }
    ]
}