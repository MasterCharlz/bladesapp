import { colorVar, layoutStyle, spacingStyle } from "./helpers";

export function Card({
	borderColor,
	bgColor,
	backgroundColor,
	noBorder,
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	const borderStyle = noBorder
		? { borderTop: "none" }
		: borderColor
			? { borderTopColor: colorVar(borderColor) }
			: {};
	const backgroundStyle =
		bgColor || backgroundColor
			? { backgroundColor: colorVar(bgColor || backgroundColor) }
			: {};

	return (
		<div
			className={`card ${noBorder ? "card--no-border" : ""} ${className}`}
			style={{
				...borderStyle,
				...backgroundStyle,
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</div>
	);
}
