const controls = {
  data: () => ({
    bpmHistory: [120],
    taps: [],
    isFirstTap: true,
  }),

  methods: {
    // validate() {
    //   const str = String(this.song.bpm);
    //   if (str.match(/^\d+$/) || str === "") {
    //     if (this.song.bpm < 20) {
    //       this.$refs.infoModal.textContent = "min value 20";
    //     } else if (this.song.bpm > 300) {
    //       this.$refs.infoModal.textContent = "max value 300";
    //       this.song.bpm = this.bpmHistory[this.bpmHistory.length - 1];
    //     } else {
    //       this.$refs.infoModal.textContent = "";
    //     }
    //     this.bpmHistory.push(this.bpm);
    //   } else this.song.bpm = this.bpmHistory[this.bpmHistory.length - 1];
    // },
    totalValid() {
      if (this.song.title.length > 0 && this.song.bpm >= 20)
        this.isValid = true;
      else this.isValid = false;
    },
    clickOut(clName) {
      console.log("clicked out");
      const elem = document.querySelector(clName);
      elem.classList.add("neuroPressed");
      setTimeout(() => {
        elem.classList.remove("neuroPressed");
      }, 20);
    },
    changeVol() {
      this.CHANGE_VOL(this.vol);
    },
    changeBpm(direction) {
      this.clickOut(`.${direction}`);
      if (direction === "up" && this.song.bpm < 300) this.song.bpm++;
      else this.song.bpm--;
    },
    tap(clName) {
      this.clickOut(clName);
      this.taps.push(Math.floor(new Date().getTime() / 10));
      if (this.taps.length >= 2) {
        if (this.taps.length > 24) this.taps.shift();
        const dif = this.taps[this.taps.length - 1] - this.taps[0];
        const interval = dif / this.taps.length / 100;
        let result = Math.floor(60 / interval);
        if (result >= 300) result = 300;
        this.tapBpm = result;
      }
      if (this.isFirstTap) {
        setTimeout(() => {
          this.isFirstTap = true;
          this.taps = [];
        }, 8000);
      }
      this.isFirstTap = false;
    },
    markAsPressed(index, elClass) {
      const arr = document.querySelectorAll(`${elClass}`);
      arr.forEach((item) => {
        item.classList.remove("neuroPressed");
        const markItem = item.querySelector(`label`);
        if (markItem.innerText == index)
          item.classList.add("neuro-button--pressed");
      });
    },
    // neuroBtnStyleHandler() {
    //   const buttons = document.querySelectorAll(".neuro-button");
    //   buttons.forEach((button) => {
    //     console.log(button);
    //     button.classList.remove("neuro-button--pressed");
    //     button.addEventListener("click", () => {
    //       button.classList.toggle("neuro-button--pressed");
    //     });
    //   });
    // },
  },
};

export default controls;
