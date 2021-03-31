const audioWorker = new Worker("../audioworker.js");
const metronomeHandler = {
	data:()=>({
		beatCounter: 0,

		expected: 0,
		timeInterval: 0,
		sizeCoeficient: 1,
		timeOut: {},
		drift: 0,
	}),
	computed: {
		
	},
	mounted() {
		audioWorker.onmessage = e=> {
			if (e.data == "tick") {
				console.log("tick!");
				this.totalStart()
			}
			else{
				console.log("message: " + e.data);
			}
		}
	},
	methods: {
		playStop(){
			this.isPlay=!this.isPlay;
			if(this.isPlay) this.start();
			else this.stop();
		},
		updateSizeCoeficent(){
			const size = Number(this.curVals.size);
			switch(size) {
				case(2): 
					this.sizeCoeficient=0.5
					break
				case(4): 
					this.sizeCoeficient=1
					break
				case(8): 
					this.sizeCoeficient=2
					break
				case(16): 
					this.sizeCoeficient=4
					break
			}
		},
		start(){
			this.updateSizeCoeficent();
			this.timeInterval = 60/this.curVals.bpm*1000/this.sizeCoeficient; 
			audioWorker.postMessage({"interval":this.timeInterval});
			audioWorker.postMessage("start");
		},
		totalStart(){
			if(this.beatCounter==this.curVals.beats) this.beatCounter=0;
			this.visualStart('beat')
			this.visualStart('hBeat')
			this.soundStart()
			this.beatCounter++
		},
		stop(){
			audioWorker.postMessage("stop");
			this.visualStop('beat')
			this.visualStop('hBeat')
			this.beatCounter=0
		},
		soundStart(){
			if(this.beatCounter==0&&this.curVals.sFirstBeat) this.sound.high.play()
			else this.sound.low.play()
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
			const beats = document.querySelectorAll(`.${clsName}`)
			beats.forEach(beat=>{
				beat.classList.remove('beatGlow')
				beat.classList.remove('sfbGlow')
			})
		}
	},
}

export default metronomeHandler