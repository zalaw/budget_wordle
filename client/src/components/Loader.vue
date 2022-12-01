<template>
	<div class="loader-container">
		<span class="loader"></span>
	</div>
</template>

<script>
export default {
  name: 'LoaderComponent'
}
</script>

<style scoped>
.loader-container {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(38, 48, 56, 0.75);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10000;
}

.loader {
	width: 48px;
	height: 48px;
	border: 5px solid;
	border-color: white transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>