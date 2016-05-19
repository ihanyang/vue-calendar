<template>
	<div class="calendar-content">
		<div class="select-month">
			<span class="arrow" @click="prevMonth"></span>
			<div class="date">
				<span class="month" v-text="month"></span>
				<span class="year" v-text="year"></span>
			</div>
			<span class="arrow" @click="nextMonth"></span>
		</div>
		<table class="select-date">
			<thead>
				<tr class="week-header">
					<th v-for="week in weeks" v-text="week" track-by="$index"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="week in calendar">
					<td :class="{today: day.date.toDateString() === new Date().toDateString(), selected: day.day === this.bb, not: ! day.day || day.day === 32}" v-for="day in week" track-by="$index" v-text="day.day === 32 ? '' : day.day" @click="selectDate(day)"></td>
				</tr>
			</tbody>
		</table>
		<!-- <div class="select-date"></div> -->
	</div>
</template>

<script>
	export default {
		props: ["dateText"],
		data() {
			return {
				date: new Date(this.dateText),
				day: new Date().getDate(),
				weeks: ["S", "M", "T", "W", "T", "F", "S"],
				months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				bb: ""
			}
		},
		computed: {
			month() {
				return this.months[this.date.getMonth()]
			},
			year() {
				return this.date.getFullYear()
			},
			calendar() {
				let result = []
				let calendar = new Array(42)
				let first = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay()
				let days = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()

				for (let i = 0; i < days; i++, first++) {
					calendar[first] = i + 1
				}

				calendar = calendar.filter((v) => v)

				// 切割
				first -= days

				result[0] = []

				let currentDay = first

				for (let i = 0; i < 7 - currentDay; i++, first++) {
					result[0][first] = {
						day: i + 1,
						date: new Date(`${this.year}/${this.month}/${i + 1}`)
					}
				}

				while(currentDay > -1) {
					result[0][currentDay - 1] = {
						day: 32,
						date: new Date(`${this.year}/${this.month}/32`)
					}
					currentDay--
				}

				let count = Math.ceil((days - (7 - first)) / 7)
				let lastDay = result[0].slice(-1)[0].day

				for (let i = 1; i <= count; i++) {
					result[i] = new Array(7)

					for (let ii = 0; ii < 7; ii++) {
						//let lastDay = result[ii].slice(-1)[0]

						result[i][ii] = {
							day: calendar[lastDay + ii],
							date: new Date(`${this.year}/${this.month}/${calendar[lastDay + ii]}`)
						}
					}

					lastDay += 7
				}

				//console.dir(result)
				return result

			}
		},
		methods: {
			prevMonth() {
				this.bb = ""
				this.date = new Date(this.date.setMonth(this.date.getMonth() - 1))
			},
			nextMonth() {
				this.bb = ""
				this.date = new Date(this.date.setMonth(this.date.getMonth() + 1))
			},
			selectDate(value) {
				if (! value.day) {
					return
				}
				
				this.date = new Date(this.date.setDate(value.day))

				let date = this.date
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()

				let str = `${year}/${month}/${day}`

				this.dateText = str.replace(/\b(\w)\b/g, "0$1")

				this.bb = value.day
			}
		},
		ready() {
			this.bb = this.date.getDate()
		}
	}
</script>