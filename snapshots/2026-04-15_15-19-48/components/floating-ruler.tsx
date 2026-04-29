const rulerMarks = Array.from({ length: 31 }, (_, index) => index);

export function FloatingRuler() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-1/2 z-[70] h-14 -translate-y-1/2 overflow-hidden border-y border-white/15 bg-white/95 text-[10px] text-forest-900 shadow-soft"
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-0 top-0 h-8"
        style={{
          backgroundImage: [
            "repeating-linear-gradient(to right, rgba(24,41,86,0.2) 0, rgba(24,41,86,0.2) calc((100% / 30) / 10 - 1px), rgba(24,41,86,0.85) calc((100% / 30) / 10 - 1px), rgba(24,41,86,0.85) calc(100% / 300))",
            "repeating-linear-gradient(to right, transparent 0, transparent calc(100% / 30 - 1px), rgba(24,41,86,0.95) calc(100% / 30 - 1px), rgba(24,41,86,0.95) calc(100% / 30))",
          ].join(", "),
          backgroundSize: "100% 100%, 100% 100%",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-8">
        {rulerMarks.map((mark) => (
          <div
            key={mark}
            className="absolute top-0 h-8"
            style={{
              left: `${(mark / 30) * 100}%`,
              width: mark === 30 ? 0 : `${100 / 30}%`,
            }}
          >
            <span className="absolute left-1 top-8 font-semibold">
              {mark}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 top-0 flex h-8 items-start">
        {Array.from({ length: 300 }, (_, index) => {
          const isCentimeter = index % 10 === 0;
          const isHalf = index % 5 === 0;

          return (
            <div
              key={index}
              className="relative h-full"
              style={{ width: `${100 / 300}%` }}
            >
              <span
                className="absolute left-0 top-0 w-px bg-forest-900/80"
                style={{
                  height: isCentimeter ? "100%" : isHalf ? "72%" : "45%",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-1 flex justify-between px-2 text-[9px] uppercase tracking-[0.18em] text-forest-700/80">
        <span>cm</span>
        <span>mm</span>
      </div>
    </div>
  );
}
