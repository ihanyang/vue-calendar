import "./css/normalize.css"
import "./css/common.css"
//import "../src/css/calendar.css"

import Vue from "vue"
import App from "./app.vue"

const app = new Vue({
	el: "body",
	components: {
		App
	}
})