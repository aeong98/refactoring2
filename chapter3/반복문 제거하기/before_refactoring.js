

function acquireData(input){
    const lines = input.split("/n"); // 컬렉션
    let firstLine = true;
    const result =[];
    for (const line of lines){
        if (firstLine){
            firstLine =false;
            continue;
        }
        if(line.trim() =="") continue;
        const record=line.split(",");
        if(record[i].trim()==="India"){
            result.push({city:record[0].trim(), phone: record[2].trim()});
        } 
    }
    return result;
}