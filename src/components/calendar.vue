<template>
	<div class="calendar-wrapper" transition="calendar">
		<div class="calendar-mask" @click="show = false"></div>
		<div class="calendar-container" :style="{top: top}">
			<date-header :date-text="dateText" :turn-type="turnType" :status.sync="status"></date-header>
			<pick-month :date-text.sync="dateText" v-if="status"></pick-month>
			<date-list :date-text="dateText" v-if="! status"></date-list>
			<date-footer :show.sync="show" :date="date"></date-footer>
		</div>
	</div>
</template>

<script>
	import dateHeader from "./date-header.vue"
	import dateFooter from "./date-footer.vue"
	import pickMonth from "./pick-month.vue"
	import dateList from "./date-list.vue"
	
	export default {
		props: ["show", "dateText"],
		data() {
			return {
				aa: new Date(this.dateText),
				status: true,
				top: 0,
				turnType: ""
			}
		},
		components: {
			dateHeader,
			dateFooter,
			pickMonth,
			dateList
		},
		computed: {
			date() {
				return new Date(this.dateText)
			},
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
		},
		watch: {
			dateText() {
				this.$nextTick(() => {
					let currentDay = + this.dateText.slice(-2)
					let date = this.date
					let year = date.getFullYear()
					let month = date.getMonth() + 1
					let day = date.getDate()

					let str = `${year}/${month}/${day}`

					this.dateText = str.replace(/\b(\w)\b/g, "0$1")

					day < currentDay ? this.turnType = "up" : this.turnType = "down"
				})
			}
		},
		ready() {
			let height = document.querySelector(".calendar-container").offsetHeight,
				docHeight = document.documentElement.clientHeight

			this.top = (docHeight - height) / 2 + "px"

			let turnTarget = document.querySelector(".calendar-header h2")

			turnTarget.addEventListener("animationend", (e) => {
				e.target.className = ""

				this.turnType = ""
			}, false)
		}
	}
</script>