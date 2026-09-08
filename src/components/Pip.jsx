import { useState } from "react";

export function Pip({
	active: initialActive = false,
	onChange,
	className = "",
	style = {},
}) {
	const [active, setActive] = useState(initialActive);

	const handleClick = () => {
		const next = !active;
		setActive(next);
		onChange?.(next);
	};

	return (
		<div
			className={`pip ${active ? "pip--active" : ""} ${className}`}
			style={style}
			onClick={handleClick}
			role="button"
			tabIndex={0}
			onKeyDown={(event) => event.key === "Enter" && handleClick()}
		/>
	);
}
