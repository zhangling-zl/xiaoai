<template>
 <div>
   <div>欢迎来到小爱后台管理系统</div>
   
 </div>
</template>

<script>
 export default {
   name: '',
   props: {
   },
   components: {

   },
   data () {
     return {
       adminUser:{}

     }
   },
   methods: {

   },
   mounted() {
     let adminUser = JSON.parse(localStorage.getItem('adminUser'))
     console.log(adminUser);
   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>