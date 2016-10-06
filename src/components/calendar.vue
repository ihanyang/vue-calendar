<style src="../css/calendar.css"></style>

<template>
	<div class="calendar-panel" @mouseenter="mouseenter" @mouseleave="mouseleave">
		<div class="calendar-panel-header">
			<div class="year" @click="selectYear">{{year}}年{{month}}月</div>
			<div class="prev-arrow" @click="prevMonth" v-if="stage === 0"></div>
			<div  class="next-arrow" @click="nextMonth" v-if="stage === 0"></div>
		</div>
		<div class="calendar-panel-content" v-if="stage === 0">
			<div class="calendar-header">
				<span v-for="item of weeks" v-text="item"></span>
			</div>
			<div class="calendar-content" @click="selectDate">
				<template track-by="$index" v-for="item of dates">
					<a href="javascript:;" class="prev-month" v-if="$index < firstDay - 1"  v-text="item"></a>

					<a href="javascript:;" class="available" :class="{selected: isSelected && item === today && $index > firstDay - 2 && $index < lastDay + firstDay - 1, today: isToday && item === currentDay && $index > firstDay - 2 && $index < lastDay + firstDay - 1}" v-if="$index > firstDay - 2 && $index < lastDay + firstDay - 1" v-text="(isToday && item === currentDay && $index > firstDay - 2 && $index < lastDay + firstDay - 1) ? '今天' : item" :data-index="item"></a>

					<a href="javascript:;" class="next-month" v-if="$index > lastDay + firstDay - 2" v-text="item"></a>
				</template>
			</div>
		</div>
		<div class="calendar-year" v-if="stage === 1">
			<!-- <div class="year-shadow-before"></div> -->
			<ul>
				<li v-for="item of yearList" v-text="item" @click="selectMonth(item)"></li>
			</ul>
			<!-- <div class="year-shadow-after"></div> -->
		</div>
		<div class="calendar-month" v-if="stage === 2">
			<ul>
				<li v-for="item of monthList" v-text="item" @click="render(item)"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			showDatePicker: {
				default: false,
				required: true
			},
			dateValue: {
				default: "",
				type: String,
				required: true
			},
			time: {
				default: 0,
				type: Number
			}
		},
		data() {
			return {
				dates: [],
				year: 0,
				currentYear: new Date().getFullYear(),
				month: 0,
				currentMonth: new Date().getMonth() + 1,
				today: 0,
				currentDay: new Date().getDate(),

				firstDay: 0,
				lastDay: 0,

				weeks: ["一", "二", "三", "四", "五", "六", "日"],
				stage: 0,
				yearList: [],
				monthList: []
			}
		},
		computed: {
			date() {
				return this.dateValue ? new Date(this.time) : new Date()
			},
			isSelected() {
				if (this.dateValue) {
					return this.year === + this.dateValue.substr(0, 4) && this.month === + this.dateValue.substr(5, 2)
				} else {
					return this.isToday
				}

			},
			isToday() {
				return this.year === this.currentYear && this.month === this.currentMonth
			}
		},
		methods: {
			prevYear() {
				this.date.setFullYear(this.date.getFullYear() - 1)

				this.getCal()
			},
			prevMonth() {
				if (this.date.getMonth() === 0) {
					this.date.setFullYear(this.date.getFullYear() - 1)

					this.date.setMonth(11)
				} else {
					this.date.setMonth(this.date.getMonth() - 1)
				}

				this.getCal()
			},
			nextMonth() {
				if (this.date.getMonth() + 1 > 11) {
					this.date.setFullYear(this.date.getFullYear() + 1)

					this.date.setMonth(0)
				} else {
					this.date.setMonth(this.date.getMonth() + 1)
				}

				this.getCal()
			},
			nextYear() {
				this.date.setFullYear(this.date.getFullYear() + 1)

				this.getCal()
			},
			getCal(month) {
				const dates = []

				let years = this.date.getFullYear()
				let months = this.date.getMonth()

				let firstDay = new Date(years, months, 1).getDay() // 当月第一天是星期几
				let lastDay = new Date(years, months + 1, 0).getDate() // 求出当月共有几天

				// 当月
				let count = 0
				let i = 1
				let index = firstDay - 1 - 1

				if (firstDay === 0) {
					index = 5
				}

				if (firstDay === 1) {
					index = 6
				}

				count = index

				while(count++ < lastDay + index) {
					dates[count] = i++
				}

				// 上个月
				let prevLastDay = new Date(years, months, 0).getDate() // 上个月共有几天
				let prevCount = firstDay - 1

				if (firstDay === 0) {
					prevCount = 6
				}

				if (firstDay === 1) {
					prevCount = 7
				}

				while (prevCount--) {
					dates[prevCount] = prevLastDay--
				}

				// 下个月
				let nextI = 0
				let nextCount = 42 - lastDay - (firstDay - 1)
				let nextIndex = lastDay + firstDay - 1

				if (firstDay === 0) {
					nextCount = 42 - lastDay - 6

					nextIndex = lastDay + 6
				}

				if (firstDay === 1) {
					nextCount = 42 - lastDay - 7

					nextIndex = lastDay + 7
				}

				while (nextCount--) {
					dates[nextIndex + nextI] = nextI + 1

					nextI++
				}

				this.dates = dates

				this.year = this.date.getFullYear()
				this.month = this.date.getMonth() + 1
				this.today = this.date.getDate()

				this.firstDay = firstDay

				if (firstDay === 0) {
					this.firstDay = 7
				}

				if (firstDay === 1) {
					this.firstDay = 8
				}

				this.lastDay = lastDay
			},
			selectYear() {
				this.stage = 1
			},
			selectMonth(value) {
				this.date.setFullYear(value)

				this.stage = 2
			},
			render(value) {
				value = parseInt(value) - 1

				this.stage = 0

				this.date.setMonth(value)

				this.getCal()
			},
			selectDate(e) {
				const day = e.target.dataset.index

				if (! day) {
					return
				}

				const date = new Date(this.date.getFullYear(), this.date.getMonth(), day)

				this.dateValue = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`.replace(/\b(\w)\b/g, "0$1")

				this.time = date.getTime()

				this.showDatePicker = false
			},
			mouseenter() {
				this.$dispatch("change", true)
			},
			mouseleave() {
				this.$dispatch("change", false)
			}
		},
		ready() {
			this.getCal()

			const prevYear = []
			const nextYear = []
			const currentYear = new Date().getFullYear()

			let i = 0

			while (i++ < 100) {
				prevYear.unshift(currentYear - i)
			}

			i = 0

			while (i++ < 100) {
				nextYear.push(currentYear + i)
			}

			this.yearList = [... prevYear, currentYear, ... nextYear]

			// 月份
			i = 0

			while (i++ < 12) {
				this.monthList.push(`${i}月`)
			}
		}
	}
</script>