/* eslint-disable */

import * as Tone from 'tone'

const metronomeHandler = {
	data:()=>({
		loop: {},
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
				high:null,
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
		//this.createLoop();
		// this.loop = new Tone.Loop(time => {
		// 	if(this.beatCounter==this.curVals.beats) this.beatCounter=0;
		// 	if(this.beatCounter==0&&this.curVals.sFirstBeat) this.sndHigh.start(time)
		// 	else this.sndLow.start(time)
		// 	Tone.Draw.schedule(() => {
		// 		this.visualStart('beat')
		// 		this.visualStart('hBeat')
		// 		this.beatCounter++
		// 	}, time);
		// }, `${this.curVals.size}n`).start(0);

		this.$store.subscribe(mutation=>{
			switch(mutation.type){
				case 'CHANGE_CURRENT_BPM':
					Tone.Transport.bpm.value = this.curVals.bpm;
				case 'CHANGE_CURRENT_VALS': 
					Tone.Transport.bpm.value = this.curVals.bpm;
					this.loop.interval=this.curVals.size+'n';
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
		createLoop(){
			this.loop = new Tone.Loop(time => {
				if(this.beatCounter==this.curVals.beats) this.beatCounter=0;
				if(this.beatCounter==0&&this.curVals.sFirstBeat) this.sndHigh.start(time)
				else this.sndLow.start(time)
				Tone.Draw.schedule(() => {
					this.visualStart('beat')
					this.visualStart('hBeat')
					this.beatCounter++
				}, time);
			}, `${this.curVals.size}n`).start(0);
		},
		async playStop(){
			this.isPlay=!this.isPlay;
			if(this.isPlay) {
				this.createLoop();
				await Tone.start();
				this.setSound()
				Tone.Transport.start()
			}
			else {
				Tone.Transport.stop()
				this.visualStop('beat')
				this.visualStop('hBeat')
				this.beatCounter=0;
				this.setSound();
				this.loop.dispose()
			}
		},
		loadSound(){
			this.vol=new Tone.Volume(this.volume).toDestination();

			this.sounds.click.high = new Tone.Player(`/metronome/media/sounds/click/1.mp3`).connect(this.vol)
			this.sounds.click.low = new Tone.Player(`/metronome/media/sounds/click/0.mp3`).connect(this.vol)

			this.sounds.hiHat.high = new Tone.Player(`/metronome/media/sounds/hi-hat/1.mp3`).connect(this.vol)
			this.sounds.hiHat.low = new Tone.Player(`/metronome/media/sounds/hi-hat/0.mp3`).connect(this.vol)

			this.sounds.rimShot.high = new Tone.Player(`/metronome/media/sounds/rim-shot/1.mp3`).connect(this.vol)
			this.sounds.rimShot.low = new Tone.Player(`/metronome/media/sounds/rim-shot/0.mp3`).connect(this.vol)

			// this.sounds.click.high = new Tone.Player(`../media/sounds/click/1.mp3`).connect(this.vol)
			// this.sounds.click.low = new Tone.Player(`../media/sounds/click/0.mp3`).connect(this.vol)

			// this.sounds.hiHat.high = new Tone.Player(`../media/sounds/hi-hat/1.mp3`).connect(this.vol)
			// this.sounds.hiHat.low = new Tone.Player(`../media/sounds/hi-hat/0.mp3`).connect(this.vol)

			// this.sounds.rimShot.high = new Tone.Player(`../media/sounds/rim-shot/1.mp3`).connect(this.vol)
			// this.sounds.rimShot.low = new Tone.Player(`../media/sounds/rim-shot/0.mp3`).connect(this.vol)
		},
		setSound(){
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
		},
		visualStart(clsName){
			const beats = document.querySelectorAll(`.${clsName}`)
			const beat = beats[this.beatCounter]
			beats.forEach(beat=>{
				beat.classList.remove('beatGlow')
				beat.classList.remove('sfbGlow')
			})
			if(beat&&beat.classList.contains('sFbeat')) beat.classList.add('sfbGlow') 
			else if(beat) beat.classList.add('beatGlow')
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