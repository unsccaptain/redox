<template>
  <div
    class="tab-pane fade display-panel h-100"
    id="reloc-dir"
    role="tabpanel"
    v-if="reloc_dir!=null"
  >
    <div class="row" id="reloc-div">
      <div class="col-6" id="reloc-table">
        <table class="table display-table table-hover" data-toggle="table">
          <thead>
            <tr>
              <th scope="col" style="width: 60%;">BaseAddress</th>
              <th scope="col" style="width: 40%;">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(reloc,index) in reloc_dir"
              v-bind:key="index"
              v-on:click="show_reloc_list(index, $event)"
            >
              <td>{{ reloc.base }}</td>
              <td>{{ reloc.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6" id="reloc-thunk-table">
        <table class="table display-table table-hover">
          <thead>
            <tr>
              <th scope="col" style="width: 40%;">TargetRVA</th>
              <th scope="col" style="width: 60%;">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(thunk,index) in reloc_thunks" v-bind:key="index">
              <td>{{ thunk.address_rva }}</td>
              <td>{{ thunk.flag }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import pecoff from "./pecoff";
export default {
  data() {
    let data_object = {
      reloc_dir: pecoff.getAnalysisData("reloc-dir")
    };
    data_object.reloc_thunks =
      data_object.reloc_dir != null ? data_object.reloc_dir[0].list : null;
    return data_object;
  },
  methods: {
    show_reloc_list: function(index, event) {
      $("#reloc-table table")
        .find("tr.tr-focus")
        .toggleClass("tr-focus");
      $(event.currentTarget).toggleClass("tr-focus");
      this.reloc_thunks = this.reloc_dir[index].list;
    }
  }
};
</script>

<style lang="stylus">
#reloc-div
  margin-right -1px

#reloc-table
  overflow-y scroll
  padding-right 0px

#reloc-thunk-table
  overflow-y scroll
  padding-left 0px
  padding-right 0px
</style>