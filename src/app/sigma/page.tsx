// src/app/sigma/page.tsx
"use client";

import { useMemo, useState } from "react";

type Lang = "FR" | "EN";

const copy = {
  FR: {
    nav: { product: "Produit", usecases: "Cas d’usage", how: "Comment ça marche", faq: "FAQ" },
    topTag: "Preuves vérifiables • Anti-fraude documentaire • Traçabilité",
    heroTitle: "Publiez des certificats infalsifiables et vérifiables en 1 clic",
    heroSubtitle:
      "Sigma Cert Value – Espace sécurisé pour publier vos certificats (PDF) et fournir à vos clients une page de vérification d’authenticité, avec preuve d’intégrité et d’horodatage.",
    ctas: { login: "Se connecter", verify: "Vérifier un certificat", book: "Demander une démo" },
    logosTitle: "Pensé pour les cabinets, organismes et réseaux de certification",
    blocksTitle: "Réduisez la fraude, simplifiez les contrôles, augmentez la confiance",
    blocks: [
      {
        t: "Authenticité prouvée",
        d: "Chaque certificat publié génère une empreinte et une preuve de publication. Toute modification du PDF devient détectable.",
      },
      {
        t: "Traçabilité & historique",
        d: "Gérez les versions, renouvellements, expirations et révocations, avec un historique clair et consultable.",
      },
      {
        t: "Vérification simple",
        d: "Une page de vérification partageable (lien/QR) pour vos clients, partenaires, auditeurs et autorités.",
      },
    ],
    valueTitle: "Une plateforme de preuves – sans complexité blockchain",
    valueBullets: [
      "Espace privé (login) pour publier vos documents",
      "Pages de vérification publiques (ou restreintes) pour vos clients",
      "Gestion du cycle de vie : valide / expiré / révoqué / remplacé",
      "Compatible multi-certifications : ISO 9001, 14001, 45001, 27001…",
    ],
    usecasesTitle: "Cas d’usage",
    usecasesSubtitle:
      "Même logique, plusieurs secteurs : documents à forte valeur où la fraude coûte cher.",
    usecases: [
      { t: "Certifications & audits", d: "Certificats ISO, attestations, rapports d’audit, conformité." },
      { t: "Formation & diplômes", d: "Attestations, diplômes, badges et certificats de formation." },
      { t: "Supply chain", d: "Certificats d’origine, inspection, qualité, lots et expéditions." },
      { t: "Assurance & finance", d: "Attestations, rapports, justificatifs, conformité KYC." },
    ],
    howTitle: "Comment ça marche",
    howSteps: [
      { t: "1) Publier", d: "Le cabinet charge le PDF et renseigne les champs clés (numéro, standard, dates, statut)." },
      { t: "2) Générer la preuve", d: "La plateforme crée une preuve d’intégrité et un horodatage, et stocke la référence." },
      { t: "3) Partager", d: "Le cabinet partage un lien (ou QR) de vérification à son client." },
      { t: "4) Vérifier", d: "Le client consulte la page de vérification et peut contrôler l’authenticité du document." },
    ],
    trustTitle: "Ce que vos clients peuvent dire (argumentaire simple)",
    trustBullets: [
      "“Nos certificats sont vérifiables via une page officielle.”",
      "“Toute falsification est détectable.”",
      "“Un certificat révoqué/expiré est visible immédiatement.”",
    ],
    ctaTitle: "Déployer un pilote en quelques jours",
    ctaSubtitle:
      "Nous configurons votre espace (logo, utilisateurs, règles) et vous publiez vos premiers certificats avec preuves vérifiables.",
    faqTitle: "FAQ",
    faq: [
      {
        q: "Est-ce que nos clients doivent comprendre la blockchain ?",
        a: "Non. Ils vérifient via une page web (lien/QR). La preuve est gérée en arrière-plan.",
      },
      {
        q: "Peut-on garder certains documents privés ?",
        a: "Oui. Les documents sensibles restent visibles uniquement aux utilisateurs connectés.",
      },
      {
        q: "Que se passe-t-il en cas de révocation ?",
        a: "Le statut est mis à jour et la page de vérification l’affiche immédiatement, tout en conservant l’historique.",
      },
    ],
    footer: "Sigma Cert Value • Proof Registry",
  },
  EN: {
    nav: { product: "Product", usecases: "Use cases", how: "How it works", faq: "FAQ" },
    topTag: "Verifiable proofs • Anti-document fraud • Traceability",
    heroTitle: "Issue tamper-proof, verifiable certificates in one click",
    heroSubtitle:
      "Sigma Cert Value – Secure workspace to publish certificates (PDF) and provide a verification page for your clients, with integrity proof and timestamping.",
    ctas: { login: "Sign in", verify: "Verify a certificate", book: "Book a demo" },
    logosTitle: "Built for certification bodies, auditors and compliance networks",
    blocksTitle: "Reduce fraud, simplify checks, increase trust",
    blocks: [
      {
        t: "Proven authenticity",
        d: "Each published certificate produces a fingerprint and publication proof. Any PDF alteration becomes detectable.",
      },
      {
        t: "Traceability & lifecycle",
        d: "Handle versions, renewals, expirations and revocations with a clear, auditable history.",
      },
      {
        t: "Simple verification",
        d: "Shareable verification pages (link/QR) for clients, partners, auditors and authorities.",
      },
    ],
    valueTitle: "A proof platform — without blockchain complexity",
    valueBullets: [
      "Private workspace (login) to publish documents",
      "Verification pages (public or restricted) for your clients",
      "Lifecycle management: valid / expired / revoked / superseded",
      "Multi-standard ready: ISO 9001, 14001, 45001, 27001…",
    ],
    usecasesTitle: "Use cases",
    usecasesSubtitle: "Same approach across sectors where document fraud is costly.",
    usecases: [
      { t: "Certification & audits", d: "ISO certificates, attestations, audit reports, compliance." },
      { t: "Training & diplomas", d: "Certificates, diplomas, badges and credentials." },
      { t: "Supply chain", d: "Certificates of origin, inspection, quality, batches & shipments." },
      { t: "Insurance & finance", d: "Attestations, reports, proofs, KYC compliance." },
    ],
    howTitle: "How it works",
    howSteps: [
      { t: "1) Publish", d: "Upload the PDF and fill key fields (number, standard, dates, status)." },
      { t: "2) Generate proof", d: "The platform generates an integrity proof and timestamp, and stores references." },
      { t: "3) Share", d: "Share a verification link (or QR) with your client." },
      { t: "4) Verify", d: "Clients open the verification page and validate document authenticity." },
    ],
    trustTitle: "What your clients can say (simple talking points)",
    trustBullets: [
      "“Our certificates are verifiable via an official verification page.”",
      "“Any tampering is detectable.”",
      "“Revoked/expired status is visible instantly.”",
    ],
    ctaTitle: "Launch a pilot in a few days",
    ctaSubtitle:
      "We configure your workspace (branding, users, rules) and you publish your first certificates with verifiable proofs.",
    faqTitle: "FAQ",
    faq: [
      {
        q: "Do our clients need to understand blockchain?",
        a: "No. They verify using a web page (link/QR). The proof layer runs in the background.",
      },
      {
        q: "Can we keep some documents private?",
        a: "Yes. Sensitive documents can remain accessible only to logged-in users.",
      },
      {
        q: "What happens if a certificate is revoked?",
        a: "The status updates and the verification page reflects it immediately, while keeping the history.",
      },
    ],
    footer: "Sigma Cert Value • Proof Registry",
  },
} as const;

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function SigmaLanding() {
  const [lang, setLang] = useState<Lang>("FR");
  const c = useMemo(() => copy[lang], [lang]);

  return (
    <main className="min-h-screen text-white">
      {/* Background (Idjor-like) */}
      <div className="fixed inset-0 -z-10 bg-[#070A14]" />
      <div className="fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(circle_at_20%_10%,rgba(121,90,255,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(0,255,209,0.12),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(121,90,255,0.16),transparent_45%)]" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.65))]" />
      <div className="fixed inset-0 -z-10 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top bar */}
      <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
              <span className="font-semibold">S</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Sigma Cert Value</div>
              <div className="text-xs text-white/60">Proof Registry</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#product" className="hover:text-white">{c.nav.product}</a>
            <a href="#usecases" className="hover:text-white">{c.nav.usecases}</a>
            <a href="#how" className="hover:text-white">{c.nav.how}</a>
            <a href="#faq" className="hover:text-white">{c.nav.faq}</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className={classNames(
                "px-3 py-1.5 rounded-lg text-xs border",
                lang === "FR" ? "bg-white/10 border-white/20" : "bg-transparent border-white/10 text-white/70"
              )}
              onClick={() => setLang("FR")}
            >
              FR
            </button>
            <button
              className={classNames(
                "px-3 py-1.5 rounded-lg text-xs border",
                lang === "EN" ? "bg-white/10 border-white/20" : "bg-transparent border-white/10 text-white/70"
              )}
              onClick={() => setLang("EN")}
            >
              EN
            </button>

            <a
              href="/sigma/login"
              className="ml-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90"
            >
              {c.ctas.login}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs text-white/75">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {c.topTag}
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              {c.heroTitle}
            </h1>
            <p className="mt-4 text-white/75 text-lg leading-relaxed">
              {c.heroSubtitle}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/sigma/login"
                className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90"
              >
                {c.ctas.login}
              </a>
              <a
                href="/verify"
                className="px-5 py-3 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10"
              >
                {c.ctas.verify}
              </a>
              <a
                href="#demo"
                className="px-5 py-3 rounded-2xl border border-white/10 text-white/70 hover:text-white hover:border-white/20"
              >
                {c.ctas.book}
              </a>
            </div>

            <div className="mt-8 text-sm text-white/60">
              {c.logosTitle}
              <div className="mt-3 flex flex-wrap gap-2">
                {["ISO", "ESG", "Lean", "Quality", "Audit", "Compliance"].map((x) => (
                  <span key={x} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right hero card (Provenance-like “product UI preview”) */}
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{lang === "FR" ? "Aperçu vérification" : "Verification preview"}</div>
                <div className="text-xs text-white/60">{lang === "FR" ? "Statut: VALIDE" : "Status: VALID"}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/60 text-xs">{lang === "FR" ? "Numéro" : "Number"}</div>
                  <div className="mt-1 font-semibold">BN24343/23034</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/60 text-xs">{lang === "FR" ? "Standard" : "Standard"}</div>
                  <div className="mt-1 font-semibold">ISO 9001:2015</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/60 text-xs">{lang === "FR" ? "Émis le" : "Issued"}</div>
                  <div className="mt-1 font-semibold">09 Sep 2025</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/60 text-xs">{lang === "FR" ? "Expire le" : "Expires"}</div>
                  <div className="mt-1 font-semibold">08 Sep 2028</div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-white/60 text-xs">{lang === "FR" ? "Preuve" : "Proof"}</div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="text-xs text-white/70 truncate">
                    SHA-256: <span className="text-white/90">0x8f…c2a9</span> • CID: <span className="text-white/90">bafy…</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/20 text-emerald-200 text-xs">
                    {lang === "FR" ? "Vérifiable" : "Verifiable"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-xl bg-white text-black font-semibold text-sm">
                  {lang === "FR" ? "Copier le lien" : "Copy link"}
                </button>
                <button className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white/80 font-semibold text-sm">
                  {lang === "FR" ? "QR" : "QR"}
                </button>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-emerald-400/15 blur-2xl" />
            <div className="absolute -bottom-8 -left-10 h-36 w-36 rounded-full bg-violet-500/15 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Feature blocks (Provenance-like layout) */}
      <section id="product" className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold">{c.blocksTitle}</h2>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {c.blocks.map((b) => (
            <div key={b.t} className="rounded-3xl border border-white/12 bg-white/5 p-6">
              <div className="text-lg font-semibold">{b.t}</div>
              <div className="mt-2 text-white/70 leading-relaxed">{b.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/12 bg-white/5 p-6 md:p-8 grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h3 className="text-xl font-semibold">{c.valueTitle}</h3>
            <p className="mt-2 text-white/70 leading-relaxed">
              {lang === "FR"
                ? "Vous gardez vos processus métiers. Nous ajoutons une couche de preuve et de vérification pour protéger la valeur de vos documents."
                : "Keep your existing processes. We add a proof & verification layer that protects the value of your documents."}
            </p>
          </div>
          <ul className="space-y-2 text-white/75">
            {c.valueBullets.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Use cases */}
      <section id="usecases" className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">{c.usecasesTitle}</h2>
            <p className="mt-2 text-white/70">{c.usecasesSubtitle}</p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {c.usecases.map((u) => (
            <div key={u.t} className="rounded-3xl border border-white/12 bg-black/20 p-6">
              <div className="text-lg font-semibold">{u.t}</div>
              <div className="mt-2 text-white/70">{u.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold">{c.howTitle}</h2>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {c.howSteps.map((s) => (
            <div key={s.t} className="rounded-3xl border border-white/12 bg-white/5 p-6">
              <div className="font-semibold">{s.t}</div>
              <div className="mt-2 text-white/70">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/12 bg-black/20 p-6 md:p-8">
          <h3 className="text-xl font-semibold">{c.trustTitle}</h3>
          <ul className="mt-4 space-y-2 text-white/75">
            {c.trustBullets.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl border border-white/12 bg-gradient-to-r from-white/5 to-white/10 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold">{c.ctaTitle}</h2>
          <p className="mt-2 text-white/70">{c.ctaSubtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/sigma/login" className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90">
              {c.ctas.login}
            </a>
            <a href="/verify" className="px-5 py-3 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10">
              {c.ctas.verify}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold">{c.faqTitle}</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {c.faq.map((item) => (
            <div key={item.q} className="rounded-3xl border border-white/12 bg-white/5 p-6">
              <div className="font-semibold">{item.q}</div>
              <div className="mt-2 text-white/70 leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-white/60 flex items-center justify-between gap-4 flex-wrap">
          <div>{c.footer}</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="/sigma/login">{c.ctas.login}</a>
            <a className="hover:text-white" href="/verify">{c.ctas.verify}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}