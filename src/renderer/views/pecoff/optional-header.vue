<template>
  <div class="tab-pane fade display-panel h-100" id="opt-header" role="tabpanel">
    <table class="table display-table table-hover" v-if="opt_header!=null">
      <thead>
        <tr>
          <th scope="col" style="width: 30%;">字段名称</th>
          <th scope="col" style="width: 70%;">字段值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in opt_header.native" v-bind:key="key">
          <td>{{ item.field_name }}</td>
          <td>{{ `${item.field_value.toString()} ${item.hasOwnProperty('additional_text')?'('+item.additional_text+')':""}` }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import pecoff from "./pecoff";
export default {
  data() {
    return {
      opt_header: pecoff.getAnalysisData("opt-header")
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$store.commit("addPercent", 10);
    });
  }
};
</script>