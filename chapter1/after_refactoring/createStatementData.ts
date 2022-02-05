import {Performance, Invoice, Play} from './types';


class PerformanceCalculator{

    performance:Performance;
    play:Play;

    constructor(performance:Performance, play:Play){
        this.performance=performance;
        this.play=play;
    }

    get amount():number|null { // FIXME: 이런 오버라이딩 타입처리 어떻게?
        throw new Error("서브 클래스에서 처리하도록 설계되었습니다.");
    }

    get volumeCredits (){
        return Math.max(this.performance.audience -30, 0);
    }
}


function createPerformanceCalculator(performance:Performance, play:Play){
    switch(play.type){
        case "tragedy": return new TragedyCalculator(performance, play);
        case "comedy": return new ComedyCalculator(performance, play);
        default:
            throw new Error(`알 수 없는 장르 : ${play.type}`);
    }
}


class TragedyCalculator extends PerformanceCalculator{
    get amount(): number {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}
class ComedyCalculator extends PerformanceCalculator{
    get amount() : number{
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits(): number {
        return super.volumeCredits + Math.floor(this.performance.audience/5);
    }
}

export function createStatementData(invoice:Invoice, plays:{[id:string]:Play}) {
    const result={customer:"", performances: new Array <Performance>(), totalAmount:0, totalVolumeCredits:0};
    result.customer=invoice.customer;
    result.performances=invoice.performances.map(enrichPerformance);
    result.totalAmount=getTotalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;
    
    function enrichPerformance(performace:Performance){
        const calculator = createPerformanceCalculator(performace, playFor(performace));
        const result:Performance = Object.assign({}, performace);
        result.play=calculator.play;
        result.amount=calculator.amount;
        result.volumeCredits=calculator.volumeCredits;
        return result;
    }
    function playFor(performance:Performance){
        return plays[performance.playID];
    }
    function getTotalAmount (data:Invoice){
        let result = 0;
        for (let perf of data.performances) {
            result += perf.amount;
        }
        return result;
    }
    function totalVolumeCredits(data:Invoice){
        let result=0;
        for (let perf of data.performances){
            result+=perf.volumeCredits;
        }
        return result;
    }
}
