<template>
 <div>
   
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