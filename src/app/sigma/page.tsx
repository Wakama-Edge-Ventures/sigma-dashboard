// src/app/sigma/page.tsx
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Lang = "FR" | "EN";

const copy = {
  FR: {
    nav: { product: "Produit", usecases: "Cas d’usage", how: "Comment ça marche", faq: "FAQ" },
    topTag: "Preuves vérifiables • Anti-fraude documentaire • Traçabilité",
    heroTitle: "Publiez des certificats ISO vérifiables et infalsifiables",
    heroSubtitle:
      "Sigma Cert Value – Espace sécurisé pour publier vos certificats (PDF) et fournir à vos clients une page de vérification d’authenticité, avec preuve d’intégrité, horodatage et statut officiel (valide/expiré/révoqué).",
    ctas: { login: "Se connecter", verify: "Vérifier un certificat", book: "Demander une démo" },
    logosTitle: "Pensé pour les cabinets, organismes et réseaux de certification",
    blocksTitle: "Votre registre de certificats ISO : vérifiable, traçable, et simple pour vos clients",
    blocks: [
      {
        t: "Certificats vérifiables",
        d: "Chaque certificat publié est associé à une preuve d’intégrité. Si le PDF est modifié, la vérification le détecte.",
      },
      {
        t: "Gestion du cycle de vie",
        d: "Valide / expiré / révoqué / remplacé : vos clients voient le statut officiel instantanément.",
      },
      {
        t: "Image de marque & confiance",
        d: "Une page de vérification à votre nom (logo, domaine), partageable par lien ou QR.",
      },
    ],
    valueTitle: "Le produit Sigma (pilot)",
    valueBullets: [
      "Espace cabinet sécurisé : utilisateurs, rôles, historique",
      "Publication d’un certificat en quelques champs + upload PDF",
      "Page de vérification publique (ou restreinte) + QR code",
      "Révocation / remplacement sans perdre l’historique",
      "Export / preuves pour audits et contrôles",
    ],
    usecasesTitle: "Cas d’usage Sigma",
    usecasesSubtitle:
      "Pensé pour un cabinet qui certifie et audite : ISO + conformité. (Pilot extensible à d’autres documents.)",
    usecases: [
      { t: "ISO 9001 (Qualité)", d: "Certificat et périmètre (site, activités, dates, numéro de certificat)." },
      { t: "ISO 14001 (Environnement)", d: "Certification environnementale et preuves associées, statut vérifiable." },
      { t: "ISO 45001 (Santé & sécurité)", d: "Certificat HSE, utile pour sites industriels et appels d’offres." },
      { t: "ISO 27001 (Sécurité)", d: "Certification SSI, très demandée par les clients corporate et institutions." },
    ],
    howTitle: "Comment ça marche (côté Sigma)",
    howSteps: [
      { t: "1) Connexion", d: "Sigma se connecte à son espace sécurisé (utilisateurs / mot de passe)." },
      {
        t: "2) Publication",
        d: "Upload du PDF + informations clés (numéro, standard, client, dates, statut).",
      },
      { t: "3) Preuve & QR", d: "Le système génère la preuve d’intégrité + un QR code de vérification." },
      {
        t: "4) Vérification client",
        d: "Le client scanne le QR ou ouvre le lien et consulte la page officielle + statut.",
      },
    ],
    trustTitle: "Argumentaire simple pour vos clients",
    trustBullets: [
      "“Nos certificats sont vérifiables via une page officielle Sigma.”",
      "“Toute falsification est détectable.”",
      "“Le statut (valide/expiré/révoqué) est visible immédiatement.”",
    ],
    ctaTitle: "Déployer un pilote en quelques jours",
    ctaSubtitle:
      "Nous configurons votre espace (logo, domaine, utilisateurs) et vous publiez vos premiers certificats ISO avec preuves vérifiables.",
    faqTitle: "FAQ (questions fréquentes)",
    faq: [
      {
        q: "Est-ce que la vérification marche sans compte ?",
        a: "Oui, par défaut la page de vérification peut être publique. On peut aussi la restreindre (accès par login).",
      },
      {
        q: "Peut-on révoquer un certificat ?",
        a: "Oui. Le statut passe à “révoqué” et la page l’affiche immédiatement (historique conservé).",
      },
      {
        q: "Que vérifie exactement le système ?",
        a: "L’intégrité du document (détection de modification) + le statut officiel publié par Sigma.",
      },
      {
        q: "Peut-on publier plusieurs standards pour le même client ?",
        a: "Oui, chaque certificat est un enregistrement séparé avec son propre lien/QR de vérification.",
      },
      {
        q: "Et si un client perd son PDF ?",
        a: "Il peut toujours vérifier via le lien/QR et consulter la référence officielle (statut, dates, preuve).",
      },
    ],
    footer: "Sigma Cert Value • Proof Registry",
    preview: {
      title: "Aperçu vérification",
      status: "Statut: VALIDE",
      number: "Numéro",
      standard: "Standard",
      issued: "Émis le",
      expires: "Expire le",
      proof: "Preuve",
      verifiable: "Vérifiable",
      copyLink: "Copier le lien",
      qr: "QR",
      qrTitle: "Scan QR (exemple)",
      qrHint: "Le dashboard génère un QR code qui redirige vers la page de preuve.",
      open: "Ouvrir la preuve",
      scan: "Scanner",
    },
  },
  EN: {
    nav: { product: "Product", usecases: "Use cases", how: "How it works", faq: "FAQ" },
    topTag: "Verifiable proofs • Document anti-fraud • Traceability",
    heroTitle: "Publish verifiable, tamper-proof ISO certificates",
    heroSubtitle:
      "Sigma Cert Value – Secure workspace to publish ISO certificates (PDF) and provide clients with an official verification page, including integrity proof, timestamping, and an official status (valid/expired/revoked).",
    ctas: { login: "Sign in", verify: "Verify a certificate", book: "Book a demo" },
    logosTitle: "Built for certification bodies, auditors and compliance networks",
    blocksTitle: "Your ISO certificate registry: verifiable, traceable, and simple for clients",
    blocks: [
      {
        t: "Verifiable certificates",
        d: "Each published certificate is linked to an integrity proof. Any PDF tampering becomes detectable.",
      },
      {
        t: "Lifecycle management",
        d: "Valid / expired / revoked / superseded: clients see the official status instantly.",
      },
      {
        t: "Branding & trust",
        d: "A verification page under your name (logo, domain), shareable via link or QR.",
      },
    ],
    valueTitle: "Sigma product (pilot)",
    valueBullets: [
      "Secure workspace: users, roles, audit history",
      "Publish a certificate with key fields + PDF upload",
      "Verification page (public or restricted) + QR code",
      "Revoke / replace without losing history",
      "Exports & proofs for audits and controls",
    ],
    usecasesTitle: "Sigma use cases",
    usecasesSubtitle:
      "Designed for certification & auditing firms: ISO + compliance. (Pilot can extend to other document types.)",
    usecases: [
      { t: "ISO 9001 (Quality)", d: "Certificate scope (site, activities, dates, certificate number)." },
      { t: "ISO 14001 (Environment)", d: "Environmental certification with verifiable status and references." },
      { t: "ISO 45001 (Health & Safety)", d: "HSE certificates for industrial sites and tenders." },
      { t: "ISO 27001 (Security)", d: "ISMS certification, frequently required by corporates and institutions." },
    ],
    howTitle: "How it works (Sigma side)",
    howSteps: [
      { t: "1) Sign in", d: "Sigma signs in to a secure workspace (users / password)." },
      { t: "2) Publish", d: "Upload the PDF + key fields (number, standard, client, dates, status)." },
      { t: "3) Proof & QR", d: "The platform generates an integrity proof + a verification QR code." },
      { t: "4) Client verification", d: "Clients scan the QR or open the link to view the official page + status." },
    ],
    trustTitle: "Simple client talking points",
    trustBullets: [
      "“Our certificates are verifiable via an official Sigma page.”",
      "“Any tampering is detectable.”",
      "“Status (valid/expired/revoked) is visible instantly.”",
    ],
    ctaTitle: "Launch a pilot in a few days",
    ctaSubtitle:
      "We configure your workspace (logo, domain, users) and you publish your first ISO certificates with verifiable proofs.",
    faqTitle: "FAQ (common questions)",
    faq: [
      {
        q: "Does verification work without an account?",
        a: "Yes. By default, verification pages can be public. They can also be restricted (login required).",
      },
      {
        q: "Can we revoke a certificate?",
        a: "Yes. The status becomes “revoked” and the verification page reflects it instantly (history preserved).",
      },
      {
        q: "What exactly is verified?",
        a: "Document integrity (tamper detection) plus the official status published by Sigma.",
      },
      {
        q: "Can the same client have multiple standards?",
        a: "Yes. Each certificate is a separate record with its own verification link/QR.",
      },
      {
        q: "What if a client loses the PDF?",
        a: "They can still verify via link/QR and view the official reference (status, dates, proof).",
      },
    ],
    footer: "Sigma Cert Value • Proof Registry",
    preview: {
      title: "Verification preview",
      status: "Status: VALID",
      number: "Number",
      standard: "Standard",
      issued: "Issued",
      expires: "Expires",
      proof: "Proof",
      verifiable: "Verifiable",
      copyLink: "Copy link",
      qr: "QR",
      qrTitle: "Scan QR (example)",
      qrHint: "The dashboard generates a QR code that redirects to the proof page.",
      open: "Open proof",
      scan: "Scan",
    },
  },
} as const;

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function QrMock() {
  return (
    <div className="relative h-28 w-28 rounded-2xl border border-white/12 bg-white/5 p-3">
      <div className="grid grid-cols-7 grid-rows-7 gap-[2px] h-full w-full">
        {Array.from({ length: 49 }).map((_, i) => {
          const on =
            i % 7 === 0 ||
            (i + 1) % 7 === 0 ||
            i < 7 ||
            i >= 42 ||
            i % 9 === 0 ||
            (i % 5 === 0 && i % 2 === 0);
          return (
            <div key={i} className={classNames("rounded-[2px]", on ? "bg-white/90" : "bg-white/10")} />
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-2 rounded-xl border border-emerald-300/30 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]" />
      <div className="pointer-events-none absolute left-3 right-3 top-1/2 h-px bg-emerald-300/35" />
    </div>
  );
}

export default function SigmaLanding() {
  const [lang, setLang] = useState<Lang>("FR");
  const c = useMemo(() => copy[lang], [lang]);

  return (
    <main className="min-h-screen text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[#070A14]" />
      <div className="fixed inset-0 -z-10 opacity-70 bg-[radial-gradient(circle_at_20%_10%,rgba(121,90,255,0.25),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(0,255,209,0.12),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(121,90,255,0.16),transparent_45%)]" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.65))]" />
      <div className="fixed inset-0 -z-10 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top bar */}
      <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo-sigma.png"
                alt="Sigma Cert Value"
                width={160}
                height={50}
                className="h-[50px] w-[160px] object-contain"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Sigma Cert Value</div>
              <div className="text-xs text-white/60">Proof Registry</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#product" className="hover:text-white">
              {c.nav.product}
            </a>
            <a href="#usecases" className="hover:text-white">
              {c.nav.usecases}
            </a>
            <a href="#how" className="hover:text-white">
              {c.nav.how}
            </a>
            <a href="#faq" className="hover:text-white">
              {c.nav.faq}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              className={classNames(
                "px-3 py-1.5 rounded-lg text-xs border",
                lang === "FR" ? "bg-white/10 border-white/20" : "bg-transparent border-white/10 text-white/70"
              )}
              onClick={() => setLang("FR")}
              type="button"
            >
              FR
            </button>
            <button
              className={classNames(
                "px-3 py-1.5 rounded-lg text-xs border",
                lang === "EN" ? "bg-white/10 border-white/20" : "bg-transparent border-white/10 text-white/70"
              )}
              onClick={() => setLang("EN")}
              type="button"
            >
              EN
            </button>

            <a href="/sigma/login" className="ml-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90">
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
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">{c.heroTitle}</h1>
            <p className="mt-4 text-white/75 text-lg leading-relaxed">{c.heroSubtitle}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/sigma/login" className="px-5 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90">
                {c.ctas.login}
              </a>
              <a href="/verify" className="px-5 py-3 rounded-2xl border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10">
                {c.ctas.verify}
              </a>
              <a href="#demo" className="px-5 py-3 rounded-2xl border border-white/10 text-white/70 hover:text-white hover:border-white/20">
                {c.ctas.book}
              </a>
            </div>

            <div className="mt-8 text-sm text-white/60">
              {c.logosTitle}
              <div className="mt-3 flex flex-wrap gap-2">
                {["ISO", "Audit", "Compliance", "QMS", "HSE", "ISMS"].map((x) => (
                  <span key={x} className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Preview card */}
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{c.preview.title}</div>
                <div className="text-xs text-white/60">{c.preview.status}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/60 text-xs">{c.preview.number}</div>
                  <div className="mt-1 font-semibold">BN24343/23034</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/60 text-xs">{c.preview.standard}</div>
                  <div className="mt-1 font-semibold">ISO 9001:2015</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/60 text-xs">{c.preview.issued}</div>
                  <div className="mt-1 font-semibold">09 Sep 2025</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-white/60 text-xs">{c.preview.expires}</div>
                  <div className="mt-1 font-semibold">08 Sep 2028</div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-white/60 text-xs">{c.preview.proof}</div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="text-xs text-white/70 truncate">
                    SHA-256: <span className="text-white/90">0x8f…c2a9</span> • CID: <span className="text-white/90">bafy…</span>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/20 text-emerald-200 text-xs">
                    {c.preview.verifiable}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{c.preview.qrTitle}</div>
                    <div className="mt-1 text-xs text-white/65 leading-relaxed">{c.preview.qrHint}</div>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <button type="button" className="px-3 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90">
                        {c.preview.open}
                      </button>
                      <button type="button" className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 text-white/80 font-semibold text-xs hover:bg-white/10">
                        {c.preview.scan}
                      </button>
                    </div>
                  </div>
                  <QrMock />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button type="button" className="flex-1 px-4 py-2 rounded-xl bg-white text-black font-semibold text-sm">
                  {c.preview.copyLink}
                </button>
                <button type="button" className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-white/80 font-semibold text-sm">
                  {c.preview.qr}
                </button>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-emerald-400/15 blur-2xl" />
            <div className="absolute -bottom-8 -left-10 h-36 w-36 rounded-full bg-violet-500/15 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Produit */}
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
                ? "Sigma garde ses processus métiers. La plateforme ajoute une couche de preuve et de vérification pour protéger la valeur des certificats."
                : "Sigma keeps existing processes. The platform adds a proof & verification layer that protects certificate value."}
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

      {/* Cas d'usage */}
      <section id="usecases" className="mx-auto max-w-6xl px-5 py-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">{c.usecasesTitle}</h2>
          <p className="mt-2 text-white/70">{c.usecasesSubtitle}</p>
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

      {/* Comment ça marche */}
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
            <a className="hover:text-white" href="/sigma/login">
              {c.ctas.login}
            </a>
            <a className="hover:text-white" href="/verify">
              {c.ctas.verify}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}