import { useState } from "react";
import { layoutStyle } from "./helpers";

export function SelectionDot({
	active: initialActive = false,
	onChange,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	const [active, setActive] = useState(initialActive);

	const handleClick = () => {
		const next = !active;
		setActive(next);
		onChange?.(next);
	};

	return (
		<button
			className={`selection-dot ${active ? "selection-dot--active" : ""} ${className}`}
			style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
			onClick={handleClick}
			aria-pressed={active}
		/>
	);
}
