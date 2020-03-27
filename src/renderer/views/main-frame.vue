<template>
  <div class="container-fluid h-100" v-if="analysis_on">
    <!-- <Progress :percent="load_status" status="active"></Progress> -->
    <div class="row h-100" id="main-panel">
      <div class="h-100 col-3" id="side-bar-col">
        <side-bar></side-bar>
      </div>
      <div class="h-100 col-9" id="work-space-col">
        <top-tab></top-tab>
        <div class="tab-content h-100" id="panel-layer">
          <file-attr></file-attr>
          <pe-attr></pe-attr>
          <dos-header></dos-header>
          <file-header></file-header>
          <opt-header></opt-header>
          <data-dirs></data-dirs>
          <sec-header></sec-header>
          <import-dir></import-dir>
          <export-dir></export-dir>
          <delay-import-dir></delay-import-dir>
          <reloc-dir></reloc-dir>
          <res-dir></res-dir>
          <debug-dir></debug-dir>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pecoff from "./pecoff/pecoff";
import sideBar from "./pecoff/side-bar";
import topTab from "./top-tab";

import fileAttr from "./pecoff/file-attr";
import peAttr from "./pecoff/pe-attr";

import dosHeader from "./pecoff/dos-header";
import fileHeader from "./pecoff/file-header";
import optHeader from "./pecoff/optional-header";
import dataDirs from "./pecoff/data-dirs";
import secHeader from "./pecoff/section-header";
import importDir from "./pecoff/import-dir";
import exportDir from "./pecoff/export-dir";
import delayImportDir from "./pecoff/delay-import-dirs";
import relocDir from "./pecoff/reloc-dir";
import resDir from "./pecoff/res-dir";
import debugDir from "./pecoff/debug-dir";

export default {
  data() {
    return {
      load_status: 0
    };
  },
  created() {},
  components: {
    "side-bar": sideBar,
    "top-tab": topTab,

    "file-attr": fileAttr,
    "pe-attr": peAttr,

    "dos-header": dosHeader,
    "file-header": fileHeader,
    "opt-header": optHeader,
    "data-dirs": dataDirs,
    "sec-header": secHeader,
    "import-dir": importDir,
    "export-dir": exportDir,
    "delay-import-dir": delayImportDir,
    "reloc-dir": relocDir,
    "res-dir": resDir,
    "debug-dir": debugDir
  },
  computed: {
    analysis_on: () => pecoff.analysis != null
  }
};
</script>
<style lang="stylus" scoped>
#side-bar-col
  padding-left 0px
  padding-right 0px 
  width 160px

#work-space-col
  padding-left 0px
  padding-right 0px
  background-color rgba(246, 246, 246, 1)
  margin-right -5px

#panel-layer
  overflow-y auto

</style>