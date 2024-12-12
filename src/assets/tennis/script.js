// Importar Three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Configuración básica de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Color del espacio
scene.background = new THREE.Color(0x000000);
// scene.background = new THREE.Color(0xf5f5f5);

// Añadir una luz ambiental

window.myFunction = function () {
  console.log("Función dentro del iframe llamada");
  // Lógica específica
};
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Añadir una luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Añadir una luz puntual para resaltar el área de juego
const pointLight = new THREE.PointLight(0xffaa00, 1, 20);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// Crear la mesa del ping pong
const tableGeometry = new THREE.BoxGeometry(10, 0.2, 6);
const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.position.y = -0.1;
scene.add(table);

// Crear las líneas de la cancha
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
const lineGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-5, 0.01, 0),
  new THREE.Vector3(5, 0.01, 0),
]);
const midLine = new THREE.Line(lineGeometry, lineMaterial);
scene.add(midLine);

// Añadir la red con malla cuadriculada
const netGroup = new THREE.Group();
const netFrameGeometry = new THREE.BoxGeometry(10, 0.05, 0.05);
const netFrameMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const netFrameTop = new THREE.Mesh(netFrameGeometry, netFrameMaterial);
netFrameTop.position.set(0, 0.5, 0);
netGroup.add(netFrameTop);
const netFrameBottom = new THREE.Mesh(netFrameGeometry, netFrameMaterial);
netFrameBottom.position.set(0, 0, 0);
netGroup.add(netFrameBottom);
const netFrameSideGeometry = new THREE.BoxGeometry(0.05, 0.5, 0.05);
const netFrameLeft = new THREE.Mesh(netFrameSideGeometry, netFrameMaterial);
netFrameLeft.position.set(-5, 0.25, 0);
netGroup.add(netFrameLeft);
const netFrameRight = new THREE.Mesh(netFrameSideGeometry, netFrameMaterial);
netFrameRight.position.set(5, 0.25, 0);
netGroup.add(netFrameRight);
const netMeshGeometry = new THREE.PlaneGeometry(10, 0.5, 80, 5); // Ajustar subdivisiones para cuadriculado
// const netMeshMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const netMeshMaterial = new THREE.MeshBasicMaterial({
  color: 0xfffff0,
  wireframe: true,
});
const netMesh = new THREE.Mesh(netMeshGeometry, netMeshMaterial);
netMesh.position.set(0, 0.25, 0);
netGroup.add(netMesh);
netGroup.position.y = 0.25;
scene.add(netGroup);

// Crear las raquetas
const paddleGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.2);
const paddleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const playerPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
playerPaddle.position.set(0, 0.2, 2.8);
scene.add(playerPaddle);

const opponentPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
opponentPaddle.position.set(0, 0.2, -2.8);
scene.add(opponentPaddle);

// Crear la pelota
const ballGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 0.3, 0);
scene.add(ball);

// Mostrar puntaje
const scoreElement = document.createElement("div");
scoreElement.style.position = "absolute";
scoreElement.style.top = "10px";
scoreElement.style.left = "50%";
scoreElement.style.transform = "translateX(-50%)";
scoreElement.style.color = "white";
scoreElement.style.fontSize = "24px";
scoreElement.style.fontFamily = "Arial, sans-serif";
document.body.appendChild(scoreElement);

// Control de cámara
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 10, 15);
controls.update();

// Variables de movimiento
const paddleSpeed = 0.3;
const ballSpeed = { x: 0.05, z: 0.05 };
const scores = { player: 0, opponent: 0 };
const maxScore = 5;
let opponentSpeed = 0.1;

// Control de teclado
const keys = { ArrowLeft: false, ArrowRight: false };
window.addEventListener("keydown", (event) => {
  if (event.key in keys) keys[event.key] = true;
});
window.addEventListener("keyup", (event) => {
  if (event.key in keys) keys[event.key] = false;
});

// Cargar y reproducir ambientación de sonido
const listener = new THREE.AudioListener();
camera.add(listener);

const backgroundSound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

audioLoader.load(
  "ambiente.mp3",
  function (buffer) {
    backgroundSound.setBuffer(buffer);
    backgroundSound.setLoop(true); // Hacer que el sonido se repita
    backgroundSound.setVolume(0.5); // Ajustar el volumen inicial
    backgroundSound.play(); // Reproducir el sonido
    console.log("Sonido cargado y reproduciendo.");
  },
  undefined,
  function (err) {
    // Manejo de errores
    console.error("Error al cargar el sonido:", err);
  }
);

// Agregar controles para subir y bajar el volumen
window.addEventListener("keydown", (event) => {
  // Verificar si backgroundSound tiene un buffer cargado
  if (!backgroundSound.isPlaying) {
    console.warn(
      "El sonido no está reproduciéndose. Ignorando control de volumen."
    );
    return;
  }

  if (event.key === "+" || event.key === "=") {
    // Compatibilidad para teclados
    const newVolume = Math.min(backgroundSound.getVolume() + 0.1, 1); // Máximo 1
    backgroundSound.setVolume(newVolume);
    console.log(`Volumen aumentado: ${newVolume}`);
  } else if (event.key === "-") {
    // Tecla para bajar el volumen
    const newVolume = Math.max(backgroundSound.getVolume() - 0.1, 0); // Mínimo 0
    backgroundSound.setVolume(newVolume);
    console.log(`Volumen disminuido: ${newVolume}`);
  }
});

// Reiniciar el juego
function resetGame() {
  scores.player = 0;
  scores.opponent = 0;
  ball.position.set(0, 0.3, 0);
  ballSpeed.x = 0.05 * (Math.random() > 0.5 ? 1 : -1);
  ballSpeed.z = 0.05 * (Math.random() > 0.5 ? 1 : -1);
  startTime = Date.now(); // Reiniciar el tiempo
  updateScoreDisplay();
}

// Actualizar el puntaje
function updateScore(player) {
  scores[player]++;
  updateScoreDisplay();

  // Enviar el puntaje actualizado al padre

  if (scores[player] >= maxScore) {
    alert(`${player === "player" ? "Jugador" : "Oponente"} gana!`);
    window.parent.postMessage(
      { type: "scoreUpdate", scores },
      "*" // O especifica el origen como "http://localhost:5173" por seguridad
    );
    resetGame();
  }
}

function updateScoreDisplay() {
  scoreElement.innerText = `Jugador: ${scores.player} | Oponente: ${scores.opponent}`;
}

// Detectar colisión
function checkCollision(paddle, ball) {
  const paddleBox = new THREE.Box3().setFromObject(paddle);
  const ballBox = new THREE.Box3().setFromObject(ball);
  return paddleBox.intersectsBox(ballBox);
}

// Movimiento del oponente automático
function moveOpponent() {
  const targetPosition = ball.position.x;
  const distance = Math.abs(opponentPaddle.position.x - targetPosition);

  if (Math.random() > 0.5 && distance > 0.5) {
    // Probabilidad de 50% para reaccionar
    const step = Math.min(opponentSpeed, distance); // Moverse solo lo necesario
    if (
      opponentPaddle.position.x < targetPosition &&
      opponentPaddle.position.x < 4.8
    ) {
      opponentPaddle.position.x += step;
    } else if (
      opponentPaddle.position.x > targetPosition &&
      opponentPaddle.position.x > -4.8
    ) {
      opponentPaddle.position.x -= step;
    }
  }
}

// Ajustar posición de la pelota al golpear las raquetas
function resolvePaddleCollision(paddle, ball) {
  if (checkCollision(paddle, ball)) {
    const offset = ball.position.x - paddle.position.x;
    ballSpeed.z *= -1; // Invertir dirección en z
    ballSpeed.x += offset * 0.1; // Ajustar dirección en x según el impacto
    ball.position.z += ballSpeed.z > 0 ? 0.2 : -0.2;

    // Limitar la velocidad en x para evitar movimientos extremos
    ballSpeed.x = Math.min(Math.max(ballSpeed.x, -0.5), 0.5);
  }
}

// Animar la escena
function animate() {
  requestAnimationFrame(animate);

  // Actualizar el tiempo jugado
  updateTimeDisplay();

  // Movimiento de las raquetas
  if (keys.ArrowLeft && playerPaddle.position.x > -4.8) {
    playerPaddle.position.x -= paddleSpeed;
  }
  if (keys.ArrowRight && playerPaddle.position.x < 4.8) {
    playerPaddle.position.x += paddleSpeed;
  }

  moveOpponent();

  // Movimiento de la pelota
  ball.position.x += ballSpeed.x;
  ball.position.z += ballSpeed.z;

  // Colisión con las paredes
  if (ball.position.x > 4.9 || ball.position.x < -4.9) {
    ballSpeed.x *= -1;
  }

  // Colisión con las raquetas
  resolvePaddleCollision(playerPaddle, ball);
  resolvePaddleCollision(opponentPaddle, ball);

  // Salida de la pelota (puntos)
  if (ball.position.z > 3) {
    ball.position.set(0, 0.3, 0);
    ballSpeed.x = 0.05 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeed.z = -0.05;
    updateScore("opponent");
  }
  if (ball.position.z < -3) {
    ball.position.set(0, 0.3, 0);
    ballSpeed.x = 0.05 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeed.z = 0.05;
    updateScore("player");
  }

  controls.update();
  renderer.render(scene, camera);
}

// Mostrar tiempo jugado
const timeElement = document.createElement("div");
timeElement.style.position = "absolute";
timeElement.style.top = "10px";
timeElement.style.right = "10px";
timeElement.style.color = "white";
timeElement.style.fontSize = "24px";
timeElement.style.fontFamily = "Arial, sans-serif";
document.body.appendChild(timeElement);
let startTime = Date.now();

function updateTimeDisplay() {
  const elapsedTime = Date.now() - startTime;
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = elapsedTime % 1000;
  timeElement.innerText = `Tiempo: ${minutes}m ${seconds}s ${milliseconds}ms`;
}

animate();

// Ajustar tamaño de la pantalla al redimensionar
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
