import { Icon } from "./Icon";
import { colorVar, layoutStyle, spacingStyle } from "./helpers";

export function IconButton({
	icon,
	color,
	variant = "secondary",
	onClick,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<button
			className={`icon-btn btn--${variant} ${className}`}
			style={{
				color: colorVar(color),
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
			onClick={onClick}
		>
			<Icon icon={icon} />
		</button>
	);
}
