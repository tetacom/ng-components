module.exports = () => {
  let output = '';
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
  return output
}
