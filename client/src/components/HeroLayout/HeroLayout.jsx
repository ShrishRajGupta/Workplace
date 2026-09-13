import "./HeroLayout.css";

// Indigo poster background used by the landing, login and register pages.
// `variant` picks the composition: "landing" (left-anchored copy) or "auth" (centred card).
const HeroLayout = ({ variant = "auth", children }) => (
  <section className={`hero hero--${variant}`}>
    <div className="hero__inner">{children}</div>
  </section>
);

export default HeroLayout;
