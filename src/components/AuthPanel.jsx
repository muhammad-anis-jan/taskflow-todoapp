import Brand from "./Brand";
export default function AuthPanel({ title, subtitle, children, footer }) {
  return (
    <main className="auth">
      <section>
        <Brand />
        <div className="auth-card">
          <small className="kicker">A FRESH START, EVERY DAY</small>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {children}
          {footer}
        </div>
        <small>Copyright 2026 TaskFlow</small>
      </section>
      <aside>
        <b>
          Start where
          <br />
          you are.
        </b>
        <p>A little more room to think.</p>
        <i>t</i>
      </aside>
    </main>
  );
}
