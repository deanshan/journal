<template>
    <el-row type="flex" justify="center" class="h100">
        <el-col :span='24'>
            <div class="login">
                <el-form
                    class="loginForm"
                    ref="loginForm"
                    status-icon
                    label-width="100px"
                    :model="loginForm"
                    :rules="rules"
                    :inline-message="true"
                >
                    <el-form-item label="用户名" prop="username">
                        <!-- FIXME:给组件添加事件监听，必须加.native，相当于把组件变成原生HTML，否则监听事件无效 -->
                        <el-input
                            v-model.number="loginForm.username"
                            autocomplete="on"
                            @keyup.enter.native="login('loginForm')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="loginForm.password"
                            autocomplete="off"
                            @keyup.enter.native="login('loginForm')"
                        ></el-input>
                    </el-form-item>

                    <el-form-item>
                        <router-link :to="{path: '/register'}">注册</router-link>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="login('loginForm')" style="width: 60%">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>

</template>

<script>

import { mapMutations } from 'vuex'
import md5 from '@/utils/md5.js'

export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                password: '',
                username: ''
            },
            rule: {}
        }
    },
    computed: {
        rules() {
            return {
                username: [
                    {
                        validator: (rule, value, callback) => {

                            return value ? callback() : callback(new Error('用户名输入不正确'))
                        },
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        validator: (rule, value, callback) => {
                            return value ? callback() : callback(new Error('密码输入不正确'))
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        ...mapMutations(['SET_TOKEN']),
        getUserInfo( {username, password }) {

            username = md5.MD5(username + md5.MD5_SUFFIX);
            password = md5.MD5(password + md5.MD5_SUFFIX);

            this.$https
                .post('/server/admin/login/user', { username, password })
                .then(({ token }) => {
                    // 请求成功，获取返回的token值
                    token && this.SET_TOKEN({ token })
                    // this.$router.push({ path: '/cartogram/star'})
                    this.$router.push({ path: '/pleasure/music'})
                })
        },
        login(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getUserInfo(this.loginForm)
                } else {
                    return false
                }
            })
        }
    }
  }
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .loginForm {
        width: 30%;
    }
}
</style>

<style scoped>
.el-input {
    width: 60%;
}
</style>
