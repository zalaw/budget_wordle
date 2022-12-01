<template>
 <div class="info-modal">
    Cuvantu' asta nu exista in lista 🤔
  </div>
</template>

<script>
export default {
  name: 'InfoModalComponent',
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
.info-modal {
	background-color: #dd2c39;
	color: white;
	position: absolute;
	top: 10%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 1em;
	text-align: center;
}
</style>