/**
 * Chatper 8. 기능 이동
 */


/**
 * 8-1. 함수 옮기기
 * - 좋은 소프트웨어 설계의 핵심은 모듈화가 얼마나 잘 되어 있느냐를 뜻하는 모듈성(modularity) 이다.
 * - 모듈성이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력이다.
 * - 모듈성을 높이려면 서로 연관된 요소들을 함께 묶고, 요소 사이의 연결관계를 쉽게 찾고 이해할 수 있도록 해야 한다.
 */

/**
 * 8-2. 필드 옮기기
 * - 함수에 어떤 레코드를 넘길 때마다 또 다른 레코드의 필드도 함께 넘기고 있다면 데이터 위치를 옮겨야 한다.
 * - 함수에 항상 함께 건네지는 데이터 조각들은 상호 관계가 명확하게 드러나도록 한 레코드에 담는게 가장 좋다.
 * - 한 레코드를 변경하려 할 때, 다른 레코드의 필드까지 변경해야 한다면, 필드의 위치가 잘못되었다는 신호이다.
 */

class Customer{
    constructor(name, discountRate){
        this._name= name;
        this._discountRate= discountRate;
        this._contract= new CustomerContract(dateToday());
        this._setDiscountRate(discountRate);
    }

    get discountRate() {return this._contract.discountRate;}
    _setDiscountRate(aNumber) { this._contract.discountRate=aNumber;}
    becomePreferred(){
        this._discountRate+=0.03;
    }
    applyDiscount(amount){
        return amount.subtract(amount.multiply(this._discountRate));
    }
}

class CustomerContract{
    constructor(startDate, discountRate){
        this._startDate= startDate;
        this._discountRate=discountRate;
    }
    get discountRate() {return this.discountRate;}
    set discountRate(arg) {this._discountRate=arg;}
}

/**
 * 8-5. 인라인 코드를 함수 호출로 바꾸기
 */

// before refactoring
let applieToMass= false;
for (const s of states){
    if (s==="MA") appliesToMass=true;
}
// after refactoring
applieToMass=states.includes("MA");


/**
 * 8-6. 문장 슬라이드하기
 * - 하나의 데이터 구조를 이용하는 문장들은 한데 모여 있어야 좋다.
 */

// before refactoring
let result;
if(availableResources.length ==0){
    result = createResource();
    allocatedResources.push(result);
}
else{
    result = availableResources.pop();
    allocatedResources.push(reuslt);
}

//after refactoring
let _result;
if(availableResources.length ==0){
    _result = createResource();
}
else{
    _result = availableResources.pop();
}

allocatedResources.push(_result);

/**
 * 8-7. 반복문 쪼개기
 * - 각각의 반복문으로 분리하면, 수정할 동작 하나만 이해하면 된다.
 * - 반복문을 분리하면 사용하기도 쉬워진다. 한가지 값만 게산하는 반복문이라면, 그 값만 곧바로 반환할 수 있따.
 * - 반면 여러 일을 수행하는 반복문이라면 구조체를 반환하거나, 지역변수를 활용해야 한다.
 */

function totalSalary(){
    let totalSalary= 0;
    for (const p of people){
        totalSalary+= p.salary;
    }
}

function youngestAge(){
    let youngest = people[0] ? people[0].age : Infinity;
    for (const p of people){
        if(p.age<youngest) youngest= p.age;
    }
}

// 파이프라인으로 바꾸기
function totalSalary_(){
    return people.reduce((total, p)=> total+p.salary, 0);
}

function youngestAge_(){
    return Math.min(...people.map(p=>age));
}
