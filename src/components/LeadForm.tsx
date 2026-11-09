export default function LeadForm() {
    return (
        <section id="contact" className="py-32 px-6 border-t border-white/5">
            <div className="max-w-xl mx-auto text-center">
                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--color-ember)]">
                    Work with NELO
                </p>
                <h2 className="font-[var(--font-display)] text-4xl md:text-5xl tracking-wider mt-4 uppercase">
                    Build what moves next.
                </h2>
                <p className="text-[var(--color-mist)] mt-5 leading-relaxed">
                    Tell us about your robotics or AI engineering project.
                </p>
                <a
                    href="mailto:contact@nelo-robotics.com"
                    className="inline-flex mt-9 bg-[var(--color-ember)] text-[var(--color-void)] px-10 py-4 font-bold text-sm tracking-[0.2em] uppercase hover:brightness-110 transition-all"
                >
                    Contact NELO
                </a>
            </div>
        </section>
    );
}
