<template>
  <div id="app">
    <div style="float: left; padding: 15px;">
      <b-form-select id="form_selected" v-model="bank_selected" :options="bank_options" class="mb-2">
        <template slot="first">
          <option :value="null" disabled>-- Please Select Bank --</option>
        </template>
      </b-form-select>
    </div>

    <div style="float: left;padding: 15px;">
      <b-form-select id="form_selected" v-model="currenecy_selected" :options="currenecy_options" class="mb-2">
        <template slot="first">
          <option :value="null" disabled>-- Please select currency --</option>
        </template>
      </b-form-select>
    </div>

    <div style="float: left;" class="datepicker" >
        <datepicker @selected="submitFromDate" :value="state.date" :format="customFormatter" v-model="state.date" name="from_datepicker" placeholder="--Select From Date--"></datepicker>
        <span>{{FromDate}}</span>
    </div>
    <div style="float: left;" class="datepicker" >
        <datepicker @selected="submitToDate" :value="state.date" :format="customFormatter" v-model="state.date2" name="to_datepicker" placeholder="--Select To Date--"></datepicker>
        <span>{{ToDate}}</span>
    </div>
    <div>
      <br>
      <br>
      <br>
      <br>
      <strong style="color:red"> {{chartData.rows}} </strong>
    </div>
    <div class="chart">
      <div>
        <br>
        <br>
        <br>
        <div style="text-align:center;"><h1>Chart</h1></div>
      </div>  
      <div>
        <ve-line v-model="chartData" :data="chartData" :key="componentKey"></ve-line>
      </div>    
    </div>
  </div>
  
</template>

<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";
const axios = require('axios');
const moment = require('moment')

const state = {
  date1: new Date()
};

export default {
  name: "DatePicker",
  components: {
    Datepicker
  },
  data() {
    return {
      chartData: {
        columns: ['日期', '即期買匯', '現金買匯', '即期賣匯', '現金賣匯' ],
        rows: [
          { '日期': '2019-02-01', '即期買匯': 1393, '現金買匯': 1093, '即期賣匯': 1000,'現金賣匯':1200 },
          { '日期': '2019-03-01', '即期買匯': 3530, '現金買匯': 3230, '即期賣匯': 3000,'現金賣匯':2500 },
        ]
      },
      componentKey: 0,
      FromDate:null,
      ToDate:null,
      bank_selected: null,
      currenecy_selected: null,
      bank_options: [
        { value: 'megabank', text: '兆豐銀行' }
      ],
      currenecy_options: [
        { value: 'USD', text: '美金[USD]' },
        { value: 'HKD', text: '港幣[HKD]' },
        { value: 'GBP', text: '英鎊[GBP]' },
        { value: 'JPY', text: '日圓[JPY]' },
        { value: 'AUD', text: '澳幣[AUD]' },
        { value: 'CAD', text: '加拿大幣[CAD]' },
        { value: 'SGD', text: '新加坡幣[SGD]' },
        { value: 'ZAR', text: '南非幣[ZAR]' },
        { value: 'CHF', text: '瑞士法郎[CHF]' },
        { value: 'THB', text: '泰幣[THB]' },
        { value: 'NZD', text: '紐西蘭幣[NZD]' },
        { value: 'EUR', text: '歐元[EUR]' },
        { value: 'SEK', text: '瑞典幣[SEK]' },
        { value: 'KRW', text: '韓幣[KRW]' },
        { value: 'MYR', text: '馬來幣[MYR]' },
        { value: 'IDR', text: '印尼幣[IDR]' },
        { value: 'PHP', text: '菲律賓幣[PHP]' },
        { value: 'MOP', text: '澳門幣[MOP]' },
        { value: 'VND', text: '越南幣[VND]' },
        { value: 'CNY', text: '人民幣[CNY]' },
      ],
      currency:'',
      eventMsg: null,
      state: state,
      vModelExample: null,
      changedMonthLog: []
    };
  },
  watch: {
    bank_selected: function() {
      if(this.bank_selected != null) {
        this.searchExchangeRate()
      } else {
        //error handling
      }
    },
    currenecy_selected: function(){
      if(this.currenecy_selected != null) {
        this.searchExchangeRate()
      } else {
        //error handling
      }
    }
  },
  methods: {
    customFormatter(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    submitFromDate: function (event) {
        this.FromDate = moment(event).format('YYYY-MM-DD');
        this.FromDate = this.fromDateToTimeStamp(this.FromDate)
        this.searchExchangeRate()
    },
    submitToDate: function (event) {
        this.ToDate = moment(event).format('YYYY-MM-DD');
        this.ToDate = this.toDateToTimeStamp(this.ToDate)
        this.searchExchangeRate()
    },
    fromDateToTimeStamp: function(date){
      let ts = new Date(date).getTime()
      return ts/1000
    },
    toDateToTimeStamp: function(date){
      let ts = new Date(date).getTime()
      return ts/1000
    },
    TimeStampToDate: function(ts){
      return  moment.unix(ts).format("YYYY-MM-DD");
    } 
    ,
    searchExchangeRate: function(){
      //error handling
      // let parameter = [this.bank_selected,this.currenecy_selected,this.FromDate,this.ToDate]
      // parameter.forEach(function(element){
      //   if(element==null){
      //     alert("please make sure all the items are selected ")
      //   }
      // })

      let requestURL = `https://f7964ddhdh.execute-api.ap-southeast-1.amazonaws.com/dev/${this.bank_selected}/${this.currenecy_selected}/${this.FromDate}/${this.ToDate}`;
      axios
      .get(requestURL)
      .then((response)=>{
        this.chartData.rows = []
        this.band_info = response.data.Items
        let raw_data = response.data.Items
        for (let i=0;i<raw_data.length;i++){
          //{ '日期': '1/1', '即期買匯': 1393, '現金買匯': 1093, '即期賣匯': 1000,'現金賣匯':1200 },
          let obj = {}
          console.log(raw_data[i])
          obj["日期"] = this.TimeStampToDate(raw_data[i]["transaction_ts"]["N"])
          obj["即期買匯"] = raw_data[i].exchange_type.M.stock_buy.N
          obj["現金買匯"] = raw_data[i].exchange_type.M.cash_buy.N
          obj["即期賣匯"] = raw_data[i].exchange_type.M.stock_sell.N
          obj["現金賣匯"] = raw_data[i].exchange_type.M.cash_sell.N
          this.chartData.rows.push(obj)
          console.log(obj['日期'])
        }
        this.componentKey += 1;
      })
      .catch(function (error) {
        console.log(error);
      })
    },

  }
};
</script>

<style>
body {
  font-family: "Helvetica Neue Light", Helvetica, sans-serif;
  padding: 1em 2em 2em;
}
input,
select {
  padding: 0.75em 0.5em;
  font-size: 100%;
  text-align:center;
  border: 1px solid #ccc;
  width: 100%;
}

select {
  height: 1.5em;
}

.datepicker {
  padding: 0.5em 0.5em 0.5em;
  margin-bottom: 1em;
  width: 20%;
}

code,
pre {
  margin: 1em 0;
  padding: 1em;
  border: 1px solid #bbb;
  display: block;
  background: #ddd;
  border-radius: 3px;
}

#form_selected{
  width:100%
}
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