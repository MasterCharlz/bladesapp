import { Icon } from "./Icon";
import { layoutStyle } from "./helpers";

export function Nav({
	items = [],
	activeId,
	onChange,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	return (
		<nav
			className={`nav ${className}`}
			style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
		>
			{items.map((item) => (
				<button
					key={item.id}
					className={`nav__item ${activeId === item.id ? "nav__item--active" : ""}`}
					onClick={() => onChange?.(item.id)}
				>
					{item.icon && <Icon icon={item.icon} />}
				</button>
			))}
		</nav>
	);
}
