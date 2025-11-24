/**
 * CSS template literal tag function
 * Currently just returns the string, but enables syntax highlighting in editors
 */
export const css = (strings: TemplateStringsArray, ...values: unknown[]) => {
  return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
};
