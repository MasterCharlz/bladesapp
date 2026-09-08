import { layoutStyle, spacingStyle } from "./helpers";

export function Body({
	bold,
	color,
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<p
			className={`body-text ${bold ? "body-text--bold" : ""} ${color ? `color--${color}` : ""} ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</p>
	);
}
