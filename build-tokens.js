const StyleDictionary = require("style-dictionary");
const tokensJson = require(__dirname + "/figma-tokens/tokens.json");
const getButtonsClasses = require("./tokens-factory/button.js");
const getRadiusClasses = require("./tokens-factory/border-radius.js");
const getColorsClasses = require("./tokens-factory/colors");
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
    output += getButtonsClasses() + getRadiusClasses(dictionary) + getColorsClasses(dictionary);
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

  const utilityProperties = {
    color: {
      ...tokensJson.color[theme],
    },
    radius: {
      ...tokensJson.radius
    }
  };

  const StyleDictionaryUtility = StyleDictionary.extend({
    log: "warn",
    properties: utilityProperties,
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

  if (Object.keys(utilityProperties.color)?.length > 1) {
    StyleDictionaryUtility.buildAllPlatforms();
  }

  StyleDictionaryTheming.buildAllPlatforms();
}
