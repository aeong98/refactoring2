export interface Performance{
    playID:string,
    audience:number,
    play:Play,
    amount:number,
    volumeCredits:number,
}

export interface Invoice{
    customer:string,
    performances:Array<Performance>,
    totalAmount:number,
    totalVolumeCredits:number,
}

export interface Play{
    name:string,
    type:string,
}