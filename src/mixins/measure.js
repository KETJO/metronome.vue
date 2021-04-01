/* eslint-disable */
import * as Tone from 'tone'

const metronomeHandler = {
	data:()=>({
		beatCounter: 0,
		vol: null,
		sndHigh: null,
		sndLow: null,
	}),
	computed: {
		curVals(){
			return this.currentSong
		}
	},
	mounted() {
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
					console.log(this.volume);
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
		setSound(){
			console.log(this.volume);
			this.vol=new Tone.Volume(this.volume).toDestination();
			this.sndHigh = new Tone.Player(`../media/sounds/${this.settedSound}/1.mp3`).connect(this.vol)
			
			this.sndLow = new Tone.Player(`../media/sounds/${this.settedSound}/0.mp3`).connect(this.vol)
			
		},
		visualStart(clsName){
			const beats = document.querySelectorAll(`.${clsName}`)
			const beat = beats[this.beatCounter]
			beats.forEach(beat=>{
				beat.classList.remove('beatGlow')
				beat.classList.remove('sfbGlow')
			})
			if(beat.classList.contains('sFbeat')) beat.classList.add('sfbGlow') 
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