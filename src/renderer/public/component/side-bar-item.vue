<template>
  <a
    class="list-group-item list-group-item-action nav-list-item"
    :href="`#${name}`"
    :id="`${name}-link`"
    v-on:click="item_click(`${name}-link`)"
  >{{ title }}</a>
</template>

<script>
//** FIXME：丑陋的方法 */
let active_side_bar = "";

export default {
  props: ["name", "title"],
  methods: {
    item_click(id_name) {
      if (active_side_bar != "") {
        $(`#${active_side_bar}`).removeClass("active");
      }
      $(`#${id_name}`).addClass("active");
      active_side_bar = id_name;
    }
  }
};
</script>

<style lang="stylus" scoped>
.nav-list-item
  border-left-width 0px
  border-right-width 0px
  user-select none
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