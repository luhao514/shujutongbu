<template>
    <div class="info">
        <router-view></router-view>
        <div class="head1">
            <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal">
                <img src="../assets/img/login-logo.png" alt="">
                <el-menu-item index="1"><a href="javascript:">任务详情</a></el-menu-item>
            </el-menu>
        </div>
        <el-card class="box1">
            <p><a style="text-decoration:underline;color: #303133" href="javascript:" @click="back">{{this.$route.query.name}}</a> > 任务</p>
            <div class="add">
                <a href="javascript:" @click="addTask">
                    <img src="../assets/img/index-add.png" alt="">
                    <span>添加任务</span>
                </a>
            </div>
        </el-card>
        <div class="content" v-for="i in items.length" :key="i">
            <info-card @editTask="editTask" @deleteTask="deleteTask" :item="items[i-1]" :project="project"></info-card>
        </div>
        <popups-edit-task v-slot:[value] v-show="popup" @onSubmit="onSubmitTask" @closepopup="closepopupTask">
            <h4>添加任务信息</h4>
        </popups-edit-task>
    </div>
</template>

<script>
    import infoCard from "@/components/content/taskCard";
    import PopupsEditTask from "@/components/content/PopupsEditTask";
    import {postFormAPI} from '/src/utils/api.js'
    export default {
        name: "Taskinfo",
        components:{
            infoCard,
            PopupsEditTask,
        },
        data(){
            return{
                project: this.$route.query.name,
                value:"",
                popup: 0,
                activeIndex: '1',
                initFrom:{
                    "token": this.$store.state.token,
                    "page": 1,
                    "rows": 100,
                    "sort": "name",
                    "dir": "ASC",
                    "project_id": this.$route.query.id
                },
                items:[],
                from:{},
                total:''
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            addTask(){
                this.value = "add"
                this.popup = 1;
            },
            editTask(){
                this.popup = 1;
            },
            deleteTask(data){
                this.from.token = this.initFrom.token
                this.from.ids = [parseInt(data)]
                this.getDeleteTask()
            },
            closepopupTask(data){
                this.popup = data;
                this.value = ""
            },
            onSubmitTask(data){
                this.popup = data[0];
                this.from = data[1];
                this.from.token = this.$store.state.token
                this.from.project_id = this.$route.query.id
                // console.log(this.from);
                if(this.value){
                    this.getAddTask()
                    this.value = ""
                }else {
                    this.getEditTask()
                }
            },
            getTaskList(){
                postFormAPI('getTaskList',this.initFrom).then(res => {
                    if(res.data.status === 0){
                        this.items = res.data.data
                        this.total = res.data.total
                        // console.log(this.items);
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
            getEditTask(){
                postFormAPI('editTask',this.from).then(res => {
                    this.from = {}
                    if(res.data.status === 0){
                        this.getTaskList()
                        this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
            getAddTask(){
                postFormAPI('addTask',this.from).then(res => {
                    this.from = {}
                    if(res.data.status === 0){
                        this.getTaskList()
                        this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
            getDeleteTask(){
                postFormAPI('deleteTask',this.from).then(res => {
                    this.from = {}
                    if(res.data.status === 0){
                        this.getTaskList()
                        // this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
        },
        created(){
            this.getTaskList()
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ html,.index{
        min-height: 968px;
        background: #f6f7f9;
    }
    .head1{
        box-sizing: border-box;
        width: 100%;
        height: 110px;
        img{
            position: absolute;
            left: 264px;
            top: 30px;
        }
        .el-menu{
            height: 100%;
            box-shadow: #e6e6e6 0 1px 0 0 ;//边框阴影
            padding-right: 360px;
        }
        .el-menu ::v-deep .el-menu-item{
            float: right;
            padding-top: 55px;
            height: 100%;
            font-family: "Noto Sans S Chinese";
            font-size: 18px;
            font-weight: bold;
        }
        .el-menu-item.is-active {
            color: #400ab9;
            span {
                color: #fff !important;
            }
        }
    }
    .box1{
        height: 86px;
        width: 1400px;
        border-radius: 20px;
        margin: 27px auto;
        position: relative;
        font-family: "Noto Sans S Chinese";
        .add{
            display: inline-block;
            margin-left: 90%;
            img{
                padding: 1.5px;
            }
            span{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 18px;
            }
        }
        p{
            font-size: 20px;
            display: inline-block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 15px;
        }
    }
</style>