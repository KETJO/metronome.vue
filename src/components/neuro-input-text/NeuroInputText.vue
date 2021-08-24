<template lang="pug">
include ../../mixins/bemto/bemto
+b.neuro-input-text(@click="clickHandler")
  +e.label.LABEL
    label(v-if) {{ label }}
  +e.input
    input(
      :type="inputType",
      :value="val",
      :placeholder="placeholder",
      @input="inputHandler"
    )
  +e.message(:class="messageModifier") {{ message }}
</template>

<script>
export default {
  computed: {
    messageModifier() {
      return `neuro-input-text__message--${this.messageType}`;
    }
  },
  data: () => ({}),
  props: {
    val: {
      type: [String, Number],
      required: false,
      default() {
        return "";
      }
    },
    label: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    placeholder: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    message: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    messageType: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    inputType: {
      type: String,
      required: false,
      default() {
        return "text";
      }
    }
  },
  methods: {
    clickHandler() {
      this.$emit("click-handler");
    },
    inputHandler(event) {
      const value = event?.target ? event.target.value : event;
      this.$emit("input-handler", { value });
    }
  }
};
</script>