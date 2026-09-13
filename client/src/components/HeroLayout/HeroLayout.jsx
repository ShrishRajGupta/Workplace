import "./HeroLayout.css";

const HERO_IMAGE =
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

// Blurred office photo with a floating card on top. Used by the landing, login and register
// pages. `variant` only changes where the card sits.
const HeroLayout = ({ variant = "auth", children }) => (
  <div className={`hero hero--${variant}`}>
    <img className="hero__image" src={HERO_IMAGE} alt="" />
    <div className="hero__card">{children}</div>
  </div>
);

export default HeroLayout;
