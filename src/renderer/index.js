import Vue from 'vue'
import router from './router/router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import blankPanel from './blank.vue'
import mainFrame from './views/main-frame'
import store from './store'
import pecoff from './views/pecoff/pecoff'
import style from './assets/style'

Vue.use(ViewUI)

let app = new Vue({
	store,
	router,
	components: {
		'blank-panel': blankPanel,
		'main-frame': mainFrame
	},
	data() {
		return {}
	},
	created() {
		if (session.filename != "") {
			pecoff.NewInstance(session.filename);
			document.title = `Redox ${session.filename}`
		}
	},
	mounted: function () {
		// FIXME:目前，把需要调整高度的只能硬编码进来
		// 怎样能把CSS也做成响应式？？
		let old_resize = window.onresize;
		window.onresize = function () {
			$('#panel-layer').css("max-height",
				document.documentElement.clientHeight - 36);
			$('#reloc-table').css("max-height",
				document.documentElement.clientHeight - 36);
			$('#reloc-thunk-table').css("max-height",
				document.documentElement.clientHeight - 36);
			$('#import-table').height(
				(document.documentElement.clientHeight - 36) / 2);
			$('#import-list').height(
				(document.documentElement.clientHeight - 36) / 2);
			$('#delay-import-table').height(
				(document.documentElement.clientHeight - 36) / 2);
			$('#delay-import-list').height(
				(document.documentElement.clientHeight - 36) / 2);
			if (old_resize != null)
				old_resize.call(window);
		}
		$('#panel-layer').css("max-height",
			document.documentElement.clientHeight - 36);
		$('#reloc-table').css("max-height",
			document.documentElement.clientHeight - 36);
		$('#reloc-thunk-table').css("max-height",
			document.documentElement.clientHeight - 36);
		$('#import-table').height(
			(document.documentElement.clientHeight - 36) / 2);
		$('#import-list').height(
			(document.documentElement.clientHeight - 36) / 2);
		$('#delay-import-table').height(
			(document.documentElement.clientHeight - 36) / 2);
		$('#delay-import-list').height(
			(document.documentElement.clientHeight - 36) / 2);
	}
}).$mount('#app')