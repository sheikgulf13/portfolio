import { stackRows } from "@/utils/portfolioData";
import { Fragment } from "react";

function MarqueeItems({ items }) {
  return (
    <>
      {items.map((item, index) => (
        <Fragment key={`${item}-${index}-group`}>
          <span className="marquee-item">{item}</span>
          <span className="marquee-item marquee-sep">◆</span>
        </Fragment>
      ))}
    </>
  );
}

export default function StackMarquee() {
  return (
    <section id="stack" data-screen-label="02 Stack">
      <div className="eyebrow">STACK</div>

      {stackRows.map((row) => (
        <div className="marquee-row" key={row.id}>
          <div className="marquee-wrap" id={`${row.id}-wrap`}>
            <div className={`marquee-track marquee-anim-${row.direction}`} id={row.id}>
              <MarqueeItems items={row.items} />
              <MarqueeItems items={row.items} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
