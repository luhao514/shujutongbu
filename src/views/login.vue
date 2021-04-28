<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/img/login-logo.png" alt="">
            <span>数据库同步工具</span>
        </div>
        <div class="content">
            <div class="login-content">
                <form action="">
                    <el-form ref="loginForm" :model="loginForm" :rules="rules">
                        <el-form-item prop="na">
                            <el-input class="username" autocomplete="off" v-model="loginForm.na" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="pa">
                            <el-input class="password" @keyup.enter.native="Login" autocomplete="off" v-model="loginForm.pa" type="password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btns" type="primary" @click="Login">登录</el-button>
                        </el-form-item>
                    </el-form>
                </form>
            </div>
        </div>
        <div class="bottom"><p>Copyright © 2014-2021 深圳市德传技术有限公司</p></div>
    </div>
</template>
<script>
    import {postFormAPI} from '/src/utils/api.js'
    export default {
        name: 'login',
        components: {},
        data(){
            return{
                loginForm:{
                    na:'',
                    pa:'',
                },
                rules: {
                    na: [{required: true, message: ' ',trigger: 'blur'}],
                    pa: [{required: true, message: ' ',trigger: 'blur'}],
                }
            }
        },
        methods:{
            Login() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        const loading = this.$loading({
                            lock: true,
                            text: '登录中',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        postFormAPI('login',this.loginForm).then(res => {
                            console.log(res);
                            if(res.data.status === 0){
                                loading.close();
                                this.$refs.loginForm.resetFields();
                                this.$store.commit('getToken', res.data.data.token);
                                this.$router.replace('index');
                            }else {
                                console.log(res);
                                loading.close();
                                this.$refs.loginForm.resetFields();
                                this.$message.error(res.data.info)
                            }
                        }).catch(err => {
                            loading.close();
                            this.$refs.loginForm.resetFields();
                            console.log(err);
                        })
                    }else {
                        return false;
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .logo{
        box-sizing: border-box;
        width: 100%;
        height: 108px;
        img{
            position: absolute;
            /*left: 13.75%;*/
            /*top: 2.98%;*/
            left: 264px;
            top: 28px;
        }
        span{
            font-size: 26px;
            font-family: "Noto Sans S Chinese";
            color: rgba(0, 0, 0, 0.8);
            font-weight: bold;
            line-height: 0.692;
            position: absolute;
            /*left: 22.90%;*/
            /*top: 4.60%;*/
            left: 439.79px;
            top: 43.31px;
        }
    }
    .content{
        width: 100%;
        height: 763px;
        background: url("../assets/img/login-bg.png");
    }
    .login-content{
        box-sizing: border-box;
        height: 466px;
        width: 423px;
        background: #fff;
        border-radius: 22px;
        position: absolute;
        /*left: 62.86%;*/
        /*top: 24.78%;*/
        left: 1207px;
        top: 233px;
        .username ::v-deep .el-input__inner{
            /*font-family: "Noto Sans S Chinese";*/
            font-weight: normal;
            background:url(../assets/img/login-yonghu.png) no-repeat 10px center;
            background-size: 28px 28px;
            padding: 0 50px;
            width: 334px;
            height: 57px;
            border-radius: 28.5px;
            font-size: 20px;
            position: absolute;
            left: 45px;
            top: 80px;
        }
        .password ::v-deep .el-input__inner{
            /*font-family: "Noto Sans S Chinese";*/
            font-weight: normal;
            background:url(../assets/img/login-mima.png) no-repeat 10px center;
            background-size: 28px 28px;
            padding: 0 50px;
            width: 334px;
            height: 57px;
            border-radius: 28.5px;
            font-size: 20px;
            position: absolute;
            left: 45px;
            top: 100px;
        }
        .btns{
            font-family: "Noto Sans S Chinese";
            font-size: 20px;
            width: 334px;
            height: 57px;
            border-radius: 28.5px;
            position: absolute;
            left: 45px;
            top: 205px;
            background-image: linear-gradient(to right, #4c52b6 , #3795e6);
            border:0 solid red;
        }
    }
    .bottom{
        text-align: center;
        font-family: "Noto Sans S Chinese";
        font-size: 18px;
        position: absolute;
        left: 39.78%;
        margin-top: 44px;
    }
</style>
