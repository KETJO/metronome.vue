const mainHandler = {
	data:()=>({
		
	}),
	methods: {
		clickOut(clName) {
			const elem = document.querySelector(clName);
			elem.classList.add("neuroPressed");
			setTimeout(() => {
				elem.classList.remove("neuroPressed");
			}, 20);
		},
		changeBpm(direction) {
			this.clickOut(`.${direction}`);
			if (direction === "up" && this.bpm < 380) this.bpm++
			else this.bpm--;
		},
		tap(clName) {
			this.clickOut(clName);
		},
	},
	watch: {
		bpm() {
			const innerKnob = document.querySelector(".rs-handle");
			innerKnob.style.transform = `rotate(-${this.bpm - 10}deg)`;
			const newValues = { ...this._data };
			this.CHANGE_CURRENT_VALS(newValues);
		}
	},
	mounted() {

	},
}

export default mainHandler