import { layoutStyle, spacingStyle } from "./helpers";

export function Caption({
	color,
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<span
			className={`caption ${color ? `color--${color}` : ""} ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</span>
	);
}
