import * as THREE from "three";

export function generativePalette() {
  var colors = [];
  var n = Math.floor(Math.random() * 6) + 3;
  var div = 4;

  var h = Math.random();
  var s, l;
  var flexS = Math.random() * 0.25 + 0.25;
  var baseS = Math.random() * 0.25 + 0.25;
  var baseL = Math.random() * 0.05 + 0.45;

  var color = new THREE.Color();
  color.setHSL(Math.random(), 0.05, 0.75);
  colors.push(color);

  for (var i = 0; i < n; i++) {
    color = new THREE.Color();
    h = (h + (1 / div) * i) % 1;
    s = Math.random() * flexS + baseS;
    l = Math.random() * 0.5 + baseL;
    color.setHSL(h, s, l);
    colors.push(color);
  }

  return colors;
}

export function colorPalette() {
  const palettes = [
    ["#F0EAD8", "#FF7F75", "#F76E7C", "#F73668", "#021E66"],
    ["#D1D1C2", "#78B5E3", "#FF4444", "#F5B111", "#181D1F"],
    ["#C7C0A7", "#ED2860", "#F79F07", "#33302D", "#6666E2"],
    ["#EAE3E9", "#F3C318", "#EF6760", "#2AAAAA", "#5243C2"],
  ];

  const japan = [
    "#E6E6E6", //白鼠
    "#7d532c", //黄櫨染
    "#6846A5", //本紫
    "#AAA751", //梅幸茶
    "#BF795D", //芝翫茶
    "#927A30", //路考茶
    "#A7BD00", //萌木色
    "#00A5BF", //浅葱色
    "#596327", //海松色
    "#7CC28E", //若竹色
    "#004025", //深緑
    "#5BAD92", //緑青色
    "#005baa", //群青色
    "#db8449", //赤朽葉
    "#E86B79", //紅梅色
    "#EA0032", //唐紅
    "#F9A383", //曙色
    "#897845", //利休茶
  ];
  let metros = [
    "#f39700",
    "#e60012",
    "#9caeb7",
    "#00a7db",
    "#009944",
    "#d7c447",
    "#9b7cb6",
    "#00ada9",
    "#bb641d",
    "#e85298",
    "#0079c2",
    "#6cbb5a",
    "#b6007a",
    "#e5171f",
    "#522886",
    "#0078ba",
    "#019a66",
    "#e44d93",
    "#814721",
    "#a9cc51",
    "#ee7b1a",
    "#00a0de",
  ];

  var colors = [];
  var paletteNum = Math.floor(Math.random() * palettes.length);
  var palette = palettes[paletteNum];

  // palette = metros;
  // palette = japan;
  colors.push(new THREE.Color(palette[0]));
  palette.shift();

  // for (let i = palette.length - 1; i > 0; i--) {
  //   let r = Math.floor(Math.random() * (i + 1));
  //   let tmp = palette[i];
  //   palette[i] = palette[r];
  //   palette[r] = tmp;
  // }

  for (let j = 0; j < palette.length; j++) {
    var color = new THREE.Color(palette[j]);
    colors.push(color);
  }
  return colors;
}
