<template>
  <!-- 顶部的导航栏 -->
  <ul class="nav nav-tabs" role="tablist" style="height: 36px;">
    <li class="page-label d-flex flex-row" v-for="(item, index) in top_tab_list" v-bind:key="index">
      <a
        class="nav-link tab-link"
        v-bind:id="item.nav_id_name"
        data-toggle="tab"
        v-bind:href="'#'+item.id_name"
        role="tab"
      >
        {{ item.display_name }}
        <button class="close-button" v-on:click="close_panel(index)">
          <img src="assets/cross.svg" type="image/svg+xml" height="10px" width="10px" />
        </button>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close_panel: function(index) {
      let tab_list = this.$store.state.top_tab_list;
      let id_name = tab_list[index].id_name;
      this.$store.commit("removeTab", {
        index: index
      });

      if (!$(`#${id_name}`).hasClass("active")) return;
      if (index > 0) {
        setTimeout(function() {
          $(`#${tab_list[index - 1].nav_id_name}`).tab("show");
        }, 100);
      } else if (tab_list.length != 0) {
        setTimeout(function() {
          $(`#${tab_list[0].nav_id_name}`).tab("show");
        }, 100);
      } else {
        $(`#${id_name}`).removeClass("active");
        $(`#${id_name}`).removeClass("show");
      }
    }
  },
  computed: {
    top_tab_list() {
      return this.$store.state.top_tab_list;
    }
  }
};
</script>

<style lang="stylus" scoped>
button 
    padding-left 5px
    padding-right  1px
    padding-top 0px 

ul 
  border 0px !important
  background-color  rgba(240, 240, 240, 1)
  box-shadow 0px 2px 5px #888888
  z-index 100
  overflow auto

li
  user-select none
  display inline-block

.tab-link
  border 1px solid #00000004 !important
  border-top-left-radius 0rem !important
  border-top-right-radius 0rem !important
  background-color rgba(224, 224, 224, 1)
  border-top-width 0px
  border-bottom-width 0px

.close-button 
  float right
  background none
  border none
</style>