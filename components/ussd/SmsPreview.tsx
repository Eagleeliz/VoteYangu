interface SmsPreviewProps {
  message: string | null;
}

export function SmsPreview({ message }: SmsPreviewProps) {
  return (
    <div className="glass rounded-2xl p-6 border border-vb-cyan/20 theme-transition">
      <div className="flex items-center gap-3 mb-3">
        <svg className="w-5 h-5 text-vb-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <h3 className="font-display font-semibold" style={{ color: "var(--text-primary)" }}>SMS Preview</h3>
      </div>
      <div
        className="rounded-lg p-3 text-sm border"
        style={{ background: "var(--bg-tertiary)", color: "var(--text-secondary)", borderColor: "var(--border-subtle)" }}
      >
        {message || "No SMS sent yet."}
      </div>
    </div>
  );
}
