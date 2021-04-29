<template>
    <div class="list">
        <div class="head1">
            <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal">
                <img src="../assets/img/login-logo.png" alt="">
                <el-menu-item index="1"><a href="javascript:">字段详情</a></el-menu-item>
            </el-menu>
        </div>
        <el-card class="box1">
            <p><a style="text-decoration:underline;color: #303133" href="javascript:" @click="back(-2)"> {{this.$route.query.projectName}} </a> > <a style="text-decoration:underline;color: #303133" href="javascript:" @click="back(-1)"> {{this.$route.query.taskName}} </a> > 字段</p>
            <div class="add">
                <a href="javascript:" @click="addList">
                    <img src="../assets/img/index-add.png" alt="">
                    <span>添加字段</span>
                </a>
            </div>
        </el-card>
        <list-card :items="items" @editList="editList" @deleteList="deleteList"></list-card>
        <popups-edit-list v-slot:[value] v-show="popup" @onSubmit="onSubmitList" @closepopup="closepopupList">
            <h4>添加字段信息</h4>
        </popups-edit-list>
    </div>
</template>

<script>
    import listCard from "@/components/content/listCard";
    import PopupsEditList from "@/components/content/PopupsEditList";
    import {postFormAPI} from "@/utils/api";
    export default {
        name: "list",
        components:{
            listCard,
            PopupsEditList
        },
        data(){
            return{
                value:"",
                popup: 0,
                activeIndex: '1',
                initFrom:{
                    "token": this.$store.state.token,
                    "page": 1,
                    "rows": 100,
                    "sort": "id",
                    "dir": "ASC",
                    "task_id": this.$route.query.id
                },
                items:[],
                from:{},
                total:''
            }
        },
        created(){
            this.getFieldList()
        },
        methods:{
            back(n){
                this.$router.go(n)
            },
            editList(data){
                this.popup = data
                this.from = data
            },
            deleteList(data){
                this.from.token = this.initFrom.token
                this.from.ids = [parseInt(data)]
                // console.log(this.from);
                this.getDeleteList()
            },
            addList(){
                this.popup = 1
                this.value = "add"
            },
            onSubmitList(data){
                this.popup = data[0]
                this.from = data[1]
                this.from.token = this.$store.state.token
                this.from.task_id = parseInt(this.$route.query.id)
                if(this.value){
                    console.log(this.from);
                    this.addFieldList()
                    this.value = ""
                }else {
                    // console.log(this.from);
                    this.editFieldList()
                }
            },
            closepopupList(data){
                this.popup = data;
                this.value = ""
            },
            getFieldList(){
                // console.log(this.initFrom);
                postFormAPI('getFieldList',this.initFrom).then(res => {
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
            editFieldList(){
                postFormAPI('editField',this.from).then(res => {
                    this.from = {}
                    if(res.data.status === 0){
                        this.getFieldList()
                        this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
            addFieldList(){
                postFormAPI('addField',this.from).then(res => {
                    this.from = {}
                    if(res.data.status === 0){
                        this.getFieldList()
                        this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
            getDeleteList(){
                postFormAPI('deleteField',this.from).then(res => {
                    this.from = {}
                    if(res.data.status === 0){
                        this.getFieldList()
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
    }
</script>

<style lang="scss" scoped>
    /deep/ html,.index{
        min-height: 968px;
        background: #f6f7f9;
    }
    .list{
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