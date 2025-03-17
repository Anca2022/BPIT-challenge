import "./ctaButton.scss";
import { CtaButtonProps } from "../../types/Props";

export default function CtaButton({
  handleClick,
  children,
}: React.PropsWithChildren<CtaButtonProps>) {
  return (
    <button className="cta-btn" onClick={handleClick}>
      {children}
    </button>
  );
}
