<template>
	<footer class="calendar-footer">
		<button @click="show = false">cancel</button>
		<button @click="ok">ok</button>
	</footer>
</template>

<script>
	export default {
		props: ["show", "date"],
		methods: {
			ok() {
				let date = this.date
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()

				let str = `${year}/${month}/${day}`

				this.dateText = str.replace(/\b(\w)\b/g, "0$1")

				this.show = false
			}
		}
	}
</script>