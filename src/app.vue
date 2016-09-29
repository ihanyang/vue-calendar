<style>
	.container {
		width: 300px;
		margin: 50px auto;
		position: relative;
	}
	.date-editor {
		padding: 5px 10px;
		border-radius: 2px;
		border: 1px solid #CCC;
	}
	.date-editor:focus {
		border-color: #20A0FF;
	}
</style>

<template>
	<div class="container">
		<input type="text" class="date-editor" placeholder="选择日期" :disabled="disabled" v-model="dateValue" @focus="focus" @blur="blur">
		<calendar :show-date-picker.sync="showDatePicker" :date-value.sync="dateValue" v-if="showDatePicker" transition="calendar"></calendar>
	</div>
</template>

<script>
	import calendar from "../src/components/calendar.vue"

	export default {
		data() {
			return {
				showDatePicker: false,
				dateValue: "",
				disabled: false
			}
		},
		components: {
			calendar
		},
		methods: {
			focus() {
				this.showDatePicker = true

				this.disabled = true
			},
			blur() {
				this.disabled = false
			},
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
			//this.createDateText()
		}
	}
</script>