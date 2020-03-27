<template>
  <div class="rand-scroll">
    <div class="rand-scroll-track"></div>
    <div
      class="rand-scroll-thumb"
      ref="thumb"
      v-on:mousedown="scroll_start"
      v-on:mousemove="scroll_move"
      v-on:mouseup="scroll_end"
      v-on:mouseout="scroll_out"
      v-bind:style="{height:thumb_height+'px',position:'relative'}"
    ></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      min_height: 8,
      scroll_state: 0,
      y: 0,
      top: 0,
      thumb_height: 0,

      //** 参数包括：最大值，每页能显示的值以及当前滑块定位到的起始位置 */
      max: 0,
      per: 0,
      cur: 0,
      height: 0,
      available_value: 0,
      available_height: 0,
      one_value: 0
    };
  },
  methods: {
    scroll_start: function(event) {
      if (event.button == 0) {
        this.scroll_state = 1;
        this.y = event.clientY;
      }
    },
    scroll_move: function(event) {
      if (this.scroll_state) {
        let thumb = $(event.currentTarget);
        //** 计算新的top = 老的top + 偏移 */
        let new_top = this.top + event.clientY - this.y;

        //** 边界条件判断 */
        if (new_top < 0) new_top = 0;
        if (new_top + thumb.height() > this.height)
          new_top = this.height - thumb.height();
        if (new_top == this.top) return;

        //** 记录当前状态并设置新的top */
        this.y = event.clientY;
        this.top = new_top;
        thumb.css("top", new_top + "px");

        //** 向外传递当前的Value */
        let event_data = {
          value: parseInt(
            this.available_value * (new_top / this.available_height)
          )
        };
        this.$emit("scroll", event_data);
      }
    },
    mouseWheel(direction) {
      let thumb = $(this.$refs.thumb);
      //** 计算新的top = 老的top + 偏移 */
      let new_top = this.top + (direction ? this.one_value : -this.one_value);

      //** 边界条件判断 */
      if (new_top < 0) new_top = 0;
      if (new_top + thumb.height() > this.height)
        new_top = this.height - thumb.height();
      if (new_top == this.top) return;

      //** 记录当前状态并设置新的top */
      this.top = new_top;
      thumb.css("top", new_top + "px");

      //** 向外传递当前的Value */
      let event_data = {
        value: parseInt(
          this.available_value * (new_top / this.available_height)
        )
      };
      this.$emit("scroll", event_data);
    },
    scroll_end: function(event) {
      this.scroll_state = 0;
    },
    scroll_out: function(event) {
      this.scroll_state = 0;
    },
    setting: function() {
      //** 计算滑块的高度 */
      let height = (this.height * this.per) / this.max;
      if (height < this.min_height) {
        height = this.min_height;
      } else if (height > this.height) {
        height = this.height;
      }
      this.thumb_height = height;

      //** 计算取值区间 */
      this.available_value = this.max - this.per;
      this.available_height = this.height - this.thumb_height;
      //** 每个value多少height，用在滚轮事件中 */
      this.one_value = this.available_height / this.available_value;

      //** 状态初始化 */
      this.top = 0;
      this.scroll_state = 0;
      this.y = 0;

      let thumb = $(this.$refs.thumb);
      let init_top = parseInt((this.height * this.cur) / this.max);
      thumb.css("top", init_top);

      //** 设置自身高度 */
      let me = $(this.$vnode.elm);
      me.height(this.height);
    }
  },
  mounted: function() {
    let me = $(this.$vnode.elm);
    let thumb = $(this.$refs.thumb);

    //** in case 后面没有设置高度 */
    this.height = me.height();

    //** 设置滑块的初始偏移 */
    thumb.css("top", 0);
  }
};
</script>

<style scoped>
.rand-scroll {
  width: 12px;
  background-color: rgba(0, 0, 0, 0);
}

.rand-scroll-thumb {
  width: 12px;
  background-color: gainsboro;
}

.rand-scroll-thumb:hover {
  width: 12px;
  background-color: gray;
}
</style>