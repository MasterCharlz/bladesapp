import { layoutStyle, spacingStyle } from "./helpers";

export function Heading({
	size = 2,
	color,
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	const Tag = `h${size}`;
	return (
		<Tag
			className={`heading heading--${size} ${color ? `color--${color}` : ""} ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</Tag>
	);
}
