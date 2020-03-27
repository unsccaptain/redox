<template>
  <div
    class="tab-pane fade display-panel h-100"
    id="data-dirs"
    role="tabpanel"
    v-if="optional_header!=null"
  >
    <table class="table display-table table-hover">
      <thead>
        <tr>
          <th scope="col" style="width: 30%;">目录名</th>
          <th scope="col" style="width: 20%;">VisualAddress</th>
          <th scope="col" style="width: 20%;">Size</th>
          <th scope="col" style="width: 20%;">所属节</th>
        </tr>
      </thead>
      <tr>
        <td>
          <a v-if="export_dir_exist" href="#" v-on:click="show_export">IMAGE_DIRECTORY_ENTRY_EXPORT</a>
          <p v-else>IMAGE_DIRECTORY_ENTRY_EXPORT</p>
        </td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_EXPORT.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_EXPORT.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_EXPORT.VirtualAddress.field_value.value) }}
        </td>
      </tr>
      <tr>
        <td>
          <a v-if="import_dir_exist" href="#" v-on:click="show_import">IMAGE_DIRECTORY_ENTRY_IMPORT</a>
          <p v-else>IMAGE_DIRECTORY_ENTRY_IMPORT</p>
        </td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_IMPORT.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_IMPORT.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_IMPORT.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>
          <a v-if="res_dir_exist" href="#" v-on:click="show_resource">IMAGE_DIRECTORY_ENTRY_RESOURCE</a>
          <p v-else>IMAGE_DIRECTORY_ENTRY_RESOURCE</p>
        </td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_RESOURCE.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_RESOURCE.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_RESOURCE.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>IMAGE_DIRECTORY_ENTRY_EXCEPTION</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_EXCEPTION.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_EXCEPTION.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_EXCEPTION.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>IMAGE_DIRECTORY_ENTRY_SECURITY</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_SECURITY.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_SECURITY.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_SECURITY.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>
          <a v-if="reloc_dir_exist" href="#" v-on:click="show_reloc">IMAGE_DIRECTORY_ENTRY_BASERELOC</a>
          <p v-else>IMAGE_DIRECTORY_ENTRY_BASERELOC</p>
        </td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_BASERELOC.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_BASERELOC.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_BASERELOC.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>
          <a v-if="dbg_dir_exist" href="#" v-on:click="show_debug">IMAGE_DIRECTORY_ENTRY_DEBUG</a>
          <p v-else>IMAGE_DIRECTORY_ENTRY_DEBUG</p>
        </td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_DEBUG.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_DEBUG.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_DEBUG.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>IMAGE_DIRECTORY_ENTRY_ARCHITECTURE</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_ARCHITECTURE.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_ARCHITECTURE.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_ARCHITECTURE.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>IMAGE_DIRECTORY_ENTRY_GLOBALPTR</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_GLOBALPTR.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_GLOBALPTR.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_GLOBALPTR.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>IMAGE_DIRECTORY_ENTRY_TLS</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_TLS.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_TLS.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_TLS.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_LOAD_CONFIG.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_BOUND_IMPORT.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>IMAGE_DIRECTORY_ENTRY_IAT</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_IAT.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_IAT.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_IAT.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
      <tr>
        <td>
          <a
            v-if="delay_import_exist"
            href="#"
            v-on:click="show_delay_import"
          >IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT</a>
          <p v-else>IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT</p>
        </td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT.VirtualAddress.field_value }}</td>
        <td>{{ optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT.Size.field_value }}</td>
        <td>
          {{ pecoff.analysis.get_rva_owner(
          optional_header.data_dirs.IMAGE_DIRECTORY_ENTRY_DELAY_IMPORT.VirtualAddress.field_value.value)
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import pecoff from "./pecoff";
import linkMgr from "./link-mgr";
export default {
  data() {
    return {
      optional_header: pecoff.analysis.get_optional_header(),
      pecoff: pecoff,
      export_dir_exist: pecoff.getAnalysisData("export-dir") != null,
      import_dir_exist: pecoff.getAnalysisData("import-dir") != null,
      res_dir_exist: pecoff.getAnalysisData("res-dir") != null,
      reloc_dir_exist: pecoff.getAnalysisData("reloc-dir") != null,
      dbg_dir_exist: pecoff.getAnalysisData("dbg-dir") != null,
      delay_import_exist: pecoff.getAnalysisData("delay-import-dir") != null
    };
  },
  methods: {
    show_export: function() {
      linkMgr.triggerPanel(this, { name: "export-dir" });
    },
    show_import: function() {
      linkMgr.triggerPanel(this, { name: "import-dir" });
    },
    show_resource: function() {
      linkMgr.triggerPanel(this, { name: "res-dir" });
    },
    show_reloc: function() {
      linkMgr.triggerPanel(this, { name: "reloc-dir" });
    },
    show_debug: function() {
      linkMgr.triggerPanel(this, { name: "dbg-dir" });
    },
    show_delay_import: function() {
      linkMgr.triggerPanel(this, { name: "delay-import-dir" });
    }
  }
};
</script>