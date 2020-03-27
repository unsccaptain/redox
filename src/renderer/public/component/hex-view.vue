<template>
  <div class="d-flex flex-row">
    <table ref="view">
      <thead v-if="header_visible">
        <tr>
          <th></th>
          <th v-for="(n,index) in col" v-bind:key="index">{{ index }}</th>
          <th v-if="ascii" class="ascii-col"></th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <rand-scroll ref="scroll" style="height:400px;position:relative" v-on:scroll="onScroll"></rand-scroll>
  </div>
</template>

<script>
// 一行20px
import randScroll from "./random-scroll";
export default {
  props: {
    col: { default: 10 },
    viewport: {
      offsetStart: 0,
      offsetEnd: 0,
      offsetLoc: 0
    },
    ascii: {
      default: true
    },
    header_visiable: {
      default: false
    },
    fetchData: {
      type: Function,
      default: function(offset, size) {
        return [];
      }
    }
  },
  data() {
    return {
      row: 0,
      height: 0,
      max: 10,
      per: 0,
      cur: 0,
      visible_cell: 0
    };
  },
  methods: {
    //** 计算单元格应该显示的数据 */
    cellData(buffer, r, c) {
      let count = this.col * r + c;
      if (count < buffer.length) {
        let formatted = buffer[count].toString(16);
        return formatted.length == 1 ? "0" + formatted : formatted;
      } else {
        return "&nbsp;&nbsp;";
      }
    },
    cellAscii(buffer, row) {
      let offset = this.col * row;
      let ascii = "";
      for (let i = 0; i < this.col; i++) {
        let index = offset + i;
        if (index < buffer.length) {
          let code = buffer[index];
          ascii += code >= 32 && code <= 127 ? String.fromCharCode(code) : ".";
        }
      }
      return ascii;
    },
    renderRow(buffer, row_number) {
      let html = "<tr>";
      html += `<th class="hex-view-row-th text-monospace hex-view-cell-th">${(
        this.cur +
        row_number * this.col
      ).toString(16)}</th>`;
      html += `<td class="text-monospace hex-view-cell-td">`;
      for (let i = 0; i < this.col; i++) {
        html += `&nbsp;${this.cellData(buffer, row_number, i)}&nbsp;`;
      }
      html += `</td><td class="hex-view-ascii-col text-monospace">${this.cellAscii(
        buffer,
        row_number
      )}</td></tr>`;
      return html;
    },
    renderTable(buffer) {
      let html = "";
      for (let i = 0; i < this.row; i++) {
        html += this.renderRow(buffer, i);
      }
      return html;
    },
    onScroll(data) {
      this.cur = this.viewport.offsetStart + data.value * this.col;
      let buffer = this.fetchData(this.cur, this.row * this.col);
      let table_html = this.renderTable(buffer);
      $(this.$vnode.elm)
        .find("tbody")
        .html(table_html);
    },
    update_viewport(reason) {
      let me = $(this.$vnode.elm);

      let count = this.viewport.offsetEnd - this.viewport.offsetStart;
      if (this.viewport.offsetLoc == 0)
        this.viewport.offsetLoc = this.viewport.offsetStart;
      this.cur = this.viewport.offsetLoc;

      //** 计算实际显示的行数 */
      let max_row = parseInt($(this.$vnode.elm).height() / 20);
      this.visible_cell = max_row * this.col;
      let needed_row = parseInt(count / this.col);
      if (needed_row != count / this.col) needed_row++;
      // let needed_height = needed_row * 20;
      this.row = Math.min(max_row, needed_row);
      if (this.row == 0) this.row = 1;

      console.log(this.row);

      //** 生成表格 */
      let buffer = this.fetchData(this.viewport.offsetLoc, this.row * this.col);
      let table_html = this.renderTable(buffer);
      me.find("tbody").html(table_html);

      //** 定位scroll */
      let scroll = this.$refs.scroll;

      //** 计算出每页所能显示的最大数据 */
      scroll.per = this.row;
      scroll.max = needed_row;
      // if (scroll.max != count / this.col) {
      //   scroll.max++;
      // }
      scroll.cur = 0;
      //** 计算滚动条的高度 */
      scroll.height = me.height();
      // if (needed_height < scroll.height) scroll.height = needed_height;
      if (this.header_visiable) {
        scroll.height -= 20;
      }
      //** 和table对齐 */
      scroll.height = scroll.height - (scroll.height % 20);
      scroll.setting();

      let jq_scroll = $(scroll.$vnode.elm);
      jq_scroll.css("top", this.header_visiable == false ? "0px" : "20px");
    }
  },
  watch: {
    viewport: {
      handler: function(newValue, oldValue) {
        this.viewport = newValue;
        this.update_viewport();
      },
      deep: true
    }
  },
  created: function() {},
  mounted: function() {
    /** vue组件则得到的是一个VueComponent对象，否则是原生dom对象 */
    let me = $(this.$vnode.elm);
    if (me.css("height") == "0px") {
      this.height = me.parent().height();
      me.height(this.height);
    }

    this.update_viewport();

    // let old_onresize = window.onresize;
    // window.onresize = function() {
    //   old_onresize();
    // };

    let old_onwheel = document.onmousewheel;
    let that = this;
    document.onmousewheel = function(e) {
      that.$refs.scroll.mouseWheel(e.wheelDelta < 0 ? true : false);
      if (old_onwheel != null) old_onwheel(e);
    };
  },
  components: {
    "rand-scroll": randScroll
  }
};
</script>

<style lang="stylus">
.hex-view-cell-td
  height 20px
  width 20px

.hex-view-cell-th
  border 0px
  color rgba(196, 196, 196, 1)
  height 20px
  width 20px

.hex-view-row-th 
  width 64px

.hex-view-ascii-col
  width 128px
  text-align left 
  border 0px
</style>