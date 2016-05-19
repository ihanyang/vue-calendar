<template>
	<div class="select-year">
		<ol>
			<li :class="{active: year === + dateText.substr(0, 4)}" v-for="year in years" track-by="$index" v-text="year" @click="selectYear(year)"></li>
		</ol>
	</div>
</template>

<script>
	export default {
		props: ["dateText"],
		data() {
			return {
				years: []
			}
		},
		methods: {
			createYearsList() {
				let year = + this.dateText.substr(0, 4)
				let array = []
				let i = 100

				while(i) {
					array.push(year - i)
					i--
				}

				i = 0

				while(i < 100) {
					array.push(year + i)
					i++
				}

				this.years = array
			},
			selectYear(year) {
				this.dateText = year + this.dateText.slice(4)
			}
		},
		ready() {
			this.createYearsList()

			this.$nextTick(() => {
				this.$el.scrollTop = this.years.indexOf(+ this.dateText.substr(0, 4)) * 40 - 130
			})
		}
	}
</script>