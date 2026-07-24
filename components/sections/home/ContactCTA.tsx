import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppButton } from "@/components/cta/WhatsAppButton";
import { PhoneButton } from "@/components/cta/PhoneButton";
import { ShaderBackground } from "@/components/webgl/ShaderBackground";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden border-t border-hairline">
      <ShaderBackground />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-[clamp(80px,10vw,160px)] text-center md:px-10">
        <Reveal>
          <p className="type-eyebrow mb-4 text-green">Direkter Draht</p>
          <h2 className="type-display mx-auto max-w-3xl text-4xl md:text-6xl">
            Schick Annette dein Logo — sie macht was draus.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-soft">
            Du schreibst direkt mit Annette — keine Hotline, kein Ticket,
            keine Warteschleife.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppButton size="lg" />
            <PhoneButton size="lg" />
          </div>
          <p className="mt-6 text-[0.85rem] text-ink-soft">
            Nachhaltig gedacht: auf Wunsch aus recyceltem PET, Baumwolle oder Bambus.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
