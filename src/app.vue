<style>
	.container {
		width: 300px;
		margin: 50px auto;
		position: relative;
	}
	.date-editor {
		padding: 5px 10px;
		cursor: pointer;
		border-radius: 2px;
		border: 1px solid #CCC;
	}
	.date-editor:focus {
		border-color: #20A0FF;
	}
</style>

<template>
	<div class="container">
		<input type="text" class="date-editor" placeholder="选择日期" readonly v-model="dateValue" @focus="focus" @blur="blur">
		<calendar :show-date-picker.sync="showDatePicker" :time.sync="time" :date-value.sync="dateValue" v-if="showDatePicker" transition="calendar"></calendar>
	</div>
</template>

<script>
	import calendar from "../src/components/calendar.vue"

	export default {
		data() {
			return {
				showDatePicker: false,
				dateValue: "",
				time: 0,
				status: false
			}
		},
		components: {
			calendar
		},
		methods: {
			focus() {
				this.showDatePicker = true
			},
			blur() {
				if (this.status) {
					return
				}

				this.showDatePicker = false
			},
		},
		events: {
			change(value) {
				this.status = value
			}
		}
	}
</script>