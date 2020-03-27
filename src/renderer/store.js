import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		top_tab_list: [],
		top_tab_map: {},
		loading_percent: 0
	},
	mutations: {
		appendTab(state, payload) {
			if (state.top_tab_map.hasOwnProperty(payload.id_name)) {
				return;
			}
			state.top_tab_map[payload.id_name] = state.top_tab_list.length;
			state.top_tab_list.push(payload);
		},
		removeTab(state, payload) {
			let tab = state.top_tab_list[payload.index];
			state.top_tab_list.splice(payload.index, 1);
			delete state.top_tab_map[tab.id_name];
		},
		addPercent(state, value) {
			state.loading_percent += value;
		}
	}
})

export default store