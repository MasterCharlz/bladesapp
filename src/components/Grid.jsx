import { layoutStyle, spacingStyle, sp } from "./helpers";

export function Grid({
	columns,
	rows,
	gap,
	columnGap,
	rowGap,
	areas,
	autoFlow,
	as: Tag = "div",
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	const colValue =
		typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns;

	const gridStyle = {
		display: "grid",
		gridTemplateColumns: colValue || undefined,
		gridTemplateRows: rows || undefined,
		gap: sp(gap) || undefined,
		columnGap: sp(columnGap) || undefined,
		rowGap: sp(rowGap) || undefined,
		gridTemplateAreas: areas || undefined,
		gridAutoFlow: autoFlow || undefined,
		...layoutStyle(spacingProps),
		...spacingStyle(spacingProps),
		...style,
	};

	return (
		<Tag className={`grid ${className}`} style={gridStyle}>
			{children}
		</Tag>
	);
}
