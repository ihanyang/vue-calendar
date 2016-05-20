<template>
	<div>
		<input type="text" class="input" v-model="dateText" @focus="show = true" v-el:input>
		<calendar :show.sync="show" :date-text.sync="dateText" v-if="show"></calendar>
	</div>
</template>

<script>
	import calendar from "../src/components/calendar.vue"

	export default {
		data() {
			return {
				show: false,
				dateText: "",
			}
		},
		components: {
			calendar
		},
		watch: {
			show(value) {
				if (value) {
					this.$els.input.disabled = true
				} else {
					this.$els.input.disabled = false
				}
			}
		},
		methods: {
			createDateText() {
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()

				let str = `${year}/${month}/${day}`

				this.dateText = str.replace(/\b(\w)\b/g, "0$1")
			}
		},
		ready() {
			this.createDateText()
		}
	}
</script>