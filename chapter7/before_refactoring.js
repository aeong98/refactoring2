updateSensorType = () => {
    if(this.state.sensorType=="all"){
        this.state.equipmentList.map((equipment)=>{
            $(`.equipment-status-${equipment.equipmentId}`).show();
        })
    }
    else{
        this.state.equipmentList.map((equipment)=>{
            if(equipment.sensorTypeList==undefined){
                $(`.equipment-status-${equipment.equipmentId}`).hide();
            }
            else if(equipment.sensorTypeList.includes(this.state.sensorType)){
                $(`.equipment-status-${equipment.equipmentId}`).show();
            }
            else{
                $(`.equipment-status-${equipment.equipmentId}`).hide();
            }
        })
    }
    this.statusByCard.updateSensorType(this.state.sensorType);
    this.statusByMap.updateSensorType(this.state.sensorType);
}
