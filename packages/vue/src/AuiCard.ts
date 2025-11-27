import { defineComponent, h } from 'vue';
import '@adyaui/core';

export const AuiCard = defineComponent({
  name: 'AuiCard',
  props: {
    variant: {
      type: String as () => 'elevated' | 'outlined',
      default: 'elevated'
    },
    padding: {
      type: String as () => 'none' | 'sm' | 'md' | 'lg',
      default: 'md'
    }
  },
  setup(props, { slots }) {
    return () => h('aui-card', props, slots.default?.());
  }
});
