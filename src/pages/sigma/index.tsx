export default function SigmaLanding() {
  return (
    <main style={{ padding: 32, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Sigma Cert Value</h1>
        <p style={{ marginTop: 8, opacity: 0.85 }}>
          Espace sécurisé pour publier des certificats et fournir une preuve d’authenticité vérifiable.
        </p>
        <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/sigma/login" style={{ padding: "10px 14px", borderRadius: 10, background: "#111", color: "#fff", textDecoration: "none", fontWeight: 600 }}>
            Se connecter
          </a>
          <a href="/verify" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #ddd", textDecoration: "none", fontWeight: 600, color: "#111" }}>
            Vérifier un certificat
          </a>
        </div>
      </div>
    </main>
  );
}
