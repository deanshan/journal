import * as CONSTANT from './constant.js'

let getClassName = (resourceName, status) => {
    for(let key in resourceName) {
        if(resourceName[key]['value'] === status) {
            return resourceName[key]['className']
        }
    }
}
//返回平台地址
export const getPlatformUrl = (type) => {
    let url = ''
    switch (type) {
        case CONSTANT.PLATFORM_TYPE.OPENSTACK:
            url = sessionStorage.getItem(CONSTANT.APP_KEY.openstack)
            break;
        case CONSTANT.PLATFORM_TYPE.UCLOUD:
            url = sessionStorage.getItem(CONSTANT.APP_KEY.ucloud)
            break;
        case CONSTANT.PLATFORM_TYPE.VMWARE:
            url = sessionStorage.getItem(CONSTANT.APP_KEY.vmware)
            break;
    }
    return url
}
// 返回资源状态的className
export const getStatusStyle = (resourceName, status) => {
    let className = ''
    switch(resourceName) {
        case 'HOST_STATUS':
            className = getClassName(CONSTANT.HOST_STATUS, status)
            break;
        case 'HOST_IMAGE_STATUS':
            className = getClassName(CONSTANT.HOST_IMAGE_STATUS, status)
            break;
        case 'DISK_STATUS':
            className = getClassName(CONSTANT.DISK_STATUS, status)
            break;
        case 'DISK_SNAPSHOT_STATUS':
            className = getClassName(CONSTANT.DISK_SNAPSHOT_STATUS, status)
            break;
        case 'SECURITYGROUP_STATUS':
            className = getClassName(CONSTANT.SECURITYGROUP_STATUS, status)
            break;
        case 'VPC_STATUS':
            className = getClassName(CONSTANT.VPC_STATUS, status)
            break;
        case 'FIREWALL_STATUS':
            className = getClassName(CONSTANT.FIREWALL_STATUS, status)
            break;
        case 'FLOATINGIP_STATUS':
            className = getClassName(CONSTANT.FLOATINGIP_STATUS, status)
            break;
        case 'MONITOR_ALARM_STATUS':
            className = getClassName(CONSTANT.MONITOR_ALARM_STATUS, status)
            break;
    }
    return className
}

export const conversionTimeSlotType = (type) =>{
    let timeSlotTypeName = ''
    switch (type) {
        case CONSTANT.TIMESLOT_TYPE.DAY:
            timeSlotTypeName = '按天'
            break;
        case CONSTANT.TIMESLOT_TYPE.MONTH:
            timeSlotTypeName = '包月'
            break;
        case CONSTANT.TIMESLOT_TYPE.YEAR:
            timeSlotTypeName = '包年'
            break;
    }
    return timeSlotTypeName
}

// 通过key值获取缓存中的value
export const conversionType = (cachedata, key) => {

    let content = '--'

    let data = JSON.parse(sessionStorage.getItem(cachedata))

    if(data) {

        for(let item of Object.values(data)) {

            if(item['key'] === key) {

                content = item['value']

            }
        }
    } else {

        for(let item of Object.values(cachedata)) {

            if(item['value'] === key) {

                content = item['label']

            }
        }
    }
    return content
}

//通过硬盘类型获取缓存中的name
export const getDiskTypeName = (diskType) => {
    let diskTypeList = JSON.parse(sessionStorage.getItem('disk_type'))
    for(let i in diskTypeList){
        if(diskTypeList[i]['key'] == diskType){
            return diskTypeList[i]['value']
        }
    }
}

//校验名称
export const validatorName = (rule,value,callback) => {
    const REGNAME = /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/
    if(!REGNAME.test(value)){
        return callback(new Error('只能输入中文、大/小写字母、数字、中划线、下划线'))
    }else{
        return callback()
    }
}
//校验手机号
export const validatorMobbile = (rule,value,callback) => {
    const MOBBILE = /^1(3[0-9]|4[579]|5[0-3,5-9]|66|7[1235678]|8[0-9]|9[89])\d{8}$/
    if(!MOBBILE.test(value)){
        return callback(new Error('请输入正确的11位手机号码'))
    }else{
        return callback()
    }
}

// 校验邮箱
export const validatorEmail = (rule,value,callback) => {
    const REGEMAIL = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
    if(!REGEMAIL.test(value)){
        return callback(new Error('请输入正确的邮箱地址'))
    }else{
        return callback()
    }
}