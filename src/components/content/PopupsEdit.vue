<template>
    <div>
        <div class="content">
            <div class="modal-header">
                <h4>编辑数据库信息</h4>
                <button @click="closepopup" class="close">X</button>
            </div>
            <div class="modal-content">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="类型：" prop="db_type_name">
                        <el-select v-model="form.db_type_name" placeholder="" @change="currStationChange">
                            <el-option label="Oracle" value="Oracle"></el-option>
                            <el-option label="MySQL" value="mysql"></el-option>
                            <el-option label="SqlServer" value="SqlServer"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="驱动名称：" prop="driver">
                        <el-input v-model="form.driver" :disabled="(this.form.db_type_name === 'mysql'||this.form.db_type_name == null)?this.show === 'mysql'|| this.show ==='':false"></el-input>
                    </el-form-item>
                    <el-form-item label="数据源名称：" prop="dsn">
                        <el-input v-model="form.dsn" :disabled="(this.form.db_type_name === 'mysql'||this.form.db_type_name == null)?this.show === 'mysql'|| this.show ==='':false"></el-input>
                    </el-form-item>
                    <el-form-item label="数据库名称：" prop="dbname">
                        <el-input v-model="form.dbname"></el-input>
                    </el-form-item>
                    <el-form-item label="IP：" prop="ip">
                        <el-input v-model="form.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="端口号：" prop="port">
                        <el-input v-model="form.port"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名：" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="info">
                        <el-input type="textarea" v-model="form.info"></el-input>
                    </el-form-item>
                    <el-form-item class="footer">
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="closepopup">关闭</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="over"></div>
    </div>
</template>

<script>
    import eventBus from "../../assets/js/eventBus";
    export default {
        name: "popupsEdit",
        data(){
            return {
                popup: 0,
                index: 0,
                show: '',
                form: {
                    id:'',
                    is_src:'',
                    db_type_name:'',
                    driver:'',
                    dsn:'',
                    dbname:'',
                    ip:'',
                    port:'',
                    username:'',
                    password:'',
                    info:'',
                },
            }
        },
        // props:{
        //     editItem: {
        //         type: Array,
        //         required: true,
        //         default: function () {
        //             return []
        //         }
        //     },
        // },
        created(){
            eventBus.$on("editData",data =>{
                console.log(data);
                if(data[0] == 1){
                    this.form = JSON.parse(JSON.stringify(data[1].dbconn_info.source))
                    this.form.id = data[1].id
                    this.form.is_src = 1
                }else if(data[0] == 0){
                    this.form = JSON.parse(JSON.stringify(data[1].dbconn_info.dest))
                    this.form.id = data[1].id
                    this.form.is_src = 0
                }
            })
        },
        methods:{
            closepopup(){
                this.$emit("closepopup",0)
                this.show = ''
            },
            onSubmit() {
                this.$emit("onSubmit",[0,this.form])
                this.show = ''
            },
            currStationChange(val){
                // console.log('currStationChange', val)
                this.show = val
            }
        },
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
