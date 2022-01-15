import { Invoice, PerformInfo, Play, PlayInfo } from './interfaces';

function statement(invoice: Invoice, plays: Play): string {
  let totalAmount: number = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다.
    result += `${playFor(perf.playID, plays).name}:${usd(
      calculator(perf, plays)
    )} (${perf.audience}석)\n`;
    totalAmount += calculator(perf, plays);
  }
  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${billingsFor(invoice, plays)}점\n`;
  return result;
}

// 인자에 perform: Performances를 넣을까 아니면 Invoice를 넣을까 고민하다가 Invoice를 넣었다.
// performances를 넣으면 범위를 최소화한다는 장점이 있지만, 타입이 너무 많아지는 것 같다는 생각이 들었다.
// 변수를 굳이 더 만들 이유가 없는 것 같아서 그냥 Invoice로 받아 쪼개기로 했다.
const billingsFor = (invoice: Invoice, plays: Play): number => {
  return invoice.performances
    .map((aPerf) => pointEarning(aPerf, plays))
    .reduce((add, cur) => add + cur);
};

const pointEarning = (aPerform: PerformInfo, plays: Play): number => {
  let result = Math.max(aPerform.audience - 30, 0);
  if ('comedy' === playFor(aPerform.playID, plays).type)
    result += Math.floor(aPerform.audience / 5);

  return result;
};

const calculator = (aPerf: PerformInfo, plays: Play): number => {
  let result: number;
  switch (playFor(aPerf.playID, plays).type) {
    case 'tragedy': // 비극
      result = 40000;
      if (aPerf.audience > 30) {
        result += 1000 * (aPerf.audience - 30);
      }
      break;
    case 'comedy': // 희극
      result = 30000;
      if (aPerf.audience > 20) {
        result += 10000 + 500 * (aPerf.audience - 20);
      }
      result += 300 * aPerf.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPerf.playID, plays).type}`);
  }
  return result;
};

// 중첩함수로 받으면 id를 생략할 수 있는데 그러면 함수끼리 의존성이 생기기 때문에
// id도 받는다. perf가 아닌 id를 받는 이유는 코드만 보고 playId로 play 객체를 찾는 것임을
// 명시해주기 위해서이다.
const playFor = (id: string, plays: Play): PlayInfo => {
  return plays[id];
};

// 리팩터링에서 중첩 함수를 사용하는 이유가 뭘까? Unit테스트 하기도 더 나쁜 것 같은데
const usd = (money: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(money / 100);
};

export { statement, usd, playFor, calculator, pointEarning };
