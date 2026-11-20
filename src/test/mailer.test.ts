// @vitest-environment node
import net from "node:net";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Servidor SMTP mínimo en memoria para verificar el correo sin enviarlo de verdad.
let server: net.Server;
let received = "";

beforeAll(async () => {
  server = net.createServer((sock) => {
    let inData = false;
    let buf = "";
    sock.write("220 test\r\n");
    sock.on("data", (chunk) => {
      buf += chunk.toString();
      let i;
      while ((i = buf.indexOf("\r\n")) >= 0) {
        const line = buf.slice(0, i);
        buf = buf.slice(i + 2);
        if (inData) {
          if (line === ".") {
            inData = false;
            sock.write("250 ok\r\n");
          } else received += line + "\n";
        } else if (/^(EHLO|HELO)/i.test(line)) sock.write("250-test\r\n250 AUTH PLAIN LOGIN\r\n");
        else if (/^AUTH/i.test(line)) sock.write("235 ok\r\n");
        else if (/^DATA/i.test(line)) {
          inData = true;
          sock.write("354 go\r\n");
        } else if (/^QUIT/i.test(line)) sock.end("221 bye\r\n");
        else sock.write("250 ok\r\n");
      }
    });
  });
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  const port = (server.address() as net.AddressInfo).port;
  Object.assign(process.env, {
    SMTP_HOST: "127.0.0.1",
    SMTP_PORT: String(port),
    SMTP_SECURE: "false",
    SMTP_USER: "web@example.com",
    SMTP_PASS: "x",
    CONTACT_TO: "ventas@example.com",
  });
});

afterAll(() => server.close());

describe("sendContactEmail", () => {
  it("envía la consulta con reply-to al remitente", async () => {
    const { sendContactEmail } = await import("@/lib/mailer.server");
    await sendContactEmail({
      nombre: "Ana",
      correo: "ana@example.com",
      junta: "Junta Ita\r\nBcc: x@evil.com",
      mensaje: "Hola",
    });
    expect(received).toMatch(/^To: ventas@example\.com/m);
    expect(received).toMatch(/^Reply-To: Ana <ana@example\.com>/m);
    expect(received).toMatch(/^Subject: Nueva consulta web: Junta Ita Bcc: x@evil\.com/m);
    const headers = received.split("\n\n")[0];
    expect(headers).not.toMatch(/^Bcc:/m);
    expect(received).toContain("Hola");
  });
});
