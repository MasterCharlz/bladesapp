import { useEffect, useState } from "react";

export function LairNode({
	id,
	position,
	title,
	description,
	active: initialActive = false,
	onClick,
	onChange,
	className = "",
	style = {},
	children,
}) {
	const [active, setActive] = useState(initialActive);

	useEffect(() => {
		setActive(initialActive);
	}, [initialActive]);

	function handleClick(event) {
		const nextActive = !active;
		setActive(nextActive);
		onChange?.(nextActive);
		onClick?.(event);
	}

	return (
		<button
			type="button"
			data-id={id}
			data-position={position}
			data-active={active}
			title={description || title}
			className={`lair-node ${active ? "lair-node--active" : "lair-node--inactive"} ${className}`}
			style={style}
			onClick={handleClick}
			aria-pressed={active}
		>
			{children || title}
		</button>
	);
}
