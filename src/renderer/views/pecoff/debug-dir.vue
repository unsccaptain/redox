<template>
  <div class="tab-pane fade display-panel h-100" id="dbg-dir" role="tabpanel">
    <table class="table display-table table-hover" v-if="dbg_dir!=null">
      <thead>
        <tr>
          <th scope="col" style="width: 20%;">TimeDateStamp</th>
          <th scope="col" style="width: 20%;">Type</th>
          <th scope="col" style="width: 20%;">SizeOfData</th>
          <th scope="col" style="width: 20%;">AddressOfRawData</th>
          <th scope="col" style="width: 20%;">PointerToRawData</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dbg_dir" v-bind:key="index">
          <td>{{ item.TimeDateStamp.field_value }}</td>
          <td>{{ item.Type.field_value }}</td>
          <td>{{ item.SizeOfData.field_value }}</td>
          <td>{{ item.AddressOfRawData.field_value }}</td>
          <td>{{ item.PointerToRawData.field_value }}</td>
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
      dbg_dir: pecoff.getAnalysisData("dbg-dir")
    };
  },
  methods: {}
};
</script>