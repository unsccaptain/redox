<template>
  <div id="scrollArea" class="clusterize-scroll">
    <table>
      <tbody id="contentArea" class="clusterize-content">
        <tr class="clusterize-no-data">
          <td>Loading data…</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Clusterize from "../clusterize.js/clusterize.min";
import func from "../../../../vue-temp/vue-editor-bridge";
export default {
  props: {
    fetchData: {
      type: Function,
      default: function(offset) {}
    },
    col: {
      type: Number,
      default: 16
    }
  },
  data: {
    clusterize: null
  },
  methods: {
    cellAscii(data, row) {
      let offset = this.col * row;
      let ascii = "";
      for (let i = 0; i < this.col; i++) {
        let index = offset + i;
        if (index < data.length) {
          let code = data[index];
          ascii += code >= 32 && code <= 127 ? String.fromCharCode(code) : ".";
        }
      }
      return ascii;
    },
    packageData(raw) {
      let htmlStr = "";
      for (let i = 0; i < raw.length / this.col; i++) {
        htmlStr += "<tr><td>";
        for (let j = 0; j < this.col; j++) {
          htmlStr += raw.toString(16) + "  ";
        }
        htmlStr += "</td><td>";
        htmlStr += cellAscii(raw);
        htmlStr += "</td><tr>";
      }
      return htmlStr;
    }
  },
  mounted() {
    this.clusterize = new Clusterize({
      rows: fetchData,
      scrollId: "scrollArea",
      contentId: "contentArea",
      callbacks: {
        clusterWillChange: function() {},
        clusterChanged: function() {},
        scrollingProgress: function(progress) {}
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
td
  height 20px
  width 20px
  text-align right

th
  border 0px
  color rgba(196, 196, 196, 1)
  height 20px
  width 20px
  text-align right

.row-th 
  width 64px

.ascii-col
  width 128px
  text-align left 
  border 0px
</style>