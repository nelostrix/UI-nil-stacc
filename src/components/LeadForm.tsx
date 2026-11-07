"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";

/* Mingrow capture form. Fields are loaded from Mingrow on every visit, so
   editing the form there changes it here with no deploy. */
const API = process.env.NEXT_PUBLIC_MINGROW_API;
const FORM_ID = process.env.NEXT_PUBLIC_MINGROW_FORM ?? "dF_euognzUuc";

type Field = {
    name: string;
    label: string;
    type: string;
    required: boolean;
    placeholder?: string;
    options?: string[];
};

type Definition = {
    headline: string;
    blurb: string;
    button_label: string;
    fields: Field[];
    honeypot: string;
    rendered_at: number;
};

const inputClass =
    "w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-ember)]/60 transition-colors";

export default function LeadForm() {
    const [form, setForm] = useState<Definition | null>(null);
    const [state, setState] = useState<"loading" | "ready" | "sending" | "sent" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!API) {
            setState("error");
            return;
        }
        fetch(`${API}/api/v1/f/${FORM_ID}`)
            .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
            .then((d: Definition) => {
                setForm(d);
                setState("ready");
            })
            .catch(() => setState("error"));
    }, []);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form) return;
        const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
        setState("sending");
        try {
            const res = await fetch(`${API}/api/v1/f/${FORM_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, rendered_at: form.rendered_at }),
            });
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(body.detail || "Something went wrong.");
            setMessage(body.message || "Thank you — we will be in touch.");
            setState("sent");
        } catch (err) {
            setMessage(err instanceof Error ? err.message : "Something went wrong.");
            setState("ready");
        }
    };

    return (
        <section id="contact" className="py-32 px-6 border-t border-white/5">
            <div className="max-w-xl mx-auto">
                {state === "loading" && <p className="text-center text-[var(--color-mist)]">Loading…</p>}
                {state === "error" && (
                    <p className="text-center text-[var(--color-mist)]">
                        The online form is unavailable. Email{" "}
                        <a className="text-white underline underline-offset-4" href="mailto:contact@nelo-robotics.com">
                            contact@nelo-robotics.com
                        </a>
                        {" "}and we will be in touch.
                    </p>
                )}
                {state === "sent" && (
                    <div className="text-center">
                        <h2 className="font-[var(--font-display)] text-4xl tracking-wider">THANK YOU</h2>
                        <p className="text-[var(--color-mist)] mt-4">{message}</p>
                    </div>
                )}
                {form && (state === "ready" || state === "sending") && (
                    <>
                        <h2 className="font-[var(--font-display)] text-4xl md:text-5xl tracking-wider text-center uppercase">
                            {form.headline}
                        </h2>
                        {form.blurb && <p className="text-[var(--color-mist)] mt-4 text-center">{form.blurb}</p>}

                        <form onSubmit={submit} className="mt-10 space-y-5">
                            <Label text="Email" required>
                                <input name="email" type="email" required className={inputClass} placeholder="you@company.com" />
                            </Label>
                            {form.fields.map((f) => (
                                <Control key={f.name} field={f} />
                            ))}

                            {/* Hidden from people; bots that fill every input get caught. */}
                            <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                                <input name={form.honeypot} tabIndex={-1} autoComplete="off" />
                            </div>

                            {message && <p className="text-sm text-red-400">{message}</p>}

                            <button
                                type="submit"
                                disabled={state === "sending"}
                                className="w-full bg-[var(--color-ember)] text-[var(--color-void)] px-10 py-4 font-bold text-sm tracking-[0.2em] uppercase hover:brightness-110 transition-all disabled:opacity-60"
                            >
                                {state === "sending" ? "Sending…" : form.button_label}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </section>
    );
}

function Label({ text, required, children }: { text: string; required?: boolean; children: ReactNode }) {
    return (
        <label className="block">
            <span className="block mb-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--color-mist)]">
                {text}
                {required && <span className="text-[var(--color-ember)]"> *</span>}
            </span>
            {children}
        </label>
    );
}

function Control({ field: f }: { field: Field }) {
    const common = { name: f.name, required: f.required, placeholder: f.placeholder || undefined };

    if (f.type === "checkbox") {
        return (
            <label className="flex items-center gap-3 text-sm text-[var(--color-mist)]">
                <input type="checkbox" name={f.name} value="yes" required={f.required} className="accent-[var(--color-ember)]" />
                {f.label}
            </label>
        );
    }
    if (f.type === "radio") {
        return (
            <fieldset>
                <legend className="mb-2 text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--color-mist)]">{f.label}</legend>
                <div className="space-y-2">
                    {(f.options ?? []).map((o) => (
                        <label key={o} className="flex items-center gap-3 text-sm text-white/80">
                            <input type="radio" name={f.name} value={o} required={f.required} className="accent-[var(--color-ember)]" />
                            {o}
                        </label>
                    ))}
                </div>
            </fieldset>
        );
    }
    return (
        <Label text={f.label} required={f.required}>
            {f.type === "textarea" ? (
                <textarea {...common} rows={4} className={inputClass} />
            ) : f.type === "select" ? (
                <select {...common} className={inputClass} defaultValue="">
                    <option value="" disabled>
                        {f.placeholder || "Choose…"}
                    </option>
                    {(f.options ?? []).map((o) => (
                        <option key={o} value={o} className="bg-black">
                            {o}
                        </option>
                    ))}
                </select>
            ) : (
                <input {...common} type={f.type} className={inputClass} />
            )}
        </Label>
    );
}
