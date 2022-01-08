import { Invoice, Play, PlayInfo } from './interfaces';

function statement(invoice: Invoice, plays: Play): string {
  let totalAmount: number = 0;
  let volumeCredits: number = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    let thisAmount = 0;

    switch (playFor(perf.playID, plays).type) {
      case 'tragedy': // 비극
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy': // 희극
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(perf.playID, plays).type}`);
    }

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === playFor(perf.playID, plays).type)
      volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `${playFor(perf.playID, plays).name}:${usd(thisAmount)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

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

export { statement, usd, playFor };
