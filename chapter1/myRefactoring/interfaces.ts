interface PerformInfo {
  playID: string;
  audience: number;
}

interface Invoice {
  customer: string;
  performances: PerformInfo[];
}

interface PlayInfo {
  name: string;
  type: string;
}

// 이걸 Play의 키 값으로 배정해서 키를 제한할 순 없을까?
enum PlayList {
  Hamlet = 'hamlet',
  AsLike = 'as-like',
  Othello = 'othello',
}

interface Play {
  [playName: string]: PlayInfo;
}

export { Invoice, Play };
