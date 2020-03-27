<template>
  <div class="tab-pane fade display-panel h-100" id="sec-header" role="tabpanel">
    <div class="section-panel" ref="panel" id="section-table">
      <table class="table display-table table-hover">
        <thead>
          <tr>
            <th scope="col" style="width: 15%;">Name</th>
            <th scope="col" style="width: 10%;">VirtualSize</th>
            <th scope="col" style="width: 10%;">VirtualAddress</th>
            <th scope="col" style="width: 10%;">SizeOfRawData</th>
            <th scope="col" style="width: 10%;">PointerToRawData</th>
            <th scope="col" style="width: 10%;">PointerToRelocations</th>
            <th scope="col" style="width: 10%;">PointerToLinenumbers</th>
            <th scope="col" style="width: 10%;">NumberOfRelocations</th>
            <th scope="col" style="width: 10%;">NumberOfLinenumbers</th>
            <th scope="col" style="width: 10%;">Characteristics</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(section, name) in section_table" v-bind:key="name" v-on:click="section_click">
            <td>{{ section.Name.field_value }}</td>
            <td>{{ section["Misc.VirtualSize"].field_value }}</td>
            <td>
              <a
                href="#"
                v-on:click="show_section_raw(name)"
              >{{ section.VirtualAddress.field_value }}</a>
            </td>
            <td>{{ section.SizeOfRawData.field_value }}</td>
            <td>{{ section.PointerToRawData.field_value }}</td>
            <td>{{ section.PointerToRelocations.field_value }}</td>
            <td>{{ section.PointerToLinenumbers.field_value }}</td>
            <td>{{ section.NumberOfRelocations.field_value }}</td>
            <td>{{ section.NumberOfLinenumbers.field_value }}</td>
            <td>
              <div class="btn-group dropleft">
                <button
                  type="button"
                  class="btn dropdown-toggle attr-cell"
                  data-toggle="dropdown"
                >{{ section.Characteristics.field_value }}</button>
                <div class="dropdown-menu">
                  <div
                    class="d-flex flex-row attr-item"
                    v-for="(item,index) in section.Characteristics.attr_list"
                    v-bind:key="index"
                  >
                    <iSwitch :value="true" size="small"></iSwitch>
                    <span class="switch-text">{{ item.name }}</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="footer-transition">
      <div v-if="footer_show" class="section-footer">
        <div class="d-block footer-title">
          原始数据
          <button class="close-button" v-on:click="close_footer">
            <img src="assets/cross.svg" type="image/svg+xml" height="12px" width="12px" />
          </button>
        </div>
        <hex-view
          style="height:124px; padding:2px"
          :viewport="view_port"
          :col="16"
          :fetch-data="fetchData"
        ></hex-view>
      </div>
    </transition>
  </div>
</template>

<script>
import pecoff from "./pecoff";
import hexView from "../../public/component/hex-view";
export default {
  data() {
    return {
      section_table: pecoff.analysis.get_section_table(),
      view_port: {
        offsetStart: 0,
        offsetEnd: 0,
        offsetLoc: 0,
        rva: 0
      },
      footer_show: false
    };
  },
  methods: {
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
    },
    show_section_raw(name) {
      let section = this.section_table[name];

      let size = Math.min(
        section.SizeOfRawData.field_value.value,
        section["Misc.VirtualSize"].field_value.value
      );
      let start = section.VirtualAddress.field_value.value;

      this.view_port.offsetStart = start;
      this.view_port.offsetEnd = start + size;
      this.view_port.offsetLoc = start;
      this.footer_show = true;

      let panel = this.$refs.panel;
      $(panel).css("min-height", "calc(100vh - 190px)");
    },
    close_footer() {
      this.footer_show = false;

      //** 动画需要1s左右消失，设置延迟可以防止出现纵向滚动条 */
      //** FIXME：如果在1s内再次点击，会让show_section_raw里的min-height设置失效 */
      let panel = this.$refs.panel;
      setTimeout(() => $(panel).css("min-height", "calc(100vh - 36px)"), 400);
    },
    section_click(event) {
      // $("#section-table table")
      //   .find("tr.tr-focus")
      //   .toggleClass("tr-focus");
      // $(event.currentTarget).toggleClass("tr-focus");
    }
  },
  components: {
    "hex-view": hexView
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$store.commit("addPercent", 10);
    });
  }
};
</script>

<style lang="stylus" scoped>
.attr-item
  padding 4px

.switch-text
  padding-left 8px
</style>

<style scoped>
.section-panel {
  min-height: calc(100vh - 36px);
  overflow-x: auto;
}

.section-footer {
  height: 148px;
}

.footer-title {
  height: 24px;
  background: rgb(216, 216, 216);
  padding-left: 12px;
  padding-top: 3px;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.footer-transition-enter-active {
  transition: all 0.3s ease;
}
.footer-transition-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.footer-transition-enter, .footer-transition-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.close-button {
  float: right;
  background: none;
  border: none;
}
</style>