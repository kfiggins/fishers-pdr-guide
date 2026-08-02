import Link from "next/link";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const phone = process.env.NEXT_PUBLIC_LEAD_PHONE;
  const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : null;
  return <>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Fishers Dent Repair Guide home"><span className="brand-mark">F</span><span>Fishers Dent<br/><b>Repair Guide</b></span></Link>
      <nav aria-label="Main navigation"><Link href="/is-pdr-right-for-my-dent">Is PDR right?</Link><Link href="/paintless-dent-repair-cost">Cost guide</Link><Link href="/how-it-works">How it works</Link></nav>
      {phoneHref ? <a className="header-call" href={phoneHref} data-track="phone">Call {phone}</a> : <a className="header-call" href="/#quote">Get an assessment</a>}
    </header>
    {children}
    <footer>
      <div className="footer-main"><div><Link className="brand footer-brand" href="/"><span className="brand-mark">F</span><span>Fishers Dent<br/><b>Repair Guide</b></span></Link><p>An independent consumer information and provider-matching website for paintless dent repair requests in Fishers, Indiana.</p></div><div><h3>Explore</h3><Link href="/services/hail-damage-repair">Hail damage</Link><Link href="/services/door-ding-repair">Door dings</Link><Link href="/paintless-dent-repair-cost">Cost guide</Link></div><div><h3>About</h3><Link href="/how-it-works">How it works</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
      <div className="footer-legal"><span>© {new Date().getFullYear()} Fishers Dent Repair Guide</span><span>Not a repair shop, insurer, or government service.</span></div>
    </footer>
  </>;
}
