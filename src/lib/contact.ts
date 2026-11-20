export const BRAND = "Y-Gestión";
export const COMPANY = "VEMABE";
// Formato internacional sin "+", para los enlaces de WhatsApp
export const WHATSAPP_NUMBER = "595982976423";
export const PHONE = "+595 982 976 423";
export const PHONE_LOCAL = "0982 976 423";
export const EMAIL = "ventas@vemabe.com";

export function waLink(msg = "Hola, quisiera más información sobre el sistema para Juntas de Saneamiento.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
