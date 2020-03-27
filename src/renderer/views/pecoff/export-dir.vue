<template>
  <div
    class="tab-pane fade display-panel h-100"
    id="export-dir"
    role="tabpanel"
    v-if="export_directory!=null"
  >
    <div>
      <div class="alert alert-secondary field-alert">导出名:{{ export_directory.name }}</div>
      <div
        class="alert alert-secondary field-alert"
      >MajorVersion:{{ export_directory.native.MajorVersion.field_value }}</div>
      <div
        class="alert alert-secondary field-alert"
      >MinorVersion:{{ export_directory.native.MinorVersion.field_value }}</div>
      <div
        class="alert alert-secondary field-alert"
      >NumberOfFunctions:{{ export_directory.native.NumberOfFunctions.field_value }}</div>
      <div
        class="alert alert-secondary field-alert"
      >NumberOfNames:{{ export_directory.native.NumberOfNames.field_value }}</div>
    </div>
    <table class="table display-table table-hover">
      <thead>
        <tr>
          <th scope="col" style="width: 15%;">Address</th>
          <th scope="col" style="width: 15%;">Ordinal</th>
          <th scope="col" style="width: 15%;">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(export_item, index) in export_directory.items" v-bind:key="index">
          <td>{{ export_item.Address }}</td>
          <td>{{ export_item.Ordinal }}</td>
          <td>{{ export_item.Name }}</td>
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
      export_directory: pecoff.getAnalysisData("export-dir")
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$store.commit("addPercent", 10);
    });
  }
};
</script>