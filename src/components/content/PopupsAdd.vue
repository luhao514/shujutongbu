<template>
    <div>
        <div class="content">
            <div class="modal-header">
                <h4>添加项目</h4>
                <button @click="closepopup" class="close">X</button>
            </div>
            <div class="modal-content">
                <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                    <el-form-item label="项目名称：" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="info">
                        <el-input type="textarea" v-model="form.info"></el-input>
                    </el-form-item>
                    <el-form-item class="footer">
                        <el-button type="primary" @click="onSubmit">添加</el-button>
                        <el-button @click="closepopup">关闭</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="over"></div>
    </div>
</template>

<script>
    // import eventBus from "../assets/js/eventBus";
    export default {
        name: "popupsEdit",
        data(){
            return {
                index: 0,
                form: {
                    name:"",
                    info:""
                },
                rules: {
                    name: [{required: true, message: '请输入项目名称', trigger: 'blur'}],
                }
            }
        },
        created(){
            // eventBus.$on("editItem",data =>{
            //     console.log(data);
            //     this.disabled = data
            // })
        },
        methods:{
            closepopup(){
                this.$emit("closepopup",0)
                this.$refs.form.resetFields();
            },
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit("onSubmit",[0,this.form])
                    } else {
                        // console.log(this.form);
                        return false;
                    }
                    this.$refs.form.resetFields();
                })
            },
        }
    }
</script>

<style scoped>
    .el-input{
        width: 80%;
    }
    .el-select{
        width: 80%;
    }
    .el-textarea{
        width: 80%;
        min-height: 20%;
    }
    .el-button--primary{
        background: #4caf50;
        border-color: #38813b;
    }
    h4{
        font-size: 14px;
        margin: 0;
    }
    .close{
        padding: 1px;
        height: 22px;
        width: 22px;
    }
    .modal-header{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 15px;
        border-bottom: 1px solid #e5e5e5;
    }
    .footer{
        text-align: end;
        padding-top: 15px;
        border-top: 1px solid #e5e5e5;
        margin: 0;
    }
    .modal-content{
        padding-top: 15px;
    }
    .content {
        position: fixed;
        font-size: 24px;
        /*height: 60%;*/
        width: 40%;
        min-width: 300px;
        background-color: #fff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        padding: 15px 20px;
    }
    .over {
        position: fixed;
        width: 100%;
        height: 100%;
        opacity: 0.7;
        filter: alpha(opacity=70);
        top: 0;
        left: 0;
        z-index: 999;
        background-color: #111111;
    }
</style>
