<template>
  <div id="app" :class="{ 'darkmode': settings.darkMode }" v-on:keydown.esc="handleKeyPressed($event)">
		<Loader v-show="showLoader" />
		<Help v-if="showTutorial" v-on:closeTutorial="showTutorial = false" v-bind:tries="settings.tries" v-bind:size="settings.size" />
		<Settings v-if="showSettings" v-on:toggleDarkMode="toggleDarkMode()" v-on:closeSettings="showSettings = false" v-on:changeWordSize="changeWordSize" v-bind:settings="settings" />
		<GameOverModal @playAgain="playAgain" v-show="gameOver" v-bind:content="gameOverMessage" />
		<InfoModal v-show="showInfo" />
    
    <div class="main-container">
      <h1 class="heading">Wordle de buget 💩</h1>

      <div class="options-container">
				<span v-on:click="showTutorial = true, showSettings = false" class="help">?</span>
				<span v-on:click="showSettings = true, showTutorial = false" class="settings">S</span>
			</div>

      <div class="board-container">
        <div class="board">
          <div v-for="i in settings.tries" v-bind:key="i" class="board-row">
            <div v-for="j in settings.size" v-bind:key="j" class="tile"></div>
          </div>
        </div>
      </div>
      
      <div class="keys-container">
        <div v-for="(row, rowIndex) in keys" v-bind:key="rowIndex" class="keys-row">
          <div v-for="(key, keyIndex) in row" v-bind:key="keyIndex" v-on:click="handleKeyPressed(key)" v-bind:data-key="key" class="key">{{ key }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './components/Loader.vue'
import Help from './components/Help.vue'
import Settings from './components/Settings.vue'
import GameOverModal from './components/GameOverModal.vue'
import InfoModal from './components/InfoModal.vue'

import axios from 'axios'

export default {
  name: 'App',
  components: {
		Loader,
		Help,
		Settings,
		GameOverModal,
		InfoModal
  },
  data() {
    return {
			settings: {
				darkMode: false,
				size: 5,
				tries: 6,
				lengths: [ 4, 5, 6 ]
			},
      WORDS: [],
      WORD_TO_GUESS: '',
      keys: [ [ 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p' ], 
          [ 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l' ], 
          [ 'Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace' ] ],
      showTutorial: true,
      gameOver: false,
      correctGuess: false,
      showInfo: false,
      gameOverMessage: '',
      line: 0,
      index: 0,
      guess: '',
      showLoader: true,
			showSettings: false
    }
  },
  created() {
    this.settings.darkMode = localStorage.getItem('darkmode') === 'true' || false
		this.settings.size = parseInt(localStorage.getItem('size')) || 5
    window.addEventListener('keyup', e => this.handleKeyPressed(e.key))
  },
  async mounted() {
    await this.getWord()
  },
  methods: {
		changeWordSize: async function(size) {
			if (this.settings.size == size) return
			this.settings.size = size
			localStorage.setItem('size', this.settings.size)
			await this.playAgain()
		},
		toggleDarkMode: function() {
			localStorage.setItem('darkmode', this.settings.darkMode)
		},
    getWord: async function() {
      try {
        this.showLoader = true
        this.WORDS = []
        this.WORD_TO_GUESS = ''

        const response = await axios.get(`api/word/${this.settings.size}`)
        this.WORDS = response.data.words
        this.WORD_TO_GUESS = this.WORDS[response.data.index]

        this.showLoader = false
      } catch (err) {
        console.error(err)
      }
    },
    handleKeyPressed: function (key) {
      if (this.showTutorial || this.showLoader || this.showInfo || this.showSettings) return
			if (this.gameOver) return
			if (!this.keysConcatenated.includes(key)) return

			if (key == 'Enter') {
				this.handleSubmit()
			} else if (key == 'Backspace') { 
				this.handleRemove()
			} else { 
				this.handleAppend(key)
			}
		},
		handleSubmit: function () {
			if (this.index != this.settings.size) return
			
			if (!this.WORDS.includes(this.guess)) {
				this.showWordDoesNotExistInListModal()
				return
			}
			
			this.updateTilesAndKeys()
			
			if (this.correctGuess) {
				this.gameOver = true
				this.gameOverMessage = '<p>Bravo, esti tare 👈😎👉</p>'
			} else if (this.line + 1 == this.settings.tries) {
				this.gameOver = true
				this.gameOverMessage = `<p>Amu no, n-ai ghicit ♿</p><p>Cuvantul pe care trebuia sa-l descoperi era <b>${this.WORD_TO_GUESS}</b></p>`
			} else {
				this.line += 1
				this.index = 0
				this.guess = ''
			}
		},
		handleRemove: function () {
			if (this.index <= 0) return
			
			this.index -= 1
			this.guess = this.guess.slice(0, -1)
			
			this.toggleTile(this.line, this.index, '')
		},
		handleAppend: function (key) {
			if (this.index >= this.settings.size) return
			
			this.toggleTile(this.line, this.index, key)

			this.index += 1
			this.guess += key
		},
		toggleTile: function (line, index, key) {
			const tile = document.querySelectorAll('.board-row')[this.line].children[this.index]
			
			tile.textContent = key
			tile.classList.toggle('filled')
		},
		showWordDoesNotExistInListModal: function () {
			if (this.showInfo) return
			
			this.showInfo = true
			
			setTimeout(() => {
				this.showInfo = false
			}, 1000)
		},
		updateTilesAndKeys: function () {
			const tiles = [...document.querySelectorAll('.board-row')[this.line].children]

			let count = 0
			let used = {}
			
			for (let i = 0; i < this.WORD_TO_GUESS.length; i++) {
				if (used[this.WORD_TO_GUESS[i]] == null) {
					used[this.WORD_TO_GUESS[i]] = 1
				} else {
					used[this.WORD_TO_GUESS[i]] += 1
				}
			}

			// Mark correct positions
			for (let i = 0; i < this.guess.length; i++) {
				tiles[i].classList.remove('filled')
				const key = document.querySelector(`[data-key='${this.guess[i]}']`)
				
				if (this.guess[i] == this.WORD_TO_GUESS[i] && used[this.guess[i]] > 0) {
					tiles[i].classList.add('correct-position')
					key.classList.add('correct-position')
					count += 1
					used[this.guess[i]] -= 1
				}
			}
			
			// Mark present positions
			for (let i = 0; i < this.guess.length; i++) {
				tiles[i].classList.remove('filled')
				const key = document.querySelector(`[data-key='${this.guess[i]}']`)
				
				if (this.WORD_TO_GUESS.includes(this.guess[i]) && used[this.guess[i]] > 0) {
					tiles[i].classList.add('present')
					key.classList.add('present')
					used[this.guess[i]] -= 1
				}
			}
			
			// Mark absent positions
			for (let i = 0; i < this.guess.length; i++) {
				tiles[i].classList.remove('filled')
				const key = document.querySelector(`[data-key='${this.guess[i]}']`)
				
				if (this.guess[i].toUpperCase() == this.WORD_TO_GUESS[i] && used[this.guess[i]] > 0) {
					tiles[i].classList.add('correct-position')
					key.classList.add('correct-position')
					count += 1
				} else if (this.WORD_TO_GUESS.includes(this.guess[i].toUpperCase()) && used[this.guess[i]] > 0) {
					tiles[i].classList.add('present')
					key.classList.add('present')
				} else {
					tiles[i].classList.add('absent')
					key.classList.add('absent')
				}
				
				used[this.guess[i]] -= 1
			}

			this.correctGuess = count == this.guess.length
		},
		playAgain: async function () {
			this.line = 0
			this.index = 0
			this.guess = ''
			this.gameOver = false
			
			document.querySelectorAll('.tile').forEach(el => {
				el.classList = ['tile']
				el.textContent = ''
			})
	
			document.querySelectorAll('.key').forEach(el => {
				el.classList = ['key']
			})

			await this.getWord()
		}
  },
  computed: {
		keysConcatenated: function () {
			return [...this.keys[0]].concat([...this.keys[1]]).concat([...this.keys[2]])
		}
	}
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.absent {
	background-color: #787c7e !important;
	color: white;
	border: none !important;
}

.present {
	background-color: #c9b458 !important;
	color: white;
	border: none !important;
}

.correct-position {
	background-color: #6aaa64 !important;
	color: white;
	border: none !important;
}

html {
	height: 100%;
}

body {
	width: 100%;
	height: 100%;
}

#app {
	width: 100%;
	height: 100%;
}

.main-container {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 1em;
}

.options-container {
	display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem 0;
}

.help, .settings {
	width: 32px;
	height: 32px;
	border: 2px solid black;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	font-weight: bold;
	font-size: 1.5em;
	font-family: Monospace;
	cursor: pointer;
}

.heading {
	text-align: center;
	font-size: 1.5em;
	font-family: Arial;
}

.board-container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
	overflow: hidden;
	font-family: Monospace;
}

.board {
	display: flex;
	flex-direction: column;
	gap: .5em;
}

.board-row, .board-row-tutorial {
	display: flex;
	gap: .5em;
}

.tile, .tile-tutorial {
	width: 4vw;
	height: 4vw;
	min-width: 38px;
	min-height: 38px;
	border: 2px solid #ddd;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 200%;
	font-weight: bold;
	text-transform: uppercase;
}

.tile-tutorial {
	width: 1vw !important;
	height: 1vw !important;
	min-width: 32px;
	min-height: 32px;
	font-size: 100%;
}

.tile.filled, .tile-tutorial.filled {
	border: 2px solid black;
}

.keys-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: clamp(.25em, 1vw, .5em);
}

.keys-row {
	display: flex;
	gap: clamp(.25em, 1vw, .5em);
}

.key {
	background-color: #ddd;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	cursor: pointer;
	padding: 1em .75em;
	font-size: clamp(.75em, 1.25vw, 1.5em);
	font-family: Monospace;
	text-transform: uppercase;
}

.key:hover {
	opacity: .5;
}

.darkmode {
  background-color: #121213 !important;
}

.darkmode .tutorial, .darkmode .settings-div {
  background-color: #303031 !important;
  color: white;
}

.darkmode .help, .darkmode .settings {
  color: white;
  border-color: white;
}

.darkmode .heading {
  color: white !important;
}

.darkmode .tile, .darkmode .tile-tutorial {
  border-color:#888 !important;
  color: white;
}
</style>