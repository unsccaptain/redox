<template>
  <div class="tab-pane fade display-panel h-100" id="res-dir" role="tabpanel">
    <div class="row no-margin">
      <Tree :data="data1" class="res-tree" style="flex:1;" v-on:on-select-change="select_change"></Tree>
      <!-- TODO:我觉得有必要将这个功能做成离屏渲染，在当前页面开销较大 -->
      <div v-if="show_raw_data" id="aaaa" style="height:580px;width:0px;">
        <hex-view style="height:540px;" :viewport="view_port" :col="16" :fetch-data="fetchData"></hex-view>
      </div>
    </div>
  </div>
</template>
<script>
import pecoff from "./pecoff";
import hexView from "../../public/component/hex-view";
let class_define = [
  "",
  "光标",
  "位图",
  "图标",
  "菜单",
  "对话框",
  "字符串",
  "字体目录",
  "字体",
  "加速键",
  "未格式资源",
  "消息表",
  "光标组",
  "",
  "图标组",
  "",
  "版本信息"
];
export default {
  data() {
    let res_tree = { data1: [] };
    let add_level = function(level, lv) {
      let node = {
        title: level.is_name ? level.name : `ID:${level.id}`
      };
      if (lv == 1) {
        if (
          !level.is_name &&
          level.id <= 0x10 &&
          class_define[level.id] != ""
        ) {
          node.title += `(${class_define[level.id]})`;
        }
      }

      if (level.kind == "branch") {
        node.children = [];
        level.children.forEach(item => {
          node.children.push(add_level(item, lv + 1));
        });
        node.expand = true;
      } else {
        node.data_rva = level.data_rva;
        node.data_size = level.data_size;
      }

      node.kind = level.kind;

      return node;
    };

    return {
      data1: [add_level(pecoff.getAnalysisData("res-dir"), 0)],
      view_port: {
        offsetStart: 0,
        offsetEnd: 0,
        offsetLoc: 0,
        rva: 0
      },
      show_raw_data: false
    };
  },
  methods: {
    select_change(event) {
      let node = event[0];
      if (node.kind == "leaf") {
        this.view_port.offsetStart = node.data_rva;
        this.view_port.offsetLoc = node.data_rva;
        this.view_port.offsetEnd = node.data_rva + node.data_size;
      }
      this.show_raw_data = true;
      this.$nextTick(() => {
        $("#aaaa").addClass("res-dir-right-bar");
      });
    },
    fetchData: function(offset, size) {
      let real_size = size;
      if (offset + size > this.view_port.offsetEnd) {
        real_size = this.view_port.offsetEnd - offset;
      }
      if (real_size > 0) {
        return new Uint8Array(
          pecoff.analysis.read_buffer_rva(offset, real_size)
        );
      } else {
        return [];
      }
    }
  },
  components: {
    "hex-view": hexView
  }
};
</script>

<style scoped>
.no-margin {
  margin: 0px;
}

.res-dir-right-bar {
  animation: move 200ms linear forwards;
}

@keyframes move {
  0% {
    width: 0px;
  }
  100% {
    width: 600px;
  }
}
</style>
