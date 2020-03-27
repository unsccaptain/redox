<template>
  <div
    class="tab-pane fade display-panel h-100"
    id="import-dir"
    role="tabpanel"
    v-if="import_directory!=null"
  >
    <div id="import-table">
      <table class="table display-table table-hover">
        <thead>
          <tr>
            <th scope="col">ModuleName</th>
            <th scope="col" style="width: 15%;">OriginalFirstThunk</th>
            <th scope="col" style="width: 15%;">TimeDateStamp</th>
            <th scope="col" style="width: 15%;">ForwarderChain</th>
            <th scope="col" style="width: 15%;">Name</th>
            <th scope="col" style="width: 15%;">FirstThunk</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(import_entry, index) in import_directory"
            v-bind:key="index"
            v-on:click="show_import_list(index,$event)"
          >
            <td>{{ import_entry.ModuleName }}</td>
            <td>{{ import_entry.OriginalFirstThunk.field_value }}</td>
            <td>{{ import_entry.TimeDateStamp.field_value }}</td>
            <td>{{ import_entry.ForwarderChain.field_value }}</td>
            <td>{{ import_entry.Name.field_value }}</td>
            <td>{{ import_entry.FirstThunk.field_value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="import-list">
      <table class="table display-table table-hover" v-if="import_thunks!=null">
        <thead>
          <tr>
            <th scope="col" style="width: 15%;">导入方式</th>
            <th scope="col" style="width: 15%;">Ordinal/Hint</th>
            <th scope="col" style="width: 70%;">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in import_thunks.thunk_list" v-bind:key="index">
            <td>{{ item.kind }}</td>
            <td>{{ item.kind == "Ordinal"? item.ordinal : item.hint }}</td>
            <td>{{ item.kind == "Ordinal"? `${import_thunks.import_name}.${item.ordinal}` : item.name }}</td>
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
      import_directory: pecoff.getAnalysisData("import-dir"),
      import_thunks: null
    };
  },
  methods: {
    show_import_list: function(index, event) {
      $("#import-table table")
        .find("tr.tr-focus")
        .toggleClass("tr-focus");
      $(event.currentTarget).toggleClass("tr-focus");
      this.import_thunks = pecoff.analysis.get_import_list_by_index(index);
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
#import-table
  height 50%
  overflow-y auto
  border-bottom 1px, rgba(196, 196, 196, 1)

#import-list 
  height 50%
  overflow-y auto
</style>