interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 40 }: LogoProps) => {
  const imgStyle = { height: size, width: 'auto', objectFit: 'contain' as const };

  return (
    <span className={`inline-flex items-center rounded-md bg-white/95 p-1 ${className}`}>
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
