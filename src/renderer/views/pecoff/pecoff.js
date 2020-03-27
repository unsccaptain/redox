import {
  pecoff
} from "../../redox_proxy.node";

let cached_analysis = null; // = pecoff.create_analysis("C:/Users/mswin/Documents/notepad.exe");
let cached_data = {};

let tab_data = {
  "file-header": {
    id_name: "file-header",
    nav_id_name: "nav-file-header",
    display_name: "文件头部",
    weight: 10
  },
  "opt-header": {
    id_name: "opt-header",
    nav_id_name: "nav-opt-header",
    display_name: "可选头部",
    weight: 10
  },
  "data-dirs": {
    id_name: "data-dirs",
    nav_id_name: "nav-data-dirs",
    display_name: "数据目录",
    weight: 10
  },
  "sec-header": {
    id_name: "sec-header",
    nav_id_name: "nav-sec-header",
    display_name: "节表头部",
    weight: 10
  },
  "import-dir": {
    id_name: "import-dir",
    nav_id_name: "nav-import-dir",
    display_name: "导入目录",
    weight: 10
  },
  "export-dir": {
    id_name: "export-dir",
    nav_id_name: "nav-export-dir",
    display_name: "导出目录",
    weight: 10
  },
  "reloc-dir": {
    id_name: "reloc-dir",
    nav_id_name: "nav-reloc-dir",
    display_name: "重定位表",
    weight: 10
  },
  "delay-import-dir": {
    id_name: "delay-import-dir",
    nav_id_name: "nav-delay-import-dir",
    display_name: "延迟导入",
    weight: 10
  },
  "res-dir": {
    id_name: "res-dir",
    nav_id_name: "nav-res-dir",
    display_name: "资源目录",
    weight: 10
  },
  "dbg-dir": {
    id_name: "dbg-dir",
    nav_id_name: "nav-dbg-dir",
    display_name: "调试目录",
    weight: 10
  }
}

export default {
  get analysis() {
    return cached_analysis;
  },
  getAnalysisData: function (name) {
    if (this.analysis == null) {
      return null;
    }
    if (cached_data.hasOwnProperty(name) && !cached_data[name].dirty) {
      return cached_data[name].data;
    }
    let newly = {
      dirty: false
    };
    switch (name) {
      case 'dos-header':
        newly.data = this.analysis.get_dos_header();
        break;
      case 'file-header':
        newly.data = this.analysis.get_file_header();
        break;
      case 'opt-header':
        newly.data = this.analysis.get_optional_header();
        break;
      case 'sec-header':
        newly.data = this.analysis.get_section_table();
        break;
      case 'import-dir':
        newly.data = this.analysis.get_import_directory();
        break;
      case 'export-dir':
        newly.data = this.analysis.get_export_directory();
        break;
      case 'delay-import-dir':
        newly.data = this.analysis.get_delay_import_directory();
        break;
      case 'reloc-dir':
        newly.data = this.analysis.get_reloc_directory();
        break;
      case 'res-dir':
        newly.data = this.analysis.get_resource_directory();
        break;
      case 'dbg-dir':
        newly.data = this.analysis.get_debug_directory();
        break;
    }
    cached_data[name] = newly;
    return newly.data;
  },
  NewInstance(filename) {
    cached_analysis = pecoff.create_analysis(filename);
  },
  ui: {
    tab_data: tab_data
  }
};