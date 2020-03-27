<template>
  <div class="accordion catalog-panel h-100">
    <div class="card catalog">
      <div class="card-header nav-header">
        <button
          class="btn btn-link btn-block text-left mb-0 text-decoration-none"
          data-toggle="collapse"
          data-target="#file-overview"
        >文件概览</button>
      </div>
      <div id="file-overview" class="collapse show">
        <div class="card-body nav-list">
          <side-bar-item name="file-attr" title="文件属性" v-on:click.native="show_file_attr"></side-bar-item>
          <side-bar-item name="pe-attr" title="映像属性" v-on:click.native="show_pe_attr"></side-bar-item>
        </div>
      </div>
    </div>
    <div class="card catalog">
      <div class="card-header nav-header">
        <button
          class="btn btn-link btn-block text-left collapsed mb-0 text-decoration-none"
          data-toggle="collapse"
          data-target="#header-overview"
        >头部结构</button>
      </div>
      <div id="header-overview" class="collapse">
        <div class="card-body nav-list">
          <side-bar-item name="dos-header" title="DOS头部" v-on:click.native="show_dos_header" />
          <side-bar-item name="file-header" title="文件头部" v-on:click.native="show_file_header" />
          <side-bar-item name="opt-header" title="可选头部" v-on:click.native="show_optional_header" />
          <side-bar-item name="data-dirs" title="数据目录" v-on:click.native="show_data_dirs" />
          <side-bar-item name="sec-header" title="节表头部" v-on:click.native="show_section_header" />
        </div>
      </div>
    </div>
    <div class="card catalog">
      <div class="card-header nav-header">
        <button
          class="btn btn-link btn-block text-left collapsed mb-0 text-decoration-none"
          data-toggle="collapse"
          data-target="#data-directories"
        >数据目录</button>
      </div>
      <div id="data-directories" class="collapse">
        <div class="card-body nav-list">
          <side-bar-item name="import-dir" title="导入目录" v-on:click.native="show_import_directory" />
          <side-bar-item name="export-dir" title="导出目录" v-on:click.native="show_export_directory" />
          <side-bar-item
            name="delay-import-dir"
            title="延迟导入目录"
            v-on:click.native="show_delay_import_directory"
          />
          <side-bar-item name="reloc-dir" title="重定位表" v-on:click.native="show_reloc_directory" />
          <side-bar-item name="res-dir" title="资源目录" v-on:click.native="show_res_directory" />
          <side-bar-item name="dbg-dir" title="调试目录" v-on:click.native="show_dbg_directory" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pecoff from "./pecoff";
import sideBarItem from "../../public/component/side-bar-item";
import linkMgr from "./link-mgr";
export default {
  components: {
    "side-bar-item": sideBarItem
  },
  methods: {
    disable_link: function(link) {
      link.removeClass("list-group-item-action");
      link.removeAttr("href");
      link.removeAttr("data-toggle");
      link.addClass("disabled-link");
    },
    show_file_attr: function() {
      this.$store.commit("appendTab", {
        id_name: "file-attr",
        nav_id_name: "nav-file-attr",
        display_name: "文件属性"
      });
      setTimeout(() => $("#nav-file-attr").tab("show"), 100);
    },
    show_pe_attr: function() {
      this.$store.commit("appendTab", {
        id_name: "pe-attr",
        nav_id_name: "nav-pe-attr",
        display_name: "映像属性"
      });
      setTimeout(() => $("#nav-pe-attr").tab("show"), 100);
    },
    show_dos_header: function() {
      this.$store.commit("appendTab", {
        id_name: "dos-header",
        nav_id_name: "nav-dos-header",
        display_name: "DOS头部"
      });
      setTimeout(() => $("#nav-dos-header").tab("show"), 100);
    },
    show_file_header: function() {
      this.$store.commit("appendTab", {
        id_name: "file-header",
        nav_id_name: "nav-file-header",
        display_name: "文件头部"
      });
      setTimeout(() => $("#nav-file-header").tab("show"), 100);
    },
    show_optional_header: function() {
      this.$store.commit("appendTab", {
        id_name: "opt-header",
        nav_id_name: "nav-opt-header",
        display_name: "可选头部"
      });
      setTimeout(() => $("#nav-opt-header").tab("show"), 100);
    },
    show_data_dirs: function() {
      this.$store.commit("appendTab", {
        id_name: "data-dirs",
        nav_id_name: "nav-data-dirs",
        display_name: "数据目录"
      });
      setTimeout(() => $("#nav-data-dirs").tab("show"), 100);
    },
    show_section_header: function() {
      this.$store.commit("appendTab", {
        id_name: "sec-header",
        nav_id_name: "nav-sec-header",
        display_name: "节表头部"
      });
      setTimeout(() => $("#nav-sec-header").tab("show"), 100);
    },
    show_import_directory: function() {
      if (pecoff.getAnalysisData("import-dir") == null) {
        this.disable_link($("#import-dir-link"));
        $("#import-dir-link").text("导入目录（不存在）");
        this.$Message["warning"]({
          background: true,
          content: "没有找到导入目录"
        });
        return;
      }
      linkMgr.triggerPanel(this, { name: "import-dir" });
    },
    show_delay_import_directory: function() {
      if (pecoff.getAnalysisData("delay-import-dir") == null) {
        this.disable_link($("#delay-import-dir-link"));
        $("#delay-import-dir-link").text("延迟导入目录（不存在）");
        this.$Message["warning"]({
          background: true,
          content: "没有找到延迟导入目录"
        });
        return;
      }
      linkMgr.triggerPanel(this, { name: "delay-import-dir" });
    },
    show_export_directory: function() {
      if (pecoff.getAnalysisData("export-dir") == null) {
        this.disable_link($("#export-dir-link"));
        $("#export-dir-link").text("导出目录（不存在）");
        this.$Message["warning"]({
          background: true,
          content: "没有找到导出目录"
        });
        return;
      }
      linkMgr.triggerPanel(this, { name: "export-dir" });
    },
    show_reloc_directory: function() {
      if (pecoff.getAnalysisData("reloc-dir") == null) {
        this.disable_link($("#reloc-dir-link"));
        $("#reloc-dir-link").text("重定位表（不存在）");
        this.$Message["warning"]({
          background: true,
          content: "没有找到重定位目录"
        });
        return;
      }
      linkMgr.triggerPanel(this, { name: "reloc-dir" });
    },
    show_res_directory: function() {
      if (pecoff.getAnalysisData("res-dir") == null) {
        this.disable_link($("#res-dir-link"));
        $("#res-dir-link").text("资源目录（不存在）");
        this.$Message["warning"]({
          background: true,
          content: "没有找到资源目录"
        });
        return;
      }
      linkMgr.triggerPanel(this, { name: "res-dir" });
    },
    show_dbg_directory: function() {
      if (pecoff.getAnalysisData("dbg-dir") == null) {
        this.disable_link($("#dbg-dir-link"));
        $("#dbg-dir-link").text("调试目录（不存在）");
        this.$Message["warning"]({
          background: true,
          content: "没有找到调试目录"
        });
        return;
      }
      linkMgr.triggerPanel(this, { name: "dbg-dir" });
    }
  }
};
</script>

<style>
.no-padding {
  padding: 0px;
}
</style>
<style lang="stylus" scoped>
::-webkit-scrollbar
  display none

.catalog-panel
  background-color rgba(240, 240, 240, 1)
  overflow-y auto

.catalog
	border-width 0px
	border-top-left-radius 0px
	border-bottom-left-radius 0px
	border-top-right-radius 0px
	border-bottom-right-radius 0px

.nav-header 
	padding 4px
	background-color rgba(196, 196, 196, 1)
	border-bottom 0px

.nav-header
  >button
    font-weight bold
    color #4e4e4e!important
    user-select none

.nav-list
  padding 0px
  >a 
    background-color rgba(232, 232, 232, 1)

.nav-list-item
  border-left-width 0px
  border-right-width 0px
  &:hover
    background-color rgba(160,160,160,0.3)
    border-color rgba(0,0,0,0)

.nav-list-item.active {
	  background-color: #007bff;
    border-color: #007bff;
    color: #ffffff;
}

.nav-list-item
  &:first-child
    border-top-left-radius 0rem
    border-top-right-radius 0rem

.nav-list-item
  &:last-child
    border-bottom-left-radius 0px
    border-bottom-right-radius 0px
	  border-bottom-width 0px
</style>