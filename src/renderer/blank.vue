<template>
  <div class="jumbotron jumbotron-fluid" id="drag" v-if="!analysis_on">
    <div class="container">
      <h1 class="display-4">Redox:Executable File Analysis System</h1>
      <p class="lead">请打开一个可执行文件或者将其拖入到窗口中。</p>
    </div>
  </div>
</template>

<script>
import pecoff from "./views/pecoff/pecoff";
export default {
  computed: {
    analysis_on: () => pecoff.analysis != null
  }
};
</script>