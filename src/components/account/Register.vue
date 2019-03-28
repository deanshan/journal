<template>
    <el-form
        :model="registerForm"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="register"
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
            <el-input v-model="registerForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="详细住址" prop="region">
            <el-select v-model="registerForm.region" placeholder="省级地区">
                <el-option label="上海" value="sh"></el-option>
                <el-option label="北京" value="bj"></el-option>
            </el-select>
            <el-select v-model="registerForm.region" placeholder="市级地区">
                <el-option label="广州" value="gz"></el-option>
                <el-option label="深圳" value="sz"></el-option>
            </el-select>
            <el-select v-model="registerForm.region" placeholder="区级地区">
                <el-option label="湖南" value="hn"></el-option>
                <el-option label="湖北" value="hb"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
            <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="registerForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="registerForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="registerForm.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="registerForm.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="registerForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">立即创建</el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
//   :rules="[
//   {required: true, message: '必填项', trigger: 'change'},
//   {type: 'number', message: '必须为数字值', trigger: 'blur'},
//   {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
// ]
export default {
    data() {
        return {
            registerForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [{
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
                region: [{
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
                type: [{
                    type: 'array',
                    required: true,
                    message: '请至少选择一个活动性质',
                    trigger: 'change'
                }],
                resource: [{
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
