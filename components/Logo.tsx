interface LogoProps {
  className?: string;
  size?: number;
  /**
   * The surface the logo sits on.
   * - "auto" (default): follows the site theme (light/dark toggle).
   * - "dark": always use the wordmark built for dark surfaces
   *   (e.g. the broker portal, which is always dark regardless of theme).
   */
  surface?: "auto" | "dark";
}

const Logo = ({ className = "", size = 40, surface = "auto" }: LogoProps) => {
  const imgStyle = { height: size, width: "auto", objectFit: "contain" as const };

  if (surface === "dark") {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <img
          src="/assetlift-logo-dark.png"
          alt="Asset Lift Lending"
          className="drop-shadow-[0_8px_18px_rgba(0,0,0,0.34)]"
          style={imgStyle}
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src="/assetlift-logo.png"
        alt="Asset Lift Lending"
        className="dark:hidden drop-shadow-[0_8px_18px_rgba(0,0,0,0.28)]"
        style={imgStyle}
      />
      <img
        src="/assetlift-logo-dark.png"
        alt="Asset Lift Lending"
        className="hidden dark:block drop-shadow-[0_8px_18px_rgba(0,0,0,0.34)]"
        style={imgStyle}
      />
    </span>
  );
};

export default Logo;
