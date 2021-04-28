import Vue from 'vue'
import Vuex from 'vuex'
// import {postFormAPI} from '/src/utils/api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    // items:{},
    // total:""
  },
  mutations: {
    getToken(state,data){
      state.token = data
    }
  },
  actions: {
    // getTermInfo(){
    //   postFormAPI('getProjectList',this.initFrom).then(res => {
    //     if(res.data.status === 0){
    //       this.items = res.data.data
    //       this.total = res.data.total
    //       // console.log(this.items);
    //     }else if(res.data.status === 102 || res.data.status === 103){
    //       this.$message.error(res.data.info)
    //       this.$router.replace('/');
    //     }else {
    //       this.$message.error(res.data.info)
    //     }
    //   }).catch(err => {console.log(err)})
    // },
    // addProject(commit){
    //   postFormAPI('addProject',commit.from).then(res => {
    //     if(res.data.status === 0){
    //       this.getTermInfo()
    //       this.$message.success(res.data.info)
    //     }else if(res.data.status === 102 || res.data.status === 103){
    //       this.$message.error(res.data.info)
    //       this.$router.replace('/');
    //     }else {
    //       this.$message.error(res.data.info)
    //     }
    //   }).catch(err => {console.log(err)})
    // },
    // editProject(commit){
    //   postFormAPI('editProject',commit.from).then(res => {
    //     if(res.data.status === 0){
    //       this.getTermInfo()
    //       this.$message.success(res.data.info)
    //     }else if(res.data.status === 102 || res.data.status === 103){
    //       this.$message.error(res.data.info)
    //       this.$router.replace('/');
    //     }else {
    //       this.$message.error(res.data.info)
    //     }
    //   }).catch(err => {console.log(err)})
    // },
    // editDbInfo(){
    //   // console.log(this.from);
    //   postFormAPI('editDbInfo',this.from).then(res => {
    //     this.from = {}
    //     console.log(res);
    //     if(res.data.status === 0){
    //       this.getTermInfo()
    //       this.$message.success(res.data.info)
    //     }else if(res.data.status === 102 || res.data.status === 103){
    //       this.$message.error(res.data.info)
    //       this.$router.replace('/');
    //     }else {
    //       this.$message.error(res.data.info)
    //     }
    //   }).catch(err => {console.log(err)})
    // },
    // deleteProject(){
    //   postFormAPI('deleteProject',this.from).then(res => {
    //     this.from = {}
    //     console.log(res);
    //     if(res.data.status === 0){
    //       this.getTermInfo()
    //       // this.$message.success(res.data.info)
    //     }else if(res.data.status === 102 || res.data.status === 103){
    //       this.$message.error(res.data.info)
    //       this.$router.replace('/');
    //     }else {
    //       this.$message.error(res.data.info)
    //     }
    //   }).catch(err => {console.log(err)})
    // },
  },
  modules: {
  },
})
