export const BRAND = "AquaGestión";
// Reemplazar por el número real (formato internacional sin "+")
export const WHATSAPP_NUMBER = "595981000000";
export const PHONE = "+595 21 000 000";
export const EMAIL = "contacto@aquagestion.com.py";
export const ADDRESS = "Asunción, Paraguay";

export function waLink(msg = "Hola, quisiera más información sobre el sistema para Juntas de Saneamiento.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
