// Número fijo del dueño
const numeroDueno = "5493512757773"; // Cambia por tu número real con código de país

// Objeto para llevar la cuenta de reservas por día
let reservasPorDia = {};

document.getElementById("form-turno").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const mensajeElemento = document.getElementById("mensaje");

  if (!fecha || !hora) {
    mensajeElemento.textContent = "Por favor selecciona fecha y hora.";
    return;
  }

  // Verificar cuántas reservas ya hay ese día
  if (!reservasPorDia[fecha]) {
    reservasPorDia[fecha] = 0;
  }

  if (reservasPorDia[fecha] >= 3) {
    mensajeElemento.textContent = "Ya hay 3 turnos reservados este día. Elige otro.";
    return;
  }

  // Registrar la reserva
  reservasPorDia[fecha]++;

  // Mensaje personalizado
  const mensaje = `Hola ${nombre}, tu turno fue reservado para el día ${fecha} a las ${hora}. ¡Gracias por elegirnos!`;

  // Aviso para cliente
  const linkCliente = `https://wa.me/${numeroDueno}?text=${encodeURIComponent(mensaje)}`;

  // Aviso para dueño
  const mensajeDueno = `Nuevo turno reservado:\nCliente: ${nombre}\nFecha: ${fecha}\nHora: ${hora}`;
  const linkDueno = `https://wa.me/${numeroDueno}?text=${encodeURIComponent(mensajeDueno)}`;

  // Abrir WhatsApp del cliente y luego del dueño
  window.open(linkCliente, "_blank");
  setTimeout(() => {
    window.open(linkDueno, "_blank");
  }, 1000);

  mensajeElemento.style.color = "green";
  mensajeElemento.textContent = "✅ ¡Turno reservado y notificaciones enviadas!";
  document.getElementById("form-turno").reset();
});
