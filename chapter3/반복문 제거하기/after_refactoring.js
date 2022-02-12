function acquireData(input){
    const lines = input.split("/n"); // 컬렉션

    const result = lines                                                                    // 1. 컬렉션을 가르키는 별도 변수를 새로 만든다 (루프 변수)
                    .slice  (1)                                                             // 2. 첫줄을 건너뛰는 연산을 slice() 연산으로 대체
                    .filter (line=>line.trim() !="")                                        // 3. 빈줄을 지우는 연산을 filter() 연산으로 대체
                    .map    (line=>line.split(","))                                         // 4. 여러줄짜리 CSV 데이터를 문자열 배열로 변환
                    .filter (record=>record[1].trim()==="India")                            // 5. filter() 연산을 톹ㅇ해 인도에 위치한 사무실 레코드를 뽑아낸다.
                    .map    (record => ({city: record[0].trim(), phone: record[2].trim()})) //6. map()을 사용해 결과 레코드 생성
                    ;
            
    return result;
}


