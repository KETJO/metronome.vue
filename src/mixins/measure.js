const metronomeHandler = {
	data:()=>({
		beatCounter: 0,

		expected: 0,
		timeInterval: 0,
		timeOut: {},
		drift: 0,
	}),
	methods: {
		playStop(){
			this.isPlay=!this.isPlay;
			if(this.isPlay) this.timerStart();
			else this.timerStop();
		},
		timerStart(){
			this.timeInterval = 60/this.curVals.bpm*1000; 
			this.expected = Date.now() + this.timeInterval;
			this.timeOut = setTimeout(this.round, this.timeInterval)
		},
		timerStop(){
			clearTimeout(this.timeOut);
			this.visualStop();
			this.beatCounter=0;
		},
		round(){
			this.timeInterval = 60/this.curVals.bpm*1000; 
			this.totalStart();
			this.drift = Date.now()-this.expected;
			this.expected+=this.timeInterval;
			this.timeOut=setTimeout(this.round, this.timeInterval-this.drift)
		},
		totalStart(){
			if(this.beatCounter==this.curVals.beats) this.beatCounter=0;
			this.visualStart();
			this.soundStart();
			this.beatCounter++;
		},
		soundStart(){
			if(this.beatCounter==0&&this.curVals.sFirstBeat) this.sound.high.play()
			else this.sound.low.play()
		},
		visualStart(){
			const beats = document.querySelectorAll('.beat')
			const beat = beats[this.beatCounter]
			beats.forEach(beat=>{
				beat.classList.remove('beatGlow')
				beat.classList.remove('sfbGlow')
			})
			if(beat.classList.contains('sFbeat')) beat.classList.add('sfbGlow') 
			else beat.classList.add('beatGlow')
		},
		visualStop(){
			const beats = document.querySelectorAll('.beat')
			beats.forEach(beat=>{
				beat.classList.remove('beatGlow')
				beat.classList.remove('sfbGlow')
			})
		}
	},
}

export default metronomeHandler