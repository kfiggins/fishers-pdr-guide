"use client";

import { FormEvent, useState } from "react";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) { setStatus("error"); return; }
    setStatus("sending");
    const form = event.currentTarget;
    const response = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } }).catch(() => null);
    if (response?.ok) { setStatus("sent"); form.reset(); } else setStatus("error");
  }
  if (status === "sent") return <div className="form-success" role="status"><span>✓</span><h3>Request received</h3><p>Thanks. We’ll review the details and follow up using the contact information you provided.</p></div>;
  return <form className="lead-form" onSubmit={submit}>
    <div className="field-row"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>ZIP code<input name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" required /></label></div>
    <label>Email address<input type="email" name="email" autoComplete="email" required /></label>
    <label>Phone number<input type="tel" name="phone" autoComplete="tel" required /></label>
    <div className="field-row"><label>Vehicle year<input name="vehicleYear" inputMode="numeric" placeholder="2021" /></label><label>Make / model<input name="vehicle" placeholder="Honda Accord" /></label></div>
    <label>What happened?<select name="damageType" required defaultValue=""><option value="" disabled>Select damage type</option><option>Door ding</option><option>Hail damage</option><option>Minor dent</option><option>Body-line or creased dent</option><option>Not sure</option></select></label>
    <label>Describe the damage<textarea name="description" rows={4} placeholder="Which panel is damaged? About how large is the dent? Is the paint intact?" required /></label>
    <input type="hidden" name="source" value="fishers-pdr-guide" />
    <label className="consent"><input type="checkbox" name="consent" value="yes" required /><span>I agree that Fishers Dent Repair Guide may contact me about this request and share my information with one independent repair provider serving my area. Consent is not a condition of purchase. Message and data rates may apply.</span></label>
    <button className="button primary submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request my free assessment"}</button>
    {status === "error" && <p className="form-error" role="alert">Online requests are not connected yet. Please try again after the site contact line is activated.</p>}
    <p className="form-fineprint">No repair, price, appointment, or provider availability is guaranteed by submitting this form.</p>
  </form>;
}
