import { layoutStyle, spacingStyle } from "./helpers";

export function Banner({
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<div
			className={`banner ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</div>
	);
}
