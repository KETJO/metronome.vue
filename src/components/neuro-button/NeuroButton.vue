<template lang="pug">
include ../../mixins/bemto/bemto
+b.neuro-button(@click.prevent="clickHandler", :class="computedClasses")
  span {{ title }}
</template>

<script>
export default {
  data: function() {
    return {
      localIsActive: false
    };
  },
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    isBordered: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    isScalable: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    returningPressed: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    },
    title: {
      type: String,
      required: false,
      default() {
        return "";
      }
    }
  },
  computed: {
    computedClasses() {
      let classes = [];
      const source = this.returningPressed ? this.localIsActive : this.isActive;
      source ? classes.push("neuro-button--pressed") : "";
      this.isBordered ? classes.push("neuro-button--bordered") : "";
      this.isScalable ? classes.push("neuro-button--scalable") : "";
      return classes.join(" ");
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click-handler");
      this.returningPressed ? this.blinkButton() : null;
    },
    blinkButton() {
      this.localIsActive = true;
      setTimeout(() => {
        this.localIsActive = false;
      }, 50);
    }
  }
};
</script>