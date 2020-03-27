<template>
  <div class="tab-pane fade display-panel h-100" id="dos-header" role="tabpanel">
    <table class="table display-table table-hover" v-if="dos_header!=null">
      <thead>
        <tr>
          <th scope="col" style="width: 30%;">字段名称</th>
          <th scope="col" style="width: 70%;">字段值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in dos_header" v-bind:key="key">
          <td>{{ key }}</td>
          <td>{{ value.field_value.toString() }}</td>
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
      dos_header: pecoff.getAnalysisData("dos-header")
    };
  }
};
</script>