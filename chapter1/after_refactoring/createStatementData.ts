import {Performance, Invoice, Play} from './types';

export function createStatementData(invoice:Invoice, plays:{[id:string]:Play}) {
    const statementData={customer:"", performances: new Array <Performance>(), totalAmount:0, totalVolumeCredits:0};
    statementData.customer=invoice.customer;
    statementData.performances=invoice.performances.map(enrichPerformance);
    statementData.totalAmount=getTotalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    
    function enrichPerformance(performace:Performance){
        const result:any = Object.assign({}, performace);
        result.play=playFor(result);
        result.amount=amountFor(result);
        result.volumeCredits=volumeCreditsFor(result);
        return result;
    }
    function playFor(performance:Performance){
        return plays[performance.playID];
    }
    function amountFor(performance:Performance){
      // 변수 명확한 이름으로 변경
        let result=0;
        
        switch (performance.play.type) {
            case 'tragedy': // 비극
            result = 40000;
            if (performance.audience > 30) {
                result += 1000 * (performance.audience - 30);
            }
            break;
            case 'comedy': // 희극
            result = 30000;
            if (performance.audience > 20) {
                result += 10000 + 500 * (performance.audience - 20);
            }
            result += 300 * performance.audience;
            break;
            default:
            throw new Error(`알 수 없는 장르: ${performance.play.type}`);
        }
        return result;
    }
    function volumeCreditsFor(perfomance:Performance){
        let volumeCredits=0;
        volumeCredits+=Math.max(perfomance.audience -30, 0);
        if ('comedy' ===(perfomance.play.type)){
        volumeCredits += Math.floor(perfomance.audience / 5);
        }
    return volumeCredits;
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
    return statementData;
  }