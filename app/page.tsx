import Link from "next/link";
import LeadForm from "./components/LeadForm";
import SiteShell from "./components/SiteShell";

const damageTypes = [
  { title: "Hail damage", text: "Multiple shallow dents across the roof, hood, trunk, or rails after a Hamilton County storm.", href: "/services/hail-damage-repair" },
  { title: "Door dings", text: "Parking-lot dents and creases where the factory paint is still intact.", href: "/services/door-ding-repair" },
  { title: "Minor dents", text: "Small-to-medium dents caused by carts, sports equipment, branches, and everyday mishaps.", href: "/services/minor-dent-repair" },
];

export default function Home() {
  return (
    <SiteShell>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Fishers, Indiana paintless dent repair guide</p>
            <h1>Find out if your dent can be repaired without paint.</h1>
            <p className="lede">Send a few details and photos. We’ll review your request and help connect you with an independent paintless dent repair provider serving Fishers.</p>
            <div className="hero-actions">
              <a className="button primary" href="#quote">Request a free assessment</a>
              <Link className="button secondary" href="/paintless-dent-repair-cost">See typical cost factors</Link>
            </div>
            <ul className="trust-list" aria-label="Service highlights">
              <li>No obligation</li><li>Factory paint stays intact when PDR is suitable</li><li>Local provider matching</li>
            </ul>
          </div>
          <div className="dent-card" aria-label="Paintless dent repair suitability overview">
            <div className="dent-visual"><span className="reflection reflection-one"/><span className="reflection reflection-two"/><span className="dent"/></div>
            <p className="card-kicker">A good PDR candidate usually has</p>
            <h2>Intact paint and reachable metal</h2>
            <p>Sharp creases, stretched metal, cracked paint, and damage along some panel edges may require conventional body work.</p>
            <Link href="/is-pdr-right-for-my-dent">Check your dent →</Link>
          </div>
        </section>

        <section className="proof-strip" aria-label="How the service works">
          <div><strong>1</strong><span>Describe the damage</span></div>
          <div><strong>2</strong><span>Share photos if available</span></div>
          <div><strong>3</strong><span>Hear from a local provider</span></div>
        </section>

        <section className="section intro">
          <div>
            <p className="eyebrow">Repair the panel, not the paint</p>
            <h2>A less invasive option for many dents</h2>
          </div>
          <div className="body-copy">
            <p>Paintless dent repair, usually called PDR, reshapes a vehicle’s original metal from behind the panel or with specialized exterior pulling methods. When the paint is intact and the metal has not been severely stretched, it can avoid fillers, repainting, and color matching.</p>
            <p>This site is an independent consumer resource and referral service. We do not operate a repair shop or claim a physical Fishers location.</p>
          </div>
        </section>

        <section className="section damage-section">
          <div className="section-heading"><p className="eyebrow">Common requests</p><h2>Damage that may qualify for PDR</h2></div>
          <div className="card-grid">
            {damageTypes.map((item, index) => (
              <article className="service-card" key={item.title}>
                <span className="card-number">0{index + 1}</span>
                <h3>{item.title}</h3><p>{item.text}</p><Link href={item.href}>Learn what to look for →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section split-panel">
          <div className="local-panel">
            <p className="eyebrow light">Built for Fishers drivers</p>
            <h2>Useful after hail, parking-lot dings, and daily wear.</h2>
            <p>Requests are matched based on damage type, vehicle details, availability, and service coverage in Fishers and nearby Hamilton County communities.</p>
            <p className="small-note">Provider availability is not guaranteed. Any estimate or repair agreement is made directly with the independent provider.</p>
          </div>
          <div className="check-panel">
            <h3>PDR may be worth checking when:</h3>
            <ul>
              <li>The paint is not cracked or missing</li><li>The dent is shallow or smoothly rounded</li><li>The damaged panel is metal rather than cracked plastic</li><li>You want to preserve the factory finish</li>
            </ul>
            <Link href="/is-pdr-right-for-my-dent">Read the full suitability guide</Link>
          </div>
        </section>

        <section className="section quote-section" id="quote">
          <div className="quote-copy">
            <p className="eyebrow">Free initial assessment</p>
            <h2>Tell us about the dent.</h2>
            <p>Photos taken in reflected light from a few angles are especially helpful. A provider may still need to inspect the vehicle before giving a final price.</p>
            <div className="privacy-callout"><strong>What happens next?</strong><span>We review your request and may share it with one independent repair provider that serves your area. Your information is not posted publicly.</span></div>
          </div>
          <LeadForm />
        </section>

        <section className="section faq-section">
          <div className="section-heading"><p className="eyebrow">Straight answers</p><h2>Frequently asked questions</h2></div>
          <div className="faq-list">
            <details><summary>How much does paintless dent repair cost in Fishers?</summary><p>Price varies with dent size, depth, location, panel access, metal type, and the number of dents. Hail claims are usually assessed differently from a single door ding. See our <Link href="/paintless-dent-repair-cost">cost guide</Link> for useful factors rather than a made-up quote.</p></details>
            <details><summary>Does this website perform the repair?</summary><p>No. Fishers Dent Repair Guide is an independent information and referral website. When possible, we connect requests with an independent provider serving the area.</p></details>
            <details><summary>Will PDR affect my factory paint?</summary><p>The purpose of PDR is to reshape the original panel without sanding or repainting it. Suitability depends on the condition of the paint and metal, so an inspection is important.</p></details>
            <details><summary>Can hail damage be handled through insurance?</summary><p>Comprehensive auto coverage may cover hail damage, subject to your policy and deductible. Coverage decisions belong to your insurer. A repair provider may document damage and help explain the repair process.</p></details>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
