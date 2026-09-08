import { useEffect, useRef } from "react";
import { layoutStyle } from "./helpers";

export function Modal({
	open,
	onClose,
	children,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	const overlayRef = useRef(null);

	useEffect(() => {
		if (!open) return;
		const handler = (event) => {
			if (event.target === overlayRef.current) onClose?.();
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="modal-overlay" ref={overlayRef}>
			<div
				className={`modal-card ${className}`}
				style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
			>
				{children}
			</div>
		</div>
	);
}
