<template>
    <el-row type="flex" justify="center" class="register">
        <el-col :span="12">
            <el-form
                :model="registerForm"
                :rules="rules"
                ref="registerForm"
                label-width="100px"
                :inline-message="true"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registerForm.username" class="width-50"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerForm.password" class="width-50"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="registerForm.checkPassword" class="width-50"></el-input>
                </el-form-item>

                <!-- FIXME:v-model.number让input值转为number类型 -->
                <el-form-item label="手机号码" prop="tel">
                    <el-input type='tel' v-model.number="registerForm.tel" class="width-50"></el-input>
                </el-form-item>

                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="registerForm.email" class="width-50"></el-input>
                </el-form-item>

                <el-form-item label="详细住址">
                    <el-row type="flex" justify="space-between" class="width-50">
                        <el-col :span="7">
                            <el-form-item prop="province">
                                <el-select v-model="registerForm.province" placeholder="省级地区" @change="getCity()">
                                    <el-option
                                        v-for="(item, key) in province"
                                        :key="key"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item prop="city">
                                <el-select v-model="registerForm.city" placeholder="市级地区" @change="getCounty()">
                                    <el-option
                                        v-for="(item, key) in city"
                                        :key="key"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item prop="county">
                                <el-select v-model="registerForm.county" placeholder="区级地区">
                                    <el-option
                                        v-for="(item, key) in county"
                                        :key="key"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="注册时间" required>
                    <el-row type="flex" justify="space-between" class="width-50">
                        <el-col :span="11">
                            <el-form-item prop="date">
                                <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.date" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="time">
                                <el-time-picker placeholder="选择时间" v-model="registerForm.time" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="registerForm.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="兴趣爱好" prop="hobby">
                    <el-checkbox-group v-model="registerForm.hobby">
                        <el-checkbox label="跑步" name="hobby"></el-checkbox>
                        <el-checkbox label="游泳" name="hobby"></el-checkbox>
                        <el-checkbox label="足球" name="hobby"></el-checkbox>
                        <el-checkbox label="打游戏" name="hobby"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="register('registerForm')">注册</el-button>
                    <el-button @click="reset('registerForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import md5 from '@/utils/md5.js'
export default {
    data() {
        return {
            province: [
                { label: '上海市', value: 'shanghai',
                    city: [
                        { label: '闵行区', value: 'minghang',
                            county: [
                                { label: '江月镇', value: 'jiangyue', },
                                { label: '浦江镇', value: 'pujiang', },
                                { label: '西渡', value: 'xidu', }
                            ]
                        }
                    ]
                },
                { label: '安徽省', value: 'anhui',
                    city: [
                        { label: '合肥市', value: 'hefei',
                            county: [
                                { label: '瑶海区', value: 'yaohai', },
                                { label: '包河区', value: 'baohe', },
                                { label: '蜀山区', value: 'shushan', }
                            ]
                        }
                    ]
                }
            ],
            city: [],
            county: [],
            registerForm: {
                username: '',
                password: '',
                checkPassword: '',
                tel: '',
                email: '',
                province: '',
                city: '',
                county: '',
                date: '',
                time: '',
                hobby: [],
                sex: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { pattern: /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/, message: '最长14个英文或7个汉字', trigger: 'blur'}
                ],
                password: [
                    { required: true, validator: this.validPassword, trigger: 'blur' }
                ],
                checkPassword: [
                    { required: true, validator: this.validCheckPassword, trigger: 'blur' }
                ],
                tel:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { type: 'number', message: '必须为数字值', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                email:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确邮箱', trigger: 'blur' }
                ],
                // province: [
                //     { required: true, message: '请选择省级地区', trigger: 'change' },
                //     { validator: this.getCity, trigger: 'change' }
                // ],
                // city: [
                //     { required: true, message: '请选择市级地区', trigger: 'change' },
                //     { validator: this.getCity, trigger: 'change' }
                // ],
                // county: [
                //     { required: true, message: '请选择区级地区', trigger: 'change' }
                // ],
                date: [
                    { type: 'date',  message: '请选择日期', trigger: 'change' }
                ],
                time: [
                    { type: 'date',  message: '请选择时间', trigger: 'change' }
                ],
                hobby: [
                    { type: 'array',  message: '请至少选择一个兴趣爱好', trigger: 'change' }
                ],
                sex: [
                    {  message: '请选择性别', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 自定义密码验证
        validPassword(rule, value, callback) {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.registerForm.checkPassword !== '') {
                    this.$refs.registerForm.validateField('checkPassword')
                }
                callback()
            }
        },
        validCheckPassword(rule, value, callback) {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        },

        getCity() {

            for(let item of Object.values(this.province)) {
                if(item.value === this.registerForm.province) {
                    this.city = item.city
                    break;
                }
            }
            this.registerForm.city = this.city[0].value
            this.getCounty()

        },
        getCounty() {
            for(let item of Object.values(this.city)) {
                if(item.value === this.registerForm.city) {
                    this.county = item.county
                    break;
                }
            }
            this.registerForm.county = this.county[0].value
        },
        registerUserInfo(userInfo) {
            let data = {}
            for(let [key, value] of Object.entries(userInfo)) {
                if(key === 'username' || key === 'password' || key === 'checkPassword') {

                    data[key] = md5.MD5(value + md5.MD5_SUFFIX)
                } else {
                    data[key] = value
                }
            }
            this.$https
                .post('/server/admin/register/userinfo', { userInfo: data })
                .then(res => {
                    this.$message({ message: '注册成功' })
                    if(res.code === 200) {
                        this.$router.push({ path: '/login' })
                    }
                })
        },
        register(formName) {
            this.$refs[formName].validate((valid) => {

                if (valid) {
                    this.registerUserInfo(this.registerForm)
                } else {
                    return false;
                }
            });
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
    margin-top: 20px;
    .width-50 {
        width: 70%;
    }
}
</style>
