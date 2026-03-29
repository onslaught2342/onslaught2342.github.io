import { useEffect, useState, useRef, memo, useCallback } from "react";

const ASCII_SKULL = `
    ██████████████
  ██              ██
██    ██      ██    ██
██    ██      ██    ██
██                  ██
██    ██████████    ██
██  ██  ██  ██  ██  ██
  ██    ██  ██    ██
    ██████████████
        ████
    ████████████
`;

const IDLE_TIMEOUT = 60_000; // 60 seconds

const IdleLockScreen = memo(() => {
	const [locked, setLocked] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const [rotation, setRotation] = useState(0);

	const resetTimer = useCallback(() => {
		if (locked) {
			setLocked(false);
		}
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => setLocked(true), IDLE_TIMEOUT);
	}, [locked]);

	// Rotation animation when locked
	useEffect(() => {
		if (!locked) return;
		const interval = setInterval(() => {
			setRotation((r) => (r + 1) % 360);
		}, 50);
		return () => clearInterval(interval);
	}, [locked]);

	useEffect(() => {
		const events = [
			"mousemove",
			"keydown",
			"mousedown",
			"touchstart",
			"scroll",
		];
		const handler = () => resetTimer();

		events.forEach((e) =>
			window.addEventListener(e, handler, { passive: true }),
		);
		timerRef.current = setTimeout(() => setLocked(true), IDLE_TIMEOUT);

		return () => {
			events.forEach((e) => window.removeEventListener(e, handler));
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [resetTimer]);

	if (!locked) return null;

	return (
		<div
			className="fixed inset-0 z-[9997] flex cursor-pointer flex-col items-center justify-center bg-background/95 backdrop-blur-md"
			onClick={() => setLocked(false)}
			role="button"
			tabIndex={0}
			onKeyDown={() => setLocked(false)}
		>
			<div
				className="transition-transform duration-100"
				style={{ transform: `rotateY(${rotation}deg)` }}
			>
				<pre className="glow-text select-none font-mono text-[8px] leading-tight text-primary sm:text-xs md:text-sm">
					{ASCII_SKULL}
				</pre>
			</div>
			<p className="mt-8 animate-pulse font-display text-lg font-bold tracking-[0.2em] text-destructive sm:text-2xl">
				IDLE DETECTED — LOCKING TERMINAL
			</p>
			<p className="mt-4 animate-pulse text-xs text-muted-foreground">
				[ move mouse or press any key to unlock ]
			</p>
		</div>
	);
});

IdleLockScreen.displayName = "IdleLockScreen";
export default IdleLockScreen;
