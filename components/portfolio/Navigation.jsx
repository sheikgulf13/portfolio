export default function Navigation() {
  return (
    <nav>
      <a href="#hero" className="nav-logo">
        Sheik Gulfaan
      </a>
      <div className="nav-right">
        <ul className="nav-links">
          <li>
            <a href="#capabilities" data-magnetic data-cursor-size="sm">
              What I Build
            </a>
          </li>
          <li>
            <a href="#process" data-magnetic data-cursor-size="sm">
              Process
            </a>
          </li>
          <li>
            <a href="#about" data-magnetic data-cursor-size="sm">
              About
            </a>
          </li>
          <li>
            <a href="#contact" data-magnetic data-cursor-size="sm">
              Contact
            </a>
          </li>
        </ul>
        <button id="theme-toggle" type="button" aria-label="Toggle theme" data-cursor-size="sm">
          <span id="theme-icon">☽</span>
        </button>
      </div>
    </nav>
  );
}
