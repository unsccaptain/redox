<template>
  <div
    class="tab-pane fade display-panel h-100"
    id="file-attr"
    role="tabpanel"
    v-if="file_attr!=null"
  >
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title" id="basic-addon3">文件路径:</span>
      </div>
      <span class="form-control info-content" id="basic-addon3">
        <a href="#" v-on:click="explore_file(file_attr.name)">{{ file_attr.name }}</a>
      </span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title" id="basic-addon3">创建时间:</span>
      </div>
      <span
        class="form-control info-content"
        id="basic-addon3"
      >{{ system_time(file_attr.creation_time) }}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title" id="basic-addon3">上次读取时间：</span>
      </div>
      <span
        class="form-control info-content"
        id="basic-addon3"
      >{{ system_time(file_attr.last_read) }}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title" id="basic-addon3">上次写入时间：</span>
      </div>
      <span
        class="form-control info-content"
        id="basic-addon3"
      >{{ system_time(file_attr.last_write) }}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title" id="basic-addon3">文件大小：</span>
      </div>
      <span class="form-control info-content" id="basic-addon3">{{ file_attr.file_size }}KB</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title" id="basic-addon3">占用空间：</span>
      </div>
      <span class="form-control info-content" id="basic-addon3">{{ file_attr.allocation_size }}KB</span>
    </div>
  </div>
</template>

<script>
import pecoff from "./pecoff";
import scroll from "../../public/component/random-scroll";
import hexView from "../../public/component/hex-view";
export default {
  data() {
    return {
      file_attr: pecoff.analysis.get_file_attr()
    };
  },
  methods: {
    explore_file: function(path) {
      cp.exec(`explorer.exe /select,${path}`);
    },
    system_time: function(st) {
      return `${st.year}年${st.month}月${st.day}日 ${st.hour}:${st.minute}:${st.second}`;
    }
  },
  components: {
    "rand-scroll": scroll,
    "hex-view": hexView
  }
};
</script>

<style scoped>
.scroll-default {
  height: 100px;
  position: absolute;
}
</style>