<template>
  <div class="chart">
    <div>
      <br>
      <br>
      <br>
      <div style="text-align:center;"><h1>Chart</h1></div>
    </div>  
      <div>
        <ve-line :data="chartData"></ve-line>
      </div>    
  </div>
</template>


<script>

export default {
  name: 'Chart',
  data(){
    return {
      chartData: {
        columns: ['日期', '即期買匯', '現金買匯', '即期賣匯', '現金賣匯' ],
        rows: [
          { '日期': '1/1', '即期買匯': 1393, '現金買匯': 1093, '即期賣匯': 1000,'現金賣匯':1200 },
          { '日期': '1/2', '即期買匯': 3530, '現金買匯': 3230, '即期賣匯': 3000,'現金賣匯':2500 },
        ]
      },
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>