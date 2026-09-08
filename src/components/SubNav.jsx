import { Icon } from "./Icon";
import { layoutStyle } from "./helpers";

export function SubNav({
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
			className={`sub-nav ${className}`}
			style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
		>
			{items.map((item) => (
				<button
					key={item.id}
					className={`sub-nav__item ${activeId === item.id ? "sub-nav__item--active" : ""}`}
					onClick={() => onChange?.(item.id)}
				>
					{item.icon && <Icon icon={item.icon} />}
				</button>
			))}
		</nav>
	);
}
