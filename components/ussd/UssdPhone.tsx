interface UssdPhoneProps {
  displayText: string;
}

export function UssdPhone({ displayText }: UssdPhoneProps) {
  return (
    <div className="flex-1 text-green-400 text-sm leading-relaxed whitespace-pre-line font-mono">
      {displayText}
    </div>
  );
}
