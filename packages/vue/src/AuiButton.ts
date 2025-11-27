import { defineComponent, h } from 'vue';
import '@adyaui/core';

export const AuiButton = defineComponent({
  name: 'AuiButton',
  props: {
    variant: {
      type: String as () => 'primary' | 'secondary' | 'outlined' | 'text',
      default: 'primary'
    },
    size: {
      type: String as () => 'small' | 'medium' | 'large',
      default: 'medium'
    },
    disabled: Boolean,
    loading: Boolean
  },
  setup(props, { slots }) {
    return () => h('aui-button', props, slots.default?.());
  }
});
