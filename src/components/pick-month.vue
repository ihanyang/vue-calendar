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
					<td :class="{today: day.date.toDateString() === new Date().toDateString(), selected: day.day === this.currentDay, not: ! day.day || day.day === 32}" v-for="day in week" track-by="$index" v-text="day.day === 32 ? '' : day.day" @click="selectDate(day)"></td>
				</tr>
			</tbody>
		</table>
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
				currentDay: ""
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
				let calendar = []
				let date = this.date
				let year = this.year
				let month = this.month
				let first = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
				let days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

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
						date: new Date(`${year}/${month}/${i + 1}`)
					}
				}

				while(currentDay > -1) {
					result[0][currentDay - 1] = {
						day: 32,
						date: new Date(`${year}/${month}/32`)
					}
					currentDay--
				}

				let count = Math.ceil((days - (7 - first)) / 7)
				let lastDay = result[0].slice(-1)[0].day

				for (let i = 1; i <= count; i++) {
					result[i] = []

					for (let ii = 0; ii < 7; ii++) {
						result[i][ii] = {
							day: calendar[lastDay + ii],
							date: new Date(`${year}/${month}/${calendar[lastDay + ii]}`)
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
				this.currentDay = ""
				this.date = new Date(this.date.setMonth(this.date.getMonth() - 1))
			},
			nextMonth() {
				this.currentDay = ""
				this.date = new Date(this.date.setMonth(this.date.getMonth() + 1))
			},
			selectDate(value) {
				if (! value.day || value.day === 32) {
					return
				}

				this.date = new Date(this.date.setDate(value.day))

				let date = this.date
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()

				let str = `${year}/${month}/${day}`

				this.dateText = str.replace(/\b(\w)\b/g, "0$1")

				this.currentDay = value.day
			}
		},
		ready() {
			this.currentDay = this.date.getDate()
		}
	}
</script>