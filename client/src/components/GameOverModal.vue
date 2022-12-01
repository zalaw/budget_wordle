<template>
  <div class="modal">
    <div class="modal-text">
      <div v-html="content"></div>
      <button v-on:click="$emit('playAgain')">Hai sa mai jucam</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameOverModalComponent',
  props: ['content'],
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 1em;
}

.modal-text {
	font-family: Arial;
	background-color: white;
	padding: 1em 2em;
	font-size: 1em;
	text-align: center;
}

.modal-text p {
	padding: .25em 0;
}

.modal-text button {
	border: none;
	outline: none;
	padding: .5em 1em;
	background-color: #6aaa64;
	color: white;
	cursor: pointer;
	margin-top: 1em;
}
</style>