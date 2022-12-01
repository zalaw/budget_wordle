<template>
  <div v-on:click.self="$emit('closeSettings')" class="settings-container">
		<div class="settings-div">
			<div  v-on:click.self="$emit('closeSettings')" class="close-settings">&times;</div>

			<div class="settings-row">
				<p>Mod intunecos</p>

				<label class="switch">
					<input type="checkbox" v-on:change="$emit('toggleDarkMode')" v-model="localSettings.darkMode" />
					<span class="slider"></span>
				</label>
			</div>

			<div class="settings-row">
				<p>Lungimea cuvantului</p>

				<div class="length-container">
					<div v-for="(item, index) in localSettings.lengths" :key="index" v-on:click="$emit('changeWordSize', item)" class="length" :class="{ 'length-selected': item == localSettings.size }">{{ item }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'SettingsComponent',
  props: ['settings'],
  data() {
    return {
      localSettings: this.settings
    }
  }
}
</script>

<style scoped>
.settings-container {
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

.settings-div {
  font-family: Arial;
  background-color: white;
  max-width: 640px;
  padding: 3em 2em;
  position: relative;
}

.close-settings {
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

.settings-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: .5em 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	transition: .3s;
	border-radius: 16px;
}

.switch input {
	display: none;
}

.slider::before {
	position: absolute;
	content: "";
	height: 20px;
	width: 20px;
	left: 3px;
	bottom: 3px;
	background-color: #fff;
	transition: .3s;
	border-radius: 10px;
}

input:checked + .slider {
	background-color: #b36200;
}

input:checked + .slider::before {
	transform: translateX(20px);
}

.length-container {
	display: flex;
	justify-content: space-evenly;
	gap: 1em;
	margin-left: 1em;
}

.length {
	width: 30px;
	height: 30px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: .3s;
}

.length:hover {
	background-color: #777;
}

.length-selected:hover {
  background-color: #b36200;
}

.length-selected {
	background-color: #b36200;
  color: white;
}
</style>