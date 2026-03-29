import { memo } from "react";

const ScanlineEffect = memo(() => {
	return (
		<div
			className="pointer-events-none fixed inset-0 z-30"
			style={{
				background:
					"repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0, 255, 0, 0.015) 1px, rgba(0, 255, 0, 0.015) 2px)",
				willChange: "auto",
			}}
		/>
	);
});

ScanlineEffect.displayName = "ScanlineEffect";

export default ScanlineEffect;
