<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <p class="first">任务名称：<span>{{this.item.name}}</span></p>
            <el-button style="float: right;margin-right: 33px" type="text" @click="open"><img src="../../assets/img/project-del.png" alt=""></el-button>
<!--            <el-button style="float: right;" type="text" @click="editItem"><img src="../../assets/img/project-edit.png" alt=""></el-button>-->
            <!--            <el-button style="float: right;" type="text"><img src="../assets/img/project-save.png" alt=""></el-button>-->
        </div>
        <div class="Source">
            <div class="title">
                <el-button style="float: right;margin-right: 35px" type="text" @click="editTask"><img src="../../assets/img/project-edit.png" alt="" style="height: 46px"></el-button>
            </div>
            <div>
                <table>
                    <tr>
                        <td width="20%">类型：{{this.item.task_type}}</td>
                        <td width="20%">间隔：{{this.item.sync_interval}}s</td>
                        <td width="20%">主键：{{this.item.pk_name}}</td>
                    </tr>
                    <tr>
                        <td width="20%">源表：{{this.item.src_table}}</td>
                        <td width="20%">目标表：{{this.item.dst_table}}</td>
                        <td width="20%">最后同步时间：{{this.item.last_sync_time}}</td>
                    </tr>
                    <tr>
                        <td width="20%">执行成功次数：{{this.item.sync_count_ok}}</td>
                        <td width="20%">执行失败次数：{{this.item.sync_count_ng}}</td>
                        <td width="20%">备注：{{this.item.info}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <el-divider></el-divider>
        <div class="bottom" @click="openList"><a href="javascript:">查看字段 &gt; &gt;</a></div>
    </el-card>
</template>

<script>
    import eventBus from "../../assets/js/eventBus";
    export default {
        name: "infoCard",
        props:{
            item: {
                type: Object,
                required: true,
                default: function () {
                    return {}
                }
            },
            project: {
                type: String,
                required: true,
                default: function () {
                    return ""
                }
            },
        },
        methods:{
            editTask(){
                this.$emit("editTask",1)
                eventBus.$emit("editTask",this.item)
            },
            open() {
                this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(this.item.id);
                    this.$emit("deleteTask",this.item.id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            },
            openList(){
                this.$router.push({ name:'list',query: { id: this.item.id ,projectName:this.project,taskName:this.item.name}})
            }
        },
    }
</script>

<style lang="scss" scoped>
    .box-card {
        width: 1400px;
        height: 370px;
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
                bottom: 20px;
            }
            .first{
                margin-left: 15px;
            }
        }
        .Source{
            height: 138px;
        }
        .bottom{
            margin-right: 20px;
            text-align: end;
            a{
                color: #400ab9;
            }
        }
        table{
            border-collapse:separate;
            border-spacing:0 25px;
            height: 84px;
            width: 1200px;
            margin-left: 15px;
        }
    }
</style>