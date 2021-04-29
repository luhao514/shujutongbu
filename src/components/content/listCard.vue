<template>
    <el-card class="box-card">
        <div class="Source">
            <table>
                <tr>
                    <th width="20%">源字段</th>
                    <th width="20%">目标字段</th>
                    <th width="20%">字段类型</th>
                    <th width="20%">备注</th>
                    <th width="20%">操作</th>
                </tr>
                <tr v-for="(item,index) in items" :key="item.id">
                    <td width="20%">{{item.src_field}}</td>
                    <td width="20%">{{item.dst_field}}</td>
                    <td width="20%">{{item.dst_field_type}}</td>
                    <td width="20%">{{item.info}}</td>
                    <td width="20%">
                        <a class="hand" @click="editList(index)"><img src="../../assets/img/project-edit.png" alt="" style="height: 40px"></a>
                        <a class="hand" @click="open(index)"><img src="../../assets/img/project-del.png" alt="" style="height: 40px"></a>
                    </td>
                </tr>
            </table>
        </div>
    </el-card>
</template>

<script>
    import eventBus from "../../assets/js/eventBus";
    export default {
        name: "listCard",
        props:{
            items: {
                type: Array,
                required: true,
                default: function () {
                    return []
                }
            },
        },
        methods:{
            editList(index){
                this.$emit("editList",1)
                eventBus.$emit("editList",this.items[index])
            },
            open(index) {
                this.$confirm('此操作将永久删除该字段, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(this.item.id);
                    this.$emit("deleteList",this.items[index].id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                });
            },
            openList(){
                this.$router.push({ name:'list',query: { id: this.item.id ,projectName:this.$route.query.name,taskName:this.item.id.name}})
            }
        },
    }
</script>

<style lang="scss" scoped>
    .box-card {
        width: 1400px;
        border-radius: 20px;
        margin: 27px auto;
        font-family: "Noto Sans S Chinese";
        font-size: 16px;
        table{
            border-spacing:0 15px;
            border-collapse:separate;
            width: 1200px;
            margin: 0 auto;
            text-align: center;
            vertical-align: middle;
            a{
                margin-left: 10px;
                padding-top: 20px;
            }
        }
        .hand:hover{
            cursor: pointer;
        }
    }
</style>