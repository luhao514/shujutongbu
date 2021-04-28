<template>
    <div class="index">
        <router-view></router-view>
        <div class="head">
            <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal">
                <img src="../assets/img/login-logo.png" alt="">
<!--                <el-menu-item index="3"><router-link to="/index" replace>系统设置</router-link></el-menu-item>-->
<!--                <el-menu-item index="2"><router-link to="/index" replace>任务管理</router-link></el-menu-item>-->
                <el-menu-item index="1"><router-link to="/index">项目管理</router-link></el-menu-item>
            </el-menu>
        </div>
        <el-card class="box">
            <p>当前项目数：{{total}}</p>
            <div class="add">
                <a href="javascript:" @click="addItem">
                    <img src="../assets/img/index-add.png" alt="">
                    <span>添加项目</span>
                </a>
            </div>
        </el-card>
        <div class="content" v-for="i in items.length" :key="i">
            <card @editItem="editItem" @editData="editData" @deleteItem="deleteItem" :item="items[i-1]"></card>
        </div>
        <popups-add v-show="popup1" @onSubmit="onSubmit1" @closepopup="closepopup1"></popups-add>
        <popups-edit v-show="popup2" @onSubmit="onSubmit2" @closepopup="closepopup2"></popups-edit>
        <popups-edit-item v-show="popup3" @onSubmit="onSubmit3" @closepopup="closepopup3" :item="items"></popups-edit-item>
    </div>
</template>

<script>
    import Card from "@/components/content/card";
    import PopupsAdd from "@/components/content/PopupsAdd";
    import PopupsEdit from "@/components/content/PopupsEdit";
    import PopupsEditItem from "@/components/content/PopupsEditItem";
    import {postFormAPI} from '/src/utils/api.js'

    export default {
        name: "index",
        components:{
            Card,
            PopupsAdd,
            PopupsEdit,
            PopupsEditItem,
        },
        created(){
            // this.$store.dispatch('getTermInfo')
            this.getTermInfo()
        },
        data() {
            return {
                popup1: 0,
                popup2: 0,
                popup3: 0,
                activeIndex: '1',
                initFrom:{
                    "token": this.$store.state.token,
                    "page": 1,
                    "rows": 100,
                    "sort": "create_time",
                    "dir": "DESC"
                },
                from:{},
                items:[],
                total:'',
            };
        },
        methods: {
            closepopup1(data){
                this.popup1 = data;
            },
            closepopup2(data){
                this.popup2 = data;
            },
            closepopup3(data){
                this.popup3 = data;
            },
            addItem(){
                this.popup1 = 1;
            },
            editItem(data){
                this.popup3 = data;
            },
            deleteItem(data){
                this.from.token = this.initFrom.token
                this.from.ids = [parseInt(data)]
                this.deleteProject()
            },
            editData(data){
                this.popup2 = data?data:1;
            },
            onSubmit1(data) {
                this.popup1 = data[0];
                this.from = data[1];
                this.from.token = this.initFrom.token
                this.addProject()
            },
            onSubmit2(data) {
                this.popup2 = data[0];
                this.from = data[1];
                this.from.token = this.initFrom.token
                this.editDbInfo()
            },
            onSubmit3(data) {
                this.popup3 = data[0];
                this.from = data[1];
                this.from.token = this.initFrom.token
                this.editProject()
            },
            getTermInfo(){
                postFormAPI('getProjectList',this.initFrom).then(res => {
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
            addProject(){
                postFormAPI('addProject',this.from).then(res => {
                    this.from = {}
                    if(res.data.status === 0){
                        this.getTermInfo()
                        this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
            editProject(){
                postFormAPI('editProject',this.from).then(res => {
                    this.from = {}
                    if(res.data.status === 0){
                        this.getTermInfo()
                        this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
            editDbInfo(){
                // console.log(this.from);
                postFormAPI('editDbInfo',this.from).then(res => {
                    this.from = {}
                    console.log(res);
                    if(res.data.status === 0){
                        this.getTermInfo()
                        this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
            deleteProject(){
                postFormAPI('deleteProject',this.from).then(res => {
                    this.from = {}
                    console.log(res);
                    if(res.data.status === 0){
                        this.getTermInfo()
                        // this.$message.success(res.data.info)
                    }else if(res.data.status === 102 || res.data.status === 103){
                        this.$message.error(res.data.info)
                        this.$router.replace('/');
                    }else {
                        this.$message.error(res.data.info)
                    }
                }).catch(err => {console.log(err)})
            },
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ html,.index{
        min-height: 968px;
        background: #f6f7f9;
    }
    .head{
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
    .box{
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
                /*vertical-align:middle;*/
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