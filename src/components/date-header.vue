<template>
	<header class="calendar-header">
		<p :class="{active: ! status}" v-text="dateText.substr(0, 4)" @click="status = false"></p>
		<h2 :class="{active: status, up: turnType === 'up', down: turnType === 'down'}" v-text="week + ',' + month + ' ' + day" @click="status = true"></h2>
	</header>
</template>

<script>
	export default {
		props: ["status", "dateText", "turnType"],
		computed: {
			week() {
				let array = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
				let day = new Date(this.dateText).getDay()

				return array[day]
			},
			month() {
				let array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
				let month = new Date(this.dateText).getMonth()

				return array[month]
			},
			day() {
				return this.dateText.slice(-2)
			}
		}
	}
</script>