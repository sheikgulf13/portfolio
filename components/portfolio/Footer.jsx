import { socialLinks } from "@/utils/portfolioData";

export default function Footer() {
  return (
    <footer data-screen-label="Footer">
      <div className="footer-col">© 2026 SHEIK · CHENNAI, IN</div>
      <ul className="footer-social-links" aria-label="Social links">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noreferrer" data-magnetic data-cursor-size="sm">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="footer-col footer-col-right" id="ist-clock">
        --:--:-- IST
      </div>
    </footer>
  );
}
