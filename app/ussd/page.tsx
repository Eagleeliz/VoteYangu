"use client";

import { UssdPhone } from "@/components/ussd/UssdPhone";
import { UssdKeypad } from "@/components/ussd/UssdKeypad";
import { UssdLog } from "@/components/ussd/UssdLog";
import { SmsPreview } from "@/components/ussd/SmsPreview";
import { useUssd } from "@/hooks/useUssd";

export default function UssdPage() {
  const { displayText, log, smsPreview, inputKey, send, cancel } = useUssd();

  return (
    <div className="page-transition min-h-screen py-12" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            USSD Simulator
          </h1>
          <p style={{ color: "var(--text-muted)" }}>Experience how feature phone users interact with VoteBridge</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex justify-center">
            <div className="ussd-screen w-72 h-[500px] p-4 pt-8 flex flex-col">
              <UssdPhone displayText={displayText} />
              <UssdKeypad onInput={inputKey} onSend={send} onCancel={cancel} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 theme-transition">
              <h3 className="font-display font-semibold text-lg mb-3" style={{ color: "var(--text-primary)" }}>
                How USSD Works
              </h3>
              <ul className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
                {[
                  { num: "1", text: "Dial *123# on any mobile phone" },
                  { num: "2", text: "Select an option from the menu" },
                  { num: "3", text: "Follow the prompts — no internet required" },
                  { num: "4", text: "Receive SMS confirmation after each action" },
                ].map((item) => (
                  <li key={item.num} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-vb-accent/10 text-vb-accent flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {item.num}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <UssdLog logs={log} />
            <SmsPreview message={smsPreview} />
          </div>
        </div>
      </div>
    </div>
  );
}
