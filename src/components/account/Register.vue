<template>
    <el-row type="flex" justify="center" class="register">
        <el-col :span=12>
            <el-form
                :model="registerForm"
                :rules="rules"
                ref="registerForm"
                label-width="100px"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                    <el-input type="password" v-model="registerForm.checkPassword"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="tel">
                    <!-- FIXME:v-model.number让input值转为number类型 -->
                    <el-input type='tel' v-model.number="registerForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="registerForm.email"></el-input>
                </el-form-item>
                <el-form-item label="详细住址" required>
                    <el-row type="flex" justify="space-between">
                        <el-col :span="7">
                            <el-form-item prop="region1">
                                <el-select v-model="registerForm.region1" placeholder="省级地区">
                                    <el-option label="上海" value="sh"></el-option>
                                    <el-option label="北京" value="bj"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item prop="region2">
                                <el-select v-model="registerForm.region2" placeholder="市级地区">
                                    <el-option label="广州" value="gz"></el-option>
                                    <el-option label="深圳" value="sz"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item prop="region3">
                                <el-select v-model="registerForm.region3" placeholder="区级地区">
                                    <el-option label="湖南" value="hn"></el-option>
                                    <el-option label="湖北" value="hb"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="注册时间" required>
                    <el-row type="flex" justify="space-between">
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="registerForm.date2" style="width: 100%;"></el-time-picker>
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
                <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="registerForm.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="registerForm.desc"></el-input>
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
//   :rules="[
//   {required: true, message: '必填项', trigger: 'change'},
//   {type: 'number', message: '必须为数字值', trigger: 'blur'},
//   {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
// ]
export default {
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            registerForm: {
                username: '',
                password: '',
                checkPassword: '',
                tel: '',
                email: '',
                region1: '',
                region2: '',
                region3: '',
                date1: '',
                date2: '',
                delivery: false,
                hobby: [],
                sex: '',
                desc: ''
            },
            rules: {
                username: [{
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                checkPassword: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ],
                tel:[
                    {required: true, message: '必填项', trigger: 'blur'},
                    {type: 'number', message: '必须为数字值', trigger: 'blur'},
                    {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
                ],
                email:[
                    {required: true, message: '必填项', trigger: 'blur'}
                ],
                region1: [{
                    required: true,
                    message: '请选择活动区域',
                    trigger: 'change'
                }],
                region2: [{
                    required: true,
                    message: '请选择活动区域',
                    trigger: 'change'
                }],
                region3: [{
                    required: true,
                    message: '请选择活动区域',
                    trigger: 'change'
                }],
                date1: [{
                    type: 'date',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }],
                date2: [{
                    type: 'date',
                    required: true,
                    message: '请选择时间',
                    trigger: 'change'
                }],
                hobby: [{
                    type: 'array',
                    required: true,
                    message: '请至少选择一个活动性质',
                    trigger: 'change'
                }],
                sex: [{
                    required: true,
                    message: '请选择活动资源',
                    trigger: 'change'
                }],
                desc: [{
                    required: true,
                    message: '请填写活动形式',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
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
}
</style>

<style scoped>
.el-form-item {
    /* margin-bottom: 5px; */
}
</style>
