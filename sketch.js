import * as THREE from "three";
import { generativePalette, colorPalette } from "palette";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import vertexShader from "vertex";
import fragmentShader from "fragment";

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", onResize);

var renderer, camera, controls;
var palette;
var windowSize = 1000;

function onResize() {
  var width = innerWidth;
  var height = innerHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function showHelper(scene) {
  const axesHelper = new THREE.AxesHelper(windowSize);
  scene.add(axesHelper);
  const gridHelper = new THREE.GridHelper(windowSize, 100);
  scene.add(gridHelper);
}

function useOrthographicCamera() {
  camera = new THREE.OrthographicCamera(
    -windowSize / 4,
    windowSize / 4,
    windowSize / 4,
    -windowSize / 4,
    -windowSize * 4,
    windowSize * 2
  );
  // camera.position.set(0, windowSize / 10, 0);
  camera.position.set(windowSize / 2, windowSize / 2, windowSize / 2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function usePerspectiveCamera() {
  camera = new THREE.PerspectiveCamera(45, 1, 1, 10000);
  camera.position.set(windowSize / 2, windowSize / 2, windowSize / 2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function init() {
  var width = innerWidth;
  var height = innerHeight;

  palette = generativePalette();
  // palette = colorPalette();
  // palette = [
  //   new THREE.Color("#ffffff"),
  //   new THREE.Color("#000000"),
  //   new THREE.Color("#aaaaaa"),
  // ];

  // paletteをcolor型に変換
  for (let i = 0; i < palette.length; i++) {
    palette[i] = new THREE.Color(palette[i]);
  }

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas"),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(palette[0]);

  // showHelper(scene);

  useOrthographicCamera();
  // usePerspectiveCamera();

  // controls = new OrbitControls(camera, document.body);
  // controls.enableDamping = true;
  // controls.dampingFactor = 0.2;

  var color1 = palette[0];
  var color2 = palette[1];

  let n = 1;
  var planeSize = windowSize;
  var step = planeSize * 1.1;
  var uniformsList = [];

  for (let nx = 0; nx < n; nx++) {
    for (let ny = 0; ny < n; ny++) {
      const uniforms = {
        u_time: { type: "f", value: 0.0 },
        color1: {
          type: "vec3",
          // value: palette[0],
          value: color1,
          // value: palette[Math.floor(Math.random() * palette.length)],
        },
        color2: {
          type: "vec3",
          value: color2,
          // value: palette[Math.floor(Math.random() * palette.length)],
        },
        windowSize: { type: "f", value: planeSize },
        uvRange: { type: "f", value: Math.random() * 4.0 + 1.0 },
        divide: { type: "f", value: Math.floor(Math.random() * 20 + 10) },
        pRect: { type: "f", value: Math.random() },
      };
      uniformsList.push(uniforms);

      const planeGeometry = new THREE.Mesh(
        new THREE.PlaneGeometry(planeSize, planeSize, 500, 500),
        new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        })
      );
      planeGeometry.rotation.x = -Math.PI / 2;
      planeGeometry.position.set(
        nx * step - (planeSize * n) / 2 + planeSize / 2,
        0,
        ny * step - (planeSize * n) / 2 + planeSize / 2
      );
      scene.add(planeGeometry);

      const sea = new THREE.Mesh(
        new THREE.PlaneGeometry(planeSize, planeSize),
        new THREE.MeshBasicMaterial({
          color: color2,
          side: THREE.DoubleSide,
        })
      );
      sea.position.set(
        nx * step - (planeSize * n) / 2 + planeSize / 2,
        0,
        ny * step - (planeSize * n) / 2 + planeSize / 2
      );
      sea.rotation.x = -Math.PI / 2;
      // scene.add(sea);
    }
  }

  tick();

  function tick() {
    for (let i = 0; i < uniformsList.length; i++) {
      uniformsList[i].u_time.value += 0.1;
    }
    requestAnimationFrame(tick);
    // controls.update();
    renderer.render(scene, camera);
  }
}
