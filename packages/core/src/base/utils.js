/**
 * CSS template literal tag function
 * Currently just returns the string, but enables syntax highlighting in editors
 */
export const css = (strings, ...values) => {
    return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
};
//# sourceMappingURL=utils.js.map