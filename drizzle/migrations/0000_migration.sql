CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL CHECK (char_length(nombre) BETWEEN 1 AND 100),
  correo text NOT NULL CHECK (char_length(correo) BETWEEN 3 AND 255),
  telefono text CHECK (telefono IS NULL OR char_length(telefono) <= 30),
  junta text NOT NULL CHECK (char_length(junta) BETWEEN 1 AND 150),
  mensaje text CHECK (mensaje IS NULL OR char_length(mensaje) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cualquiera puede enviar consultas" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);