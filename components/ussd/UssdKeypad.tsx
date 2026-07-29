interface UssdKeypadProps {
  onInput: (key: string) => void;
  onSend: () => void;
  onCancel: () => void;
}

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

export function UssdKeypad({ onInput, onSend, onCancel }: UssdKeypadProps) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-700">
      <div className="grid grid-cols-3 gap-2">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => onInput(key)}
            className="h-10 rounded bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-colors flex items-center justify-center"
          >
            {key}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button onClick={onSend} className="h-10 rounded bg-green-700 hover:bg-green-600 text-white text-xs font-medium transition-colors">
          SEND
        </button>
        <button onClick={onCancel} className="h-10 rounded bg-red-700 hover:bg-red-600 text-white text-xs font-medium transition-colors">
          CANCEL
        </button>
      </div>
    </div>
  );
}
