// 状态码
export const SUCCESS_CODE = 200
export const USERINFO_ERROR = 307   //未获取用户信息(sessionId)

export const APP_KEY= {
    account:   'cmp-account',
    console:   'cmp-console',
    openstack: 'cmp-openstack',
    ucloud:    'cmp-ucloud',
    vmware:    'cmp-vmware',
    charge:    'cmp-charge',
    operation: 'cmp-operation',
    quartz:    'cmp-quartz',
    monitor:   'cmp-monitor',
    itam:      'cmp-itam',
    log:       'cmp-log'
}

//session属性名
export const SESSION_URL = {
    account:   "account_url",
    console:   "console_url",
    openstack: "openstack_url",
    ucloud:    "ucloud_url",
    vmware:    "vmware_url",
    charge:    "charge_url"
}

//云平台类型
export const PLATFORM_TYPE = {
    OPENSTACK: '1',
    VMWARE:    '2',
    UCLOUD:   '3',
}

export const TIMESLOT_TYPE = {
    DAY:    '1',
    MONTH:  '2',
    YEAR:   '3',
}


export const MD_CONFIG = {
    "host_status":           "CD211000", //云主机状态
    "host_image_status":     "CD211100", //主机镜像状态
    "disk_status":           "CD211700", //云硬盘状态
    "disk_snapshot_status":  "CD211800", //硬盘快照状态
    "vpc_status":            "CD211300", //VPC状态
    "floatingIp_status":     "CD211200", //公网IP状态
    "firewall_status":       "CD211600", //防火墙状态
    "resource_type":         "CD101000", //资源类型
    "disk_type":             "CD102000", //云硬盘类型
    "icmp_type":             "CD080000"
    // "network_status":     "CD211400", //网络状态
    // "effective_status":      "CD101100", //有效状态
    // "platform_type":         "CD101200", //云平台类型
    // "platform_status":       "CD101300", //云平台状态
    // "pool_status":           "CD101400", //资源池状态
    // "poolnode_type":         "CD101500", //资源池节点类型
    // "poolnode_status":       "CD101600", //资源池节点状态
    // "network_type":          "CD101700", //网络类型
    // "image_type":            "CD101800", //云主机镜像分类
    // "consumer_type":         "CD202000", //消费类型
    // "errorWorkOrder_type":   "CD101900", //工单类型
    // "charging_item":         "CD106000", //计价类型
    // "notice_type":           "CD201000", //消息类型
    // "charge_record_type":    "CD203000", //交易类型
    // "quotaitam_type":        "CD105000", //配额项类型
    // "quota_apply_status":    "CD205200", //配额申请单状态
    // "template_status":       "CD205300", //工单模板状态
    // "error_order_status":    "CD205400", //故障工单状态
    // "resource_order_status": "CD205500", //资源工单状态
    // "order_status":          "CD205600", //订单状态
    // "relate_status":         "CD205700", //VDC关联状态
    // "vdc_status":            "CD205800", //VDC状态
    // "notice_status":         "CD205900", //消息通知状态
    // "ip_address_status":     "CD206000", //IP地址状态
    // "ip_pool_status":        "CD206100", //IP池状态
    // "user_status":           "CD502000", //用户状态
    // "org_status":            "CD502300", //机构状态
}
//发布状态
export const PUBLISH_STATUS = {
    no:1,
    yes:2
}
//用户信息
export const USER_INFO = "user"

//主机状态
export const HOST_STATUS = {
    ERROR:          { label: '错误', value: '0', className: 'text-error' },
    CREATING:       { label: '创建中', value: "1", className: 'text-creat' },
    STARTING:       { label: '启动中', value: "2", className: 'text-default' },
    RUNNING:        { label: '运行中', value: "3", className: 'text-running' },
    STOPPING:       { label: '关机中', value: "4", className: 'text-default' },
    STOPPED:        { label: '已关机', value: "5", className: 'text-default' },
    REBOOTING:      { label: '重启中', value: "6", className: 'text-default' },
    RECONFIGING:    { label: '配置变更中', value: "7", className: 'text-default' },
    RECONFIG_ERROR: { label: '配置变更失败', value: "8", className: 'text-default' },
    DELETEING:       { label: '删除中', value: "9", className: 'text-delete'},
    SUSPENDED:      { label: '挂起', value: "10", className: 'text-default' }
}
//主机镜像状态
export const HOST_IMAGE_STATUS = {
    ERROR:          { label: '错误', value: '0', className: 'text-error' },
    CREATING:       { label: '创建中', value: "1", className: 'text-default' },
    ACTIVE:         { label: '可用', value: "2", className: 'text-active' },
}
//硬盘状态
export const DISK_STATUS = {
    ERROR:          { label: '错误', value: '0', className: 'text-error' },
    CREATING:       { label: '创建中', value: "1", className: 'text-default' },
    ACTIVE:         { label: '可用', value: "2", className: 'text-active' },
    MOUNTING:       { label: '挂载中', value: "3", className: 'text-default' },
    MOUNTED:        { label: '已挂载', value: "4", className: 'text-default' },
    UNMOUNTING:     { label: '卸载中', value: "5", className: 'text-default' },
    EXTENDING:      { label: '扩容中', value: "6", className: 'text-default' },
    EXTEND_ERROR:   { label: '扩容失败', value: "7", className: 'text-default' },
    CLONING:        { label: '克隆中', value: "8", className: 'text-default' },
    RESTORING:      { label: '恢复中', value: "9", className: 'text-default' },
    RESTORE_ERROR:  { label: '恢复失败', value: "10", className: 'text-default' },
    DELETEING:      { label: '删除中', value: "11", className: 'text-delete' },
}

//云硬盘快照状态
export const DISK_SNAPSHOT_STATUS = {
    ERROR:          { label: '错误', value: '0', className: 'text-error' },
    CREATING:       { label: '创建中', value: "1", className: 'text-default' },
    ACTIVE:         { label: '可用', value: "2", className: 'text-active' },
    DELETEING:      { label: '删除中', value: "3", className: 'text-delete' }
}

// 安全组状态：暂无缓存数据
export const SECURITYGROUP_STATUS = {
    ERROR:          { label: '错误', value: '0', className: 'text-error' },
    CREATING:       { label: '创建中', value: "1", className: 'text-default' },
    ACTIVE:         { label: '可用', value: "2", className: 'text-active' }
}
//VPC状态
export const VPC_STATUS = {
    ERROR:          { label: '错误', value: '0', className: 'text-error' },
    CREATING:       { label: '创建中', value: "1", className: 'text-default' },
    PUBLISH:         { label: '已发布', value: "2", className: 'text-default' }
}
//防火墙状态
export const FIREWALL_STATUS = {
    ERROR:          { label: '错误', value: '0', className: 'text-error' },
    CREATING:       { label: '创建中', value: "1", className: 'text-default' },
    ACTIVE:         { label: '可用', value: "2", className: 'text-active' }
}

//公网IP状态
export const FLOATINGIP_STATUS = {
    ERROR:          { label: '错误', value: '0', className: 'text-error' },
    CREATING:       { label: '创建中', value: "1", className: 'text-default' },
    RECORDING:      { label: '备案中', value: "2", className: 'text-default' },
    ACTIVE:         { label: '可用', value: "3", className: 'text-active' },
    BOUND:          { label: '已绑定', value: "4", className: 'text-default' },
    FREEZE:         { label: '已冻结', value: "5", className: 'text-default' },
    EXTENDING:      { label: '扩容中', value: "6", className: 'text-default' },
    EXTEND_ERROR:   { label: '扩容失败', value: "7", className: 'text-default' }
}


//监控报警状态
export const MONITOR_ALARM_STATUS = {
    UNCONFIRMED: {label: '未确认', value: '1', className: 'text-error'},
    ISCONFIRMED: {label: '已确认', value: '0', className: 'text-active'}
}

//报警通知类型
export const DIC_ALARM_NOTIFY_TYPE = {
    EMAIL:  {label: '邮箱', value: '1'},
    WECHAT: {label: '微信', value: '2'},
    SMS:    {label: '短信', value: '3'}
}

//资产类型
export const Asset_Type = {
    COMPUTER_ROOM:'COMPUTER_ROOM',
    CABINET:'CABINET',
    SERVER_DEVICE:'SERVER_DEVICE',
    STORAGE_DEVICE:'STORAGE_DEVICE',
    NETWORK_DEVICE:'NETWORK_DEVICE',
    SECURITY_DEVICE:'SECURITY_DEVICE',
    PERIPHERAL_DEVICE:'PERIPHERAL_DEVICE',
    PHYSICAL_HOST:'PHYSICAL_HOST',
    HOST:'HOST',
    VDC:'VDC',
    VPC:'VPC',
    SUBNET:'SUBNET'
}