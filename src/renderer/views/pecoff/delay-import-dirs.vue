<template>
  <div
    class="tab-pane fade display-panel h-100"
    id="delay-import-dir"
    role="tabpanel"
    v-if="delay_import_dir!=null"
  >
    <div id="delay-import-table">
      <table class="table display-table table-hover">
        <thead>
          <tr>
            <th scope="col">ModuleName</th>
            <th scope="col" style="width: 15%;">DllName</th>
            <th scope="col" style="width: 15%;">ModuleHandle</th>
            <th scope="col" style="width: 15%;">ImportAddressTable</th>
            <th scope="col" style="width: 15%;">ImportNameTable</th>
            <th scope="col" style="width: 15%;">BoundImport</th>
            <th scope="col" style="width: 15%;">UnloadInformation</th>
            <th scope="col" style="width: 15%;">TimeDateStamp</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(import_entry, index) in delay_import_dir"
            v-bind:key="index"
            v-on:click="show_import_list(index,$event)"
          >
            <td>{{ import_entry.ModuleName }}</td>
            <td>{{ import_entry.DllNameRVA.field_value }}</td>
            <td>{{ import_entry.ModuleHandleRVA.field_value }}</td>
            <td>{{ import_entry.ImportAddressTableRVA.field_value }}</td>
            <td>{{ import_entry.ImportNameTableRVA.field_value }}</td>
            <td>{{ import_entry.BoundImportAddressTableRVA.field_value }}</td>
            <td>{{ import_entry.UnloadInformationTableRVA.field_value }}</td>
            <td>{{ import_entry.TimeDateStamp.field_value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="delay-import-list">
      <table class="table display-table table-hover" v-if="delay_import_dir!=null">
        <thead>
          <tr>
            <th scope="col" style="width: 15%;">导入方式</th>
            <th scope="col" style="width: 15%;">Ordinal/Hint</th>
            <th scope="col" style="width: 50%;">Name</th>
            <th scope="col" style="width: 20%;">Address RVA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in import_thunks.thunk_list" v-bind:key="index">
            <td>{{ item.kind }}</td>
            <td>{{ item.kind == "Ordinal"? item.ordinal : item.hint }}</td>
            <td>{{ item.kind == "Ordinal"? `${import_thunks.import_name}.${item.ordinal}` : item.name }}</td>
            <td>{{ item.address_rva }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import pecoff from "./pecoff";
export default {
  data() {
    return {
      delay_import_dir: pecoff.getAnalysisData("delay-import-dir"),
      import_thunks: pecoff.analysis.get_delay_import_list_by_index(0)
    };
  },
  methods: {
    show_import_list: function(index, event) {
      $("#delay-import-table table")
        .find("tr.tr-focus")
        .toggleClass("tr-focus");
      $(event.currentTarget).toggleClass("tr-focus");
      this.import_thunks = pecoff.analysis.get_delay_import_list_by_index(
        index
      );
    }
  }
};
</script>

<style lang="stylus" scoped>
#delay-import-table
  height 50%
  overflow-y auto
  border-bottom 1px, rgba(196, 196, 196, 1)

#delay-import-list 
  height 50%
  overflow-y auto
</style>