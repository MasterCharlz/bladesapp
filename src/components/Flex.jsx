import { layoutStyle, spacingStyle, sp } from "./helpers";

export function Flex({
	direction,
	wrap,
	justifyContent,
	alignItems,
	alignContent,
	gap,
	flexGrow,
	flexShrink,
	inline,
	as: Tag = "div",
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	const flexStyle = {
		display: inline ? "inline-flex" : "flex",
		flexDirection: direction || undefined,
		flexWrap: wrap || undefined,
		justifyContent: justifyContent || undefined,
		alignItems: alignItems || undefined,
		alignContent: alignContent || undefined,
		gap: sp(gap) || undefined,
		flexGrow: flexGrow ?? undefined,
		flexShrink: flexShrink ?? undefined,
		...layoutStyle(spacingProps),
		...spacingStyle(spacingProps),
		...style,
	};

	return (
		<Tag className={`flex ${className}`} style={flexStyle}>
			{children}
		</Tag>
	);
}
