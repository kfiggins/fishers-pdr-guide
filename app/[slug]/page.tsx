import { notFound } from "next/navigation";
import LeadForm from "../components/LeadForm";
import SiteShell from "../components/SiteShell";
import { pages } from "../content";

export async function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })); }
export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = pages[slug]; if (!page) notFound();
  return <SiteShell><main><section className="article-hero"><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="lede">{page.intro}</p><a className="button primary" href="#quote">Request an assessment</a></section><article className="article-body">{page.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.body.map(p => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map(x => <li key={x}>{x}</li>)}</ul>}</section>)}</article><section className="section quote-section compact" id="quote"><div className="quote-copy"><p className="eyebrow">Next step</p><h2>Get a local assessment.</h2><p>Share the basic details. If the request appears suitable, we may connect you with one independent provider serving Fishers.</p></div><LeadForm /></section></main></SiteShell>;
}
