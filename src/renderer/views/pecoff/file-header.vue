<template>
  <div class="tab-pane fade display-panel h-100" id="file-header" role="tabpanel">
    <table class="table display-table table-hover" v-if="file_header!=null">
      <thead>
        <tr>
          <th scope="col" style="width: 30%;">字段名称</th>
          <th scope="col" style="width: 70%;">字段值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Machine</td>
          <td>{{ `${file_header.Machine.field_value} [${file_header.Machine.additional}]` }}</td>
        </tr>
        <tr>
          <td>NumberOfSections</td>
          <td>
            <a
              data-toggle="list"
              href="#section-table"
              role="tab"
              v-on:click="show_sec_header"
            >{{ `${file_header.NumberOfSections.field_value}` }}</a>
          </td>
        </tr>
        <tr>
          <td>TimeDateStamp</td>
          <td>{{ `${file_header.TimeDateStamp.field_value} [${system_time(file_header.TimeDateStamp.additional)}]` }}</td>
        </tr>
        <tr>
          <td>PointerToSymbolTable</td>
          <td>{{ `${file_header.PointerToSymbolTable.field_value}` }}</td>
        </tr>
        <tr>
          <td>NumberOfSymbols</td>
          <td>{{ `${file_header.NumberOfSymbols.field_value}` }}</td>
        </tr>
        <tr>
          <td>SizeOfOptionalHeader</td>
          <td>{{ `${file_header.SizeOfOptionalHeader.field_value}` }}</td>
        </tr>
        <tr>
          <td>Characteristics</td>
          <td>
            <div class="btn-group dropright">
              <button
                type="button"
                class="btn dropdown-toggle attr-cell"
                data-toggle="dropdown"
              >{{ file_header.Characteristics.field_value }}</button>
              <div class="dropdown-menu">
                <div
                  class="d-flex flex-row attr-item"
                  v-for="(item,index) in file_header.Characteristics.attr_list"
                  v-bind:key="index"
                >
                  <iSwitch :value="true" size="small"></iSwitch>
                  <span class="switch-text">{{ item.name }}</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import pecoff from "./pecoff";
import linkMgr from "./link-mgr";
export default {
  data() {
    return {
      file_header: pecoff.getAnalysisData("file-header")
    };
  },
  methods: {
    system_time: function(st) {
      return `${st.year}年${st.month}月${st.day}日 ${st.hour}:${st.minute}:${st.second}`;
    },
    show_sec_header: function() {
      linkMgr.triggerPanel(this, { name: "sec-header" });
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$store.commit("addPercent", 10);
    });
  }
};
</script>

<style lang="stylus" scoped>
.attr-item
  padding 4px

.switch-text
  padding-left 8px
</style>