/* eslint-disable */
import * as Tone from 'tone'

const metronomeHandler = {
	data:()=>({
		beatCounter: 0,
		vol: null,
		sounds: {
			click:{
				high:null,
				low:null 
			},
			hiHat:{
				high:null,
				low:null
			},
			rimShot:{
				hight:null,
				low:null
			} 
		},
		sndHigh: null,
		sndLow: null,
	}),
	computed: {
		curVals(){
			return this.currentSong
		}
	},
	mounted() {
		this.loadSound()
		this.setSound()
		Tone.Transport.bpm.value = this.curVals.bpm;

		const loop = new Tone.Loop(time => {
			if(this.beatCounter==this.curVals.beats) this.beatCounter=0;
			if(this.beatCounter==0&&this.curVals.sFirstBeat) this.sndHigh.start(time)
			else this.sndLow.start(time)
			Tone.Draw.schedule(() => {
				this.visualStart('beat')
				this.visualStart('hBeat')
				this.beatCounter++
			}, time);
		}, `${this.curVals.size}n`).start(0);

		this.$store.subscribe(mutation=>{
			switch(mutation.type){
				case 'CHANGE_CURRENT_VALS': 
					Tone.Transport.bpm.value = this.curVals.bpm;
					loop.interval=this.curVals.size+'n';
					break
				case 'CHANGE_SETTED_SOUND': 
					this.setSound()
					break
				case 'CHANGE_VOL': 
					this.vol.volume.value = this.volume;
					break
			}
		})
	},
	methods: {
		async playStop(){
			this.isPlay=!this.isPlay;
			if(this.isPlay) {
				await Tone.start();
				Tone.Transport.start()
			}
			else {
				Tone.Transport.stop()
				this.visualStop('beat')
				this.visualStop('hBeat')
				this.beatCounter=0;
			}
		},
		loadSound(){
			// this.sounds.click.high = new Tone.Player(`/metronome/media/sounds/click/1.mp3`)
			// this.sounds.click.low = new Tone.Player(`/metronome/media/sounds/click/0.mp3`)

			// this.sounds.hiHat.high = new Tone.Player(`/metronome/media/sounds/hi-hat/1.mp3`)
			// this.sounds.hiHat.low = new Tone.Player(`/metronome/media/sounds/hi-hat/0.mp3`)

			// this.sounds.rimShot.high = new Tone.Player(`/metronome/media/sounds/rim-shot/1.mp3`)
			// this.sounds.rimShot.low = new Tone.Player(`/metronome/media/sounds/rim-shot/0.mp3`)

			this.sounds.click.high = new Tone.Player(`../media/sounds/click/1.mp3`)
			this.sounds.click.low = new Tone.Player(`../media/sounds/click/0.mp3`)

			this.sounds.hiHat.high = new Tone.Player(`../media/sounds/hi-hat/1.mp3`)
			this.sounds.hiHat.low = new Tone.Player(`../media/sounds/hi-hat/0.mp3`)

			this.sounds.rimShot.high = new Tone.Player(`../media/sounds/rim-shot/1.mp3`)
			this.sounds.rimShot.low = new Tone.Player(`../media/sounds/rim-shot/0.mp3`)
		},
		setSound(){
			this.vol=new Tone.Volume(this.volume).toDestination();
			switch(this.settedSound){
				case'click':
					this.sndHigh=this.sounds.click.high
					this.sndLow=this.sounds.click.low
					break
				case'hi-hat':
					this.sndHigh=this.sounds.hiHat.high
					this.sndLow=this.sounds.hiHat.low
					break
				case'rim-shot':
					this.sndHigh=this.sounds.rimShot.high
					this.sndLow=this.sounds.rimShot.low
					break
			}
			this.sndHigh.connect(this.vol)
			this.sndLow.connect(this.vol)
		},
		visualStart(clsName){
			const beats = document.querySelectorAll(`.${clsName}`)
			const beat = beats[this.beatCounter]
			beats.forEach(beat=>{
				beat.classList.remove('beatGlow')
				beat.classList.remove('sfbGlow')
			})
			if(beat&&beat.classList.contains('sFbeat')) beat.classList.add('sfbGlow') 
			else beat.classList.add('beatGlow')
		},
		visualStop(clsName){
			setTimeout(() => {
				const beats = document.querySelectorAll(`.${clsName}`)
				beats.forEach(beat=>{
				beat.classList.remove('beatGlow')
				beat.classList.remove('sfbGlow')
			})
			}, 100);
			
		}
	},
}

export default metronomeHandler