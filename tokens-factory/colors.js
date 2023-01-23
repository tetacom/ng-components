module.exports = (dictionary) => {
  const utilities = [
    {
      name: "color",
      tokenType: "color",
      CSSprop: "color",
    },
    {
      name: "bg",
      tokenType: "color",
      CSSprop: "background-color",
    },
    {
      name: "border",
      tokenType: "color",
      CSSprop: "border-color",
    },
    {
      name: "fill",
      tokenType: "color",
      CSSprop: "fill",
    },
    {
      name: "button",
      tokenType: "color",
    },
  ];
  let output = '';
  dictionary.allProperties.forEach(function (prop) {
    if (prop.path.indexOf("chart") > 0) {
      return;
    }

    const tokenType = prop.path.slice(0, 1)[0];

    utilities.forEach(function (utility) {
      if (tokenType === utility.tokenType && utility.name !== "button") {
        const utilityClass =
          utility.name + "-" + prop.path[1] + "-" + prop.path[2];
        output += `.${utilityClass} {
                        ${utility.CSSprop}: var(--color-${prop.path[1]}-${prop.path[2]});
                        }\n\n`;
      }
    });
  });
  return output
}
