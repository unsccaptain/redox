<template>
  <div class="tab-pane fade display-panel h-100" id="pe-attr" role="tabpanel" v-if="pe_attr!=null">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title">ISA：</span>
      </div>
      <span class="form-control info-content">{{ pe_attr.x64?"AMD64":"X86" }}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title">映像基址：</span>
      </div>
      <span class="form-control info-content">{{ pe_attr.image_base }}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title">映像大小：</span>
      </div>
      <span class="form-control info-content">{{ pe_attr.size_of_image }}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title">执行入口：</span>
      </div>
      <span class="form-control info-content">{{ pe_attr.entry_point }}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title">文件对齐：</span>
      </div>
      <span class="form-control info-content">{{ pe_attr.file_align.value }}</span>
    </div>
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text info-title">内存对齐：</span>
      </div>
      <span class="form-control info-content">{{ pe_attr.sec_align.value }}</span>
    </div>
  </div>
</template>

<script>
import pecoff from "./pecoff";
export default {
  data() {
    return {
      pe_attr: pecoff.analysis.get_pe_attr()
    };
  },
  methods: {}
};
</script>