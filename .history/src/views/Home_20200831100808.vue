<template>
 <div>
   我是首页
 </div>
</template>

<script>
import {createNamespacedHelpers, mapState} from 'vuex'
const userModule = createNamespacedHelpers('user')
const{mapState:userState,mapActions:userActions} = userModule
 export default {
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {

     }
   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>
