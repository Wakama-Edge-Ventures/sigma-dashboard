// src/app/verify/[token]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSigmaSql } from "@/lib/sigmaDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type DocRow = {
  id: string;
  title: string;
  status: string;
  standard: string | null;
  certificate_no: string | null;
  issued_at: string | null;
  expires_at: string | null;
  file_url: string | null;
  file_sha256: string | null;
  proof_ref: string | null;
  verify_url: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  pdf_access: "PUBLIC" | "PRIVATE";
  verify_token: string;
  client_name: string | null;
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

/**
 * Sécurité maximale (pilot):
 * - Tant que l’auth Sigma n’est pas implémentée, on considère toujours "non connecté".
 * - Donc si doc PRIVATE => on ne montre rien.
 *
 * Après implémentation login: remplacer par une vraie vérification de session/cookie.
 */
async function isLoggedInSigma(): Promise<boolean> {
  return false;
}

export default async function VerifyPage({ params }: { params: { token: string } }) {
  const token = (params.token || "").trim();
  if (!token || token.length < 16) notFound();

  const sql = getSigmaSql();
if (!sql) {
  // sécurité: ne rien exposer si config absente
  notFound();
}
const rows = await sql<DocRow[]>`
    SELECT
      d.id,
      d.title,
      d.status,
      d.standard,
      d.certificate_no,
      d.issued_at::text as issued_at,
      d.expires_at::text as expires_at,
      d.file_url,
      d.file_sha256,
      d.proof_ref,
      d.verify_url,
      d.visibility,
      d.pdf_access,
      d.verify_token,
      c.name as client_name
    FROM sigma.documents d
    LEFT JOIN sigma.organizations c ON c.id = d.client_org_id
    WHERE d.verify_token = ${token}
    LIMIT 1;
  `;

  const doc = rows[0];
  if (!doc) notFound();

  const loggedIn = await isLoggedInSigma();

  // Règle sécurité max: doc PRIVATE => rien sans login
  if (doc.visibility === "PRIVATE" && !loggedIn) {
    return (
      <main className="min-h-screen bg-[#070A14] text-white">
        <div className="mx-auto max-w-3xl px-5 py-14">
          <div className="rounded-3xl border border-white/12 bg-white/5 p-8">
            <div className="text-sm text-white/70">Accès restreint</div>
            <h1 className="mt-2 text-2xl font-semibold">Ce document est privé</h1>
            <p className="mt-3 text-white/70 leading-relaxed">
              La vérification de ce document nécessite une connexion à l’espace Sigma.
            </p>
            <div className="mt-6">
              <Link
                href="/sigma/login"
                className="inline-flex items-center rounded-2xl bg-white px-5 py-3 font-semibold text-black hover:bg-white/90"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Doc PUBLIC ou user connecté => affichage (sans données sensibles)
  const showPdfButton =
    doc.file_url && (doc.pdf_access === "PUBLIC" || loggedIn);

  return (
    <main className="min-h-screen bg-[#070A14] text-white">
      <div className="mx-auto max-w-4xl px-5 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">Sigma Cert Value • Vérification</div>
            <h1 className="mt-2 text-3xl font-semibold leading-tight">{doc.title}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>Statut: {doc.status}</Badge>
              <Badge>Visibilité: {doc.visibility}</Badge>
              <Badge>PDF: {doc.pdf_access}</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            {doc.verify_url ? (
              <a
                href={doc.verify_url}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
              >
                Lien officiel
              </a>
            ) : null}
            <Link
              href="/sigma"
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:text-white hover:border-white/20"
            >
              Retour
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/12 bg-white/5 p-6">
            <div className="text-xs text-white/60">Client</div>
            <div className="mt-1 text-lg font-semibold">{doc.client_name ?? "—"}</div>
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/5 p-6">
            <div className="text-xs text-white/60">Standard</div>
            <div className="mt-1 text-lg font-semibold">{doc.standard ?? "—"}</div>
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/5 p-6">
            <div className="text-xs text-white/60">Numéro</div>
            <div className="mt-1 text-lg font-semibold">{doc.certificate_no ?? "—"}</div>
          </div>

          <div className="rounded-3xl border border-white/12 bg-white/5 p-6">
            <div className="text-xs text-white/60">Dates</div>
            <div className="mt-1 text-white/80">
              Émis: <span className="font-semibold text-white">{doc.issued_at ?? "—"}</span>
              <br />
              Expire: <span className="font-semibold text-white">{doc.expires_at ?? "—"}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/12 bg-black/20 p-6">
          <div className="text-sm font-semibold">Preuve</div>
          <div className="mt-2 text-sm text-white/70 leading-relaxed">
            <div>
              <span className="text-white/60">Hash (SHA-256): </span>
              <span className="font-semibold text-white">{doc.file_sha256 ?? "—"}</span>
            </div>
            <div className="mt-2">
              <span className="text-white/60">Référence preuve: </span>
              <span className="font-semibold text-white">{doc.proof_ref ?? "—"}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {showPdfButton ? (
              <a
                href={doc.file_url!}
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-black hover:bg-white/90"
              >
                Télécharger PDF
              </a>
            ) : (
              <span className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/70">
                PDF privé (connexion requise)
              </span>
            )}
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Copier le lien
            </button>
          </div>
        </div>

        <div className="mt-10 text-xs text-white/50">
          Note: cette page n’affiche volontairement que les informations minimales de vérification.
        </div>
      </div>
    </main>
  );
}