const palabras = ["Te amo", "Te quiero", "Linda", "Bonita", "Preciosa", "Mi amor", "Hermosa"];
const lluviaContenedor = document.getElementById("lluvia");

function crearLetra() {
  const letra = document.createElement("div");
  letra.classList.add("letra");
  letra.textContent = palabras[Math.floor(Math.random() * palabras.length)];

  // Obtener la carta y su posición real en pantalla
  const carta = document.querySelector(".carta");
  const cartaRect = carta.getBoundingClientRect();

  const anchoVentana = window.innerWidth;
  const anchoCarta = cartaRect.width;
  const margenLateral = cartaRect.left; // espacio desde el borde izquierdo hasta la carta

  let posicionX;

  if (Math.random() < 0.5) {
    // Zona izquierda (de 0 a margenLateral - 20 px)
    posicionX = Math.random() * (margenLateral - 20);
    if (posicionX < 0) posicionX = 0; // en pantallas muy pequeñas evitar negativo
  } else {
    // Zona derecha (de margenLateral + anchoCarta + 20 px hasta el borde derecho)
    posicionX = margenLateral + anchoCarta + 20 + Math.random() * (anchoVentana - (margenLateral + anchoCarta + 20));
  }

  letra.style.left = posicionX + "px";
  letra.style.top = "-50px";

  // Tamaño y duración un poco más pequeños para móvil
  letra.style.fontSize = (Math.random() * 6 + 14) + "px";
  letra.style.animationDuration = (Math.random() * 3 + 4) + "s";

  lluviaContenedor.appendChild(letra);

  // Variables para arrastre
  let isDragging = false;
  let offsetX, offsetY;

  letra.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isDragging = true;
    letra.style.animationPlayState = "paused";
    const rect = letra.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    letra.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      letra.style.position = "fixed";
      letra.style.left = `${e.clientX - offsetX}px`;
      letra.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      letra.style.cursor = "grab";
      letra.style.position = "absolute";
      const pos = letra.getBoundingClientRect();

      letra.style.left = `${pos.left}px`;
      letra.style.top = `${pos.top}px`;

      // Tiempo restante para caer según posición actual
      const distanciaRestante = window.innerHeight - pos.top;
      const duracionTotal = 4000; // 4 segundos máximo
      const duracionRestante = (distanciaRestante / window.innerHeight) * duracionTotal;

      letra.style.animation = `caer ${duracionRestante / 1000}s linear forwards`;
      letra.style.animationPlayState = "running";
    }
  });

  letra.addEventListener("animationend", () => {
    letra.remove();
  });
}

// Ajusta la frecuencia en móviles para evitar saturar la pantalla
setInterval(() => {
  if (window.innerWidth < 500) {
    if (Math.random() < 0.6) crearLetra();
  } else {
    crearLetra();
  }
}, 500);
