import pecoff from "./pecoff";

export default {
	//** 参数包括页面名称和锚点名称 */
	triggerPanel: function (vue, args) {
		if (pecoff.getAnalysisData(args.name) == null) {
			return;
		}
		let tab_info = pecoff.ui.tab_data[args.name]
		vue.$store.commit("appendTab", tab_info);
		//** 如果是刚刚添加完，很可能还没渲染出来 */
		setTimeout(() => $(`#nav-${args.name}`).tab("show"), 100);
	}
}