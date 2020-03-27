<template>
  <div class="tab-pane fade display-panel h-100" id="res-dir" role="tabpanel">
    <hex-view
      :viewport="view_port"
      :buffer="view_buffer"
      :col="16"
      v-on:request_data="req_data"
      ref="hv"
    ></hex-view>
  </div>
</template>

<script>
import pecoff from "./pecoff";
import hexView from "../../public/component/hex-view";
export default {
  data() {
    return {
      view_port: {
        offsetStart: 0,
        offsetEnd: 0,
        offsetCur: 0,
        rva: 0
      },
      view_buffer: []
    };
  },
  components: {
    "hew-view": hexView
  },
  created: function() {},
  props: {
    title: { default: "" },
    offset: { default: 0 },
    size: { default: 0 }
  }
};
</script>