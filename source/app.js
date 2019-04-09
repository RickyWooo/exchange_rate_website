
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

chart = {
    columns: ['日期', '销售额','現金買入'],
    rows: [
      { '日期': '1月1日', '销售额': 123,'現金買入':2000 },
      { '日期': '1月2日', '销售额': 123,'現金買入':1000 },
      { '日期': '1月3日', '销售额': 123,'現金買入':1000 },
      { '日期': '1月4日', '销售额': 123,'現金買入':1000 },
      { '日期': '1月5日', '销售额': 123,'現金買入':1000 },
      { '日期': '1月6日', '销售额': 123,'現金買入':1000 },
      { '日期': '1月7日', '销售额': 123,'現金買入':1000 },
      { '日期': '1月8日', '销售额': 123,'現金買入':1000 },
      { '日期': '1月9日', '销售额': 123,'現金買入':1000 },
    ]
  }

new Vue({
  el: '#app',
  data: function () {
    return {
      chartData: chart,
      country:`<div>
      <b-dropdown id="dropdown-1" text="幣別" class="m-md-0">
        <b-dropdown-item>First Action</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item active>Active action</b-dropdown-item>
        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
      </b-dropdown>
    </div>`
    }
  },
  components: { VeLine }
})

