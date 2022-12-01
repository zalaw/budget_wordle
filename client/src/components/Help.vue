<template>
	<div v-on:click.self="$emit('closeTutorial')" class="tutorial-container">
		<div class="tutorial">
			<div v-on:click="$emit('closeTutorial')" class="close-tutorial">&times;</div>

			<p>Ghiceste cuvantul in {{ tries }} incercari.</p>
			<p>Fiecare incercare trebuie sa fie un cuvant valid de {{ size }} litere in limba romana. Apasa pe ENTER pentru a-l verifica.</p>
			<p>Dupa fiecare incercare, culoarea literelor se va schimba pentru a-ti arata cat de aproape esti de cuvantul pe care trebuie sa-l gasesti.</p>

			<hr>

			<h1>Exemple</h1>

			<div class="board-row-tutorial">
				<div class="tile-tutorial filled correct-position">O</div>
				<div class="tile-tutorial filled">P</div>
				<div class="tile-tutorial filled">T</div>
				<div class="tile-tutorial filled">I</div>
				<div class="tile-tutorial filled">C</div>
			</div>

			<p>Litera <b>O</b> se afla in cuvant si este pe pozitia corecta</p>

			<div class="board-row-tutorial" style="margin-top: 1em;">
				<div class="tile-tutorial filled">S</div>
				<div class="tile-tutorial filled">I</div>
				<div class="tile-tutorial filled present">G</div>
				<div class="tile-tutorial filled">L</div>
				<div class="tile-tutorial filled">A</div>
			</div>

			<p>Litera <b>G</b> se afla in cuvant dar nu este pe pozitia corecta</p>

			<div class="board-row-tutorial" style="margin-top: 1em;">
				<div class="tile-tutorial filled">D</div>
				<div class="tile-tutorial filled">A</div>
				<div class="tile-tutorial filled">T</div>
				<div class="tile-tutorial filled absent">O</div>
				<div class="tile-tutorial filled">R</div>
			</div>

			<p>Litera <b>O</b> nu se afla in cuvant pe nicio pozitie</p>
		</div>
	</div>
</template>

<script>
export default {
  name: 'HelpComponent',
  props: [ 'tries', 'size' ]
}
</script>

<style scoped>
.tutorial-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgb(0, 0, 0, 0.25);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
}

.tutorial {
	font-family: Arial;
	background-color: white;
	max-width: 640px;
	padding: 3em 2em;
	position: relative;
	overflow: auto;
	max-height: 80%;
}

.close-tutorial {
	position: absolute;
	top: .25em;
	right: .25em;
	font-size: 2em;
	cursor: pointer;
	width: 32px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
}

.tutorial p {
	padding: .25em 0;
}

.tutorial hr {
	color: #eee;
	margin: .5em 0;
}

.tutorial h1 {
	font-size: 1.25em;
	margin-bottom: .5em;
}
</style>