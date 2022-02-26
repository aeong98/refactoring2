/**
 * 7-2. 컬렉션 캡슐화하기
 */


class Person{
    constructor(name){
        this._name=name;
        this._courses=[];
    }

    get course() {return this.courses.slice()};
    addCourse(aCourse) {
        this._courses.push(aCourse);
    }
    removeCourse(aCourse, fnIfAbsent =() => {throw new RangeError();}) {
        const index=this._courses.indexOf(aCourse);
        if (index ===-1) fnIfAbsent();
        else this._courses.splice(index,1);
    }
}

// 클라이으언트
for (const name of readBasicCourseNames(filename)){
    aPerson.addCourse(new Course(name, false));
}

 
/**
 * 7-3. 기본형을 객체로 바꾸기
 */

class Priority{
    constructor(value){
        if (value instanceof Priority) return value;
        if (Priority.legalValues().includes(value)){
            this._value=value;
        }
        else{
            throw new Error(`<${value}> 는 유효하지 않은 우선수위입니다.`);
        }
    }
    toString() {return this.value;}
    get _index() {return Priority.legalValues().findIndex(s=>s===this._value);}
    static legalValues() {return ['low','normal','high','rush']};
    equals(other) {return this._index === other.index;}
    higherThan(other){return this._index > other._index;}
    lowerThan(other){return this._index<other._index;}
}
// before refactoring
orders.filter(o=> "high" === o.priority
            || "rush" === o.priority);

// after refactoring
orders.filter ( o=>o.priority.higherThan(new Priority("normal")))

// 출력 이상의 기능이 필요해지는 순간 그 데이터를 표현하는 전용 클래스를 정의


/**
 * 7-4. 임시 변수를 질의 함수로 바꾸기
 */

// 변수 대신 함수로 만들어두면, 비슷한 계산을 수행하는 다른 함수에서도 사용할 수 있다.

class Order {
    constructor (quantity, item){
        this._quantity=quantity;
        this._item=item;
    }

    get discountFactor(){
        var discountFactor= 0.98;
        if(basePrice > 1000) discountFactor -=0.03;
        return discountFactor;
    }

    get price(){
        return this.basePrice * this.discountFactor;
    }
}

/**
 * 7-5. 클래스 추출하기
 */

// 메서드와 데이터가 너무 많은 클래스는 이해하기가 쉽지 않으니 잘 살펴보고, 적절히 분리하는 것이 좋다.
// 특히 일부 데이터와 메서드를 따로 묶을 수 있다면 어서 분리하라는 신호이다.
// 함께 변경되는 일이 많거나, 서로 의존하는 데이터들도 분리한다.

/**
 * 7-6. 클래스 인라인하기
 */

// 클래스 추출하기를 거꾸로 돌리는 리팩토링
// 더 이상 제 역할을 못 해서 그대로 두면 안 되는 클래스는 인라인해버린다.
// 역할을 옮기는 리팩토링을 하고나니 특정 클래스에 남은 역할이 거의 없을 때 이런 현상이 자주 생긴다.

/**
 * 7-7. 위임 숨기기
 */

// 위임 객체의 인터페이스가 바뀌면, 이 인터페이스를 사용하는 모든 클라이언트가 모든 코드를 수정해야 한다.
// 이러한 의존성을 없애려면, 서버 자체에 위임 메소드를 만들어서 위임 객체의 존재를 숨기면 된다.

// before refactoring 
const manager=aPerson.department.manager;

// after refactoring
const manager2= aPerson.manager;
class Person2{
    get manager(){return this.department.manager}
}

/**
 * 7-8. 중개자 제거하기
 */

// 클라이언트가 위임 객체의 또 다른 기능을 사용하고 싶을 때는, 그냥 위임 객체를 직접 호출하는게 나을 수 도 있다.

/**
 * 7-9. 알고리즘 교체하기
 */

function foundPerson(people){
    for (let i=0; i<people.length ; i++){
        if (people[i]==="Don"){
            return "Don";
        }
        if (people[i]==="John"){
            return "John"
        }
        if(people[i]==="Kent"){
            return "Kent";
        }
    }
    return "";
}

function refactor_foundPerson(people){
    const candidates=["Don", "John", "Kent"];
    return people.find(p=>candidates.includes(p)) || "" ;
}