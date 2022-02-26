// 조건문 리팩토링

updateSensorType = () => {
    this.state.equipmentList
    // undefined 인 원소 예외처리 
    .map(equipment=>equipment.sensorTypeList==undefined ? hideEquipment(equipment.equipmentId):'')
    // undefined 삭제 (필터링)
    .filter(equipment=>equipment.sensorTypeList!==undefined)
    // 나머지 원소들 로직 처리
    .map((equipment)=>{
        // if-else 문 삼항연산자로 변경
        (this.state.sensorType=="all" || equipment.sensorTypeList.includes(this.state.sensorType)) 
        ?  showEquipment(equipment.equipmentId) 
        : hideEquipment(equipment.equipmentId);
    })
    updateSensorType(this.state.sensorType);
}

// 함수 추출하기 

showEquipment=(id)=>{
    $(`.equipment-status-${equipment.equipmentId}`).show();
}

hideEquipment=(id)=>{
    $(`.equipment-status-${equipment.equipmentId}`).hide();
}

updateSensorType=(sensorType)=>{
    this.statusByCard.updateSensorType(sensorType);
    this.statusByMap.updateSensorType(sensorType); 
}