<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <p class="first">项目:<span>{{this.item.name}}</span></p>
            <p class="second">创建时间:<span>{{this.item.create_time}}</span></p>
            <p class="third">备注:<span>{{this.item.info}}</span></p>
            <el-button style="float: right;margin-left: 10px" type="text" @click="open"><img src="../../assets/img/project-del.png" alt=""></el-button>
            <el-button style="float: right;" type="text" @click="editItem"><img src="../../assets/img/project-edit.png" alt=""></el-button>
<!--            <el-button style="float: right;" type="text"><img src="../assets/img/project-save.png" alt=""></el-button>-->
        </div>
        <div class="Source">
            <div class="title">
                <div>
                    <span class="circle1"></span>
                    <span style="font-weight: bold">源数据库：</span>
                </div>
<!--                <el-button style="float: right;margin-left: 10px;" type="text"><img src="../assets/img/project-del.png" alt="" style="height: 46px"></el-button>-->
                <el-button style="float: right;margin-right: 35px" type="text" @click="editData(1)"><img src="../../assets/img/project-edit.png" alt="" style="height: 46px"></el-button>
            </div>
            <div>
                <table>
                    <tr>
                        <td width="20%">类型：{{this.item.dbconn_info.source?this.item.dbconn_info.source.db_type_name:''}}</td>
                        <td width="20%">驱动名称：{{this.item.dbconn_info.source?this.item.dbconn_info.source.driver:''}}</td>
                        <td width="20%">数据源名称：{{this.item.dbconn_info.source?this.item.dbconn_info.source.dsn:''}}</td>
                    </tr>
                    <tr>
                        <td width="20%">数据库名称：{{this.item.dbconn_info.source?this.item.dbconn_info.source.dbname:''}}</td>
                        <td width="20%">IP：{{this.item.dbconn_info.source?this.item.dbconn_info.source.ip:''}}</td>
                        <td width="20%">端口：{{this.item.dbconn_info.source?this.item.dbconn_info.source.port:''}}</td>
                        <td width="20%">用户名：{{this.item.dbconn_info.source?this.item.dbconn_info.source.username:''}}</td>
                        <td width="20%">密码：{{this.item.dbconn_info.source?this.item.dbconn_info.source.password:''}}</td>
                    </tr>
                    <tr>
                        <td width="20%">备注：{{this.item.dbconn_info.source?this.item.dbconn_info.source.info:''}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="Target">
            <div class="title">
                <div>
                    <span class="circle2"></span>
                    <span style="font-weight: bold">目标数据库：</span>
                </div>
<!--                <el-button style="float: right;margin-left: 10px" type="text"><img src="../assets/img/project-del.png" alt="" style="height: 46px"></el-button>-->
                <el-button style="float: right;margin-right: 35px" type="text"  @click="editData(0)"><img src="../../assets/img/project-edit.png" alt="" style="height: 46px"></el-button>
            </div>
            <div>
                <table>
                    <tr>
                        <td width="20%">类型：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.db_type_name:''}}</td>
                        <td width="20%">驱动名称：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.driver:''}}</td>
                        <td width="20%">数据源名称：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.dsn:''}}</td>
                    </tr>
                    <tr>
                        <td width="20%">数据库名称：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.dbname:''}}</td>
                        <td width="20%">IP：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.ip:''}}</td>
                        <td width="20%">端口：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.port:''}}</td>
                        <td width="20%">用户名：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.username:''}}</td>
                        <td width="20%">密码：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.password:''}}</td>
                    </tr>
                    <tr>
                        <td width="20%">备注：{{this.item.dbconn_info.dest?this.item.dbconn_info.dest.info:''}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="bottom" @click="openTask"><a href="javascript:">详情 &gt; &gt;</a></div>
    </el-card>
</template>

<script>
    import eventBus from "../../assets/js/eventBus";
    export default {
        name: "card",
        props:{
            item: {
                type: Object,
                required: true,
                default: function () {
                    return {}
                }
            },
        },
        methods:{
            editItem(){
                this.$emit("editItem",1)
                eventBus.$emit("editItem",this.item)
            },
            editData(v){
                this.$emit("editData",1)
                eventBus.$emit("editData",[v,this.item])
            },
            open() {
                this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit("deleteItem",this.item.id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            },
            openTask(){
                this.$router.push({ name:'task',query: { id: this.item.id ,name:this.item.name}})
            }
        },
    }
</script>

<style lang="scss" scoped>
    .box-card {
        width: 1400px;
        height: 563px;
        border-radius: 20px;
        margin: 27px auto;
        font-family: "Noto Sans S Chinese";
        font-size: 16px;
        .clearfix{
            height: 82px;
            position:relative;
            p{
                font-weight: bold;
                display: inline-block;
                position: absolute;
                bottom: 10px;
            }
            .first{
                margin-left: 15px;
            }
            .second{
                margin-left: 350px;
            }
            .third{
                margin-left: 785px;
            }
        }
        .Source{
            height: 148px;
        }
        .Target{
            height: 148px;
        }
        .bottom{
            margin-right: 20px;
            text-align: end;
            a{
                color: #400ab9;
            }
        }
        .title{
            position:relative;
            height: 40px;
            padding-left: 15px;
            div{
                display: inline-block;
                position: absolute;
                bottom: 10px;
            }
        }
        table{
            border-collapse:separate;
            border-spacing:0 20px;
            height: 84px;
            width: 1200px;
            margin-left: 15px;
        }
        .circle1{
            width: 10px;
            height: 10px;
            background-color: #7f78fc;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
        }
        .circle2{
            width: 10px;
            height: 10px;
            background-color: greenyellow;
            border-radius: 50%;
            display: inline-block;
            margin-right: 5px;
        }
    }
</style>