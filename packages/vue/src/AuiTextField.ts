import { defineComponent, h } from 'vue';
import '@adyaui/core';

export const AuiTextField = defineComponent({
  name: 'AuiTextField',
  props: {
    label: String,
    value: String,
    placeholder: String,
    type: String,
    disabled: Boolean,
    readonly: Boolean,
    required: Boolean,
    error: Boolean,
    helperText: String,
    variant: {
      type: String as () => 'outlined' | 'filled' | 'standard',
      default: 'outlined'
    },
    size: {
      type: String as () => 'small' | 'medium' | 'large',
      default: 'medium'
    }
  },
  setup(props, { slots }) {
    return () => h('aui-textfield', props, slots.default?.());
  }
});
