module.exports = (dictionary) => {
  let output = '';
  const a = dictionary.allProperties.filter((d) =>
    d.type === 'custom-radius'
  );

  //buttons
  output += `.button_brick {
          border-radius:${a.find((_) => _.name === 'radius-btn-brick').value.topLeft + 'px'};
        }\n\n`;
  output += `.button_circle{
          border-radius:${a.find((_) => _.name === 'radius-btn-circle').value.topLeft + 'px'};
          }\n\n`;
  output += `.button_rounded {
          border-radius:${a.find((_) => _.name === 'radius-btn-round').value.topLeft + 'px'};
          }\n\n`;

  //inputs
  ['input', 'select'].forEach((component) => {
    output += `.${component}_brick {
          border-radius:${a.find((_) => _.name === 'radius-field-brick').value.topLeft + 'px'};
        }\n\n`;
    output += `.${component}_circle{
          border-radius:${a.find((_) => _.name === 'radius-field-circle').value.topLeft + 'px'};
          }\n\n`;
    output += `.${component}_rounded {
          border-radius:${a.find((_) => _.name === 'radius-field-round').value.topLeft + 'px'};
          }\n\n`;

  });
  //message
  output += `.message_brick {
          border-top-right-radius:${a.find((_) => _.name === 'radius-base-brick').value.topLeft + 'px'};
          border-bottom-right-radius:${a.find((_) => _.name === 'radius-base-brick').value.topLeft + 'px'};
        }\n\n`;
  output += `.message_circle{
          border-radius:${a.find((_) => _.name === 'radius-base-circle').value.topLeft + 'px'};

          }\n
          .message_circle:before{
            border-top-left-radius: 100px;
            border-bottom-left-radius: 100px;
          }
          \n\n`;
  output += `.message_rounded {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-top-right-radius:${a.find((_) => _.name === 'radius-base-round').value.topLeft + 'px'};
          border-bottom-right-radius:${a.find((_) => _.name === 'radius-base-round').value.topLeft + 'px'};
          }\n
          .message_rounded:before{
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }\n\n`;

  //switch
  output += `.switch_brick {
          border-radius:${a.find((_) => _.name === 'radius-field-brick').value.topLeft + 'px'};
        }\n\n`;
  output += `.switch_circle{
          border-radius:${a.find((_) => _.name === 'radius-field-circle').value.topLeft + 'px'};
          }\n
          .switch_circle .switch-button{
            border-radius:${a.find((_) => _.name === 'radius-field-circle').value.topLeft + 'px'};
          }
          \n\n`;
  output += `.switch_rounded {
          border-radius:${a.find((_) => _.name === 'radius-field-round').value.topLeft + 'px'};
          }\n
          .switch_rounded .switch-button{
            border-radius:${a.find((_) => _.name === 'radius-field-round').value.topLeft + 'px'};
          }\n\n`;
  //another
  ['avatar', 'accordion', 'badge', 'chip', 'file', 'datepicker', 'hint', 'dropdown', 'navigation', 'switch', 'tag', 'tooltip'].forEach((component) => {
    output += `.${component}_brick {
          border-radius:${a.find((_) => _.name === 'radius-base-brick').value.topLeft + 'px'};
        }\n\n`;
    output += `.${component}_circle{
          border-radius:${a.find((_) => _.name === 'radius-base-circle').value.topLeft + 'px'};
          }\n\n`;
    output += `.${component}_rounded {
          border-radius:${a.find((_) => _.name === 'radius-base-round').value.topLeft + 'px'};
          }\n\n`;
  })
  return output
}
