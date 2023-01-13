const StyleDictionary = require("style-dictionary");
const tokensJson = require(__dirname + "/figma-tokens/tokens.json");

// Look for args passed on the command line
const args = require("minimist")(process.argv.slice(2));
const themes = args.theme ? args.theme.split(",") : ["baselight", "basedark"];

const getStyleDictionaryBaseConfig = () => {
  return {
    log: "warn",
    source: [`./tokens/global.json`],
    platforms: {
      css: {
        transformGroup: "custom/css",
        buildPath: "projects/components/style/tokens/",
        files: [
          {
            destination: "global.tokens.css",
            format: "css/variables",
            selector: ":root",
          },
        ],
      },
    },
  };
};

const getStyleDictionaryThemeConfig = (theme) => {
  return {
    log: "warn",
    source: [`./tokens/${theme}/*.json`],
    platforms: {
      css: {
        transformGroup: "custom/css",
        buildPath: "projects/components/style/tokens/",
        files: [
          {
            destination: `${theme}.tokens.css`,
            format: "css/variables",
            selector: `html[data-theme='${theme}']`,
          },
        ],
      },
    },
  };
};

StyleDictionary.registerFormat({
  name: "css/variables",
  formatter: function (dictionary, config) {
    return `${this.selector} {
      ${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${prop.value};`)
      .join("\n")}
    }`;
  },
});

StyleDictionary.registerTransform({
  name: "css/shadows",
  type: "value",
  matcher: function (prop) {
    return prop.attributes.category === "shadow";
  },
  transformer: (token) => {
    const {offsetX, offsetY, radius, spread, color} = token.original.value;
    return `${offsetX}px ${offsetY}px ${radius}px ${spread}px ${color}`;
  },
});

StyleDictionary.registerTransform({
  name: "css/radius",
  type: "value",
  matcher: function (prop) {
    return prop.attributes.category === "radius";
  },
  transformer: (token) => {
    const {topLeft} = token.original.value;
    return `${topLeft}px`;
  },
});
StyleDictionary.registerTransform({
  name: "css/spacing",
  type: "value",
  matcher: function (prop) {
    return prop.attributes.category === "spacing";
  },
  transformer: (token) => {
    const {right} = token.original.value;
    return `${right}px`;
  },
});

StyleDictionary.registerTransformGroup({
  name: "custom/css",
  transforms: StyleDictionary.transformGroup["css"].concat([
    "css/shadows",
    "css/radius",
    "css/spacing",
  ]),
});

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

StyleDictionary.registerFilter({
  name: "utilityToken",
  matcher: function (token) {
    return token.type === "color";
  },
});

StyleDictionary.registerFormat({
  name: "utility",
  formatter: function (dictionary, platform) {
    let output = "";

    ["primary", "text", "red", "green", "yellow"].forEach((palette) => {
      const utilityClass = "button" + "-" + palette;
      output += `.button_primary.${utilityClass} {
                        background-color:var(--color-${palette}-50);
                        transition: background 0.8s;
                        }\n\n.button_primary.${utilityClass}:hover {
                        background: var(--color-${palette}-60);
                        }\n\n.button_primary.${utilityClass}:active {
                        background-color: var(--color-${palette}-70);
                        background-size: 100%;
                        transition: background 0s;
                        }\n\n`; // primary

      output += `.button_ghost.${utilityClass} {
                        color: var(--color-${palette}-90);
                        fill: var(--color-${palette}-90);
                        transition: background 0.8s;
                        background-color: transparent;
                        }\n\n.button_ghost.${utilityClass}:hover {
                        background: var(--color-${palette}-5);
                        }\n\n.button_ghost.${utilityClass}:active {
                        background-color: var(--color-${palette}-10);
                        background-size: 100%;
                        transition: background 0s;
                        }\n\n`; // ghost

      output += `.button_outline.${utilityClass} {
                        color: var(--color-${palette}-50);
                        fill: var(--color-${palette}-50);
                        border-color: var(--color-${palette}-50);
                        border-style: solid;
                        border-width: 1px;
                        transition: background 0.8s;
                        }\n\n.button_outline.${utilityClass}:hover {
                        background: var(--color-${palette}-5);
                        }\n\n.button_outline.${utilityClass}:active {
                        background-color: var(--color-${palette}-10);
                        background-size: 100%;
                        transition: background 0s;
                        }\n\n`; // outline
    });
    ['avatar', 'accordion', 'badge', 'button', 'chip', 'file', 'hint', 'input', 'select', 'switch', 'tag', 'toast', 'toggle', 'toolbar', 'tooltip'].forEach((component) => {
      output += `.${component}_brick {
          border-radius:0;
        }\n\n`;
      output += `.${component}_circle{
          border-radius:100px;
          }\n\n`;
      output += `.${component}_rounded {
          border-radius:4px;
          }\n\n`;
    })
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

    return output;
  },
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryBase = StyleDictionary.extend(
  getStyleDictionaryBaseConfig()
);
StyleDictionaryBase.buildAllPlatforms();

for (const theme of themes) {
  console.log(`🚧 Compiling tokens with the ${theme} theme`);

  const StyleDictionaryTheming = StyleDictionary.extend(
    getStyleDictionaryThemeConfig(theme)
  );

  const utilityColors = {
    color: {
      ...tokensJson.color[theme],
    },
  };

  const StyleDictionaryUtility = StyleDictionary.extend({
    log: "warn",
    properties: utilityColors,
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "projects/components/style/tokens/",
        files: [
          {
            destination: "utility.tokens.css",
            format: "utility",
          },
        ],
      },
    },
  });

  // BUILD ALL THE PLATFORMS

  if (Object.keys(utilityColors.color)?.length > 1) {
    StyleDictionaryUtility.buildAllPlatforms();
  }

  StyleDictionaryTheming.buildAllPlatforms();
}
