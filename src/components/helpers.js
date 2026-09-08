const SPACE = {
	none: "0px",
	xs: "4px",
	sm: "8px",
	md: "16px",
	lg: "24px",
	xl: "40px",
	xxl: "80px",
};

export const sp = (value) =>
	value !== undefined ? (SPACE[value] ?? value) : undefined;

export function spacingStyle(props) {
	const style = {};
	if (props.padding !== undefined) style.padding = sp(props.padding);
	if (props.paddingTop !== undefined) style.paddingTop = sp(props.paddingTop);
	if (props.paddingRight !== undefined)
		style.paddingRight = sp(props.paddingRight);
	if (props.paddingBottom !== undefined)
		style.paddingBottom = sp(props.paddingBottom);
	if (props.paddingLeft !== undefined)
		style.paddingLeft = sp(props.paddingLeft);
	if (props.paddingX !== undefined) {
		style.paddingLeft = sp(props.paddingX);
		style.paddingRight = sp(props.paddingX);
	}
	if (props.paddingY !== undefined) {
		style.paddingTop = sp(props.paddingY);
		style.paddingBottom = sp(props.paddingY);
	}
	if (props.margin !== undefined) style.margin = sp(props.margin);
	if (props.marginTop !== undefined) style.marginTop = sp(props.marginTop);
	if (props.marginRight !== undefined)
		style.marginRight = sp(props.marginRight);
	if (props.marginBottom !== undefined)
		style.marginBottom = sp(props.marginBottom);
	if (props.marginLeft !== undefined) style.marginLeft = sp(props.marginLeft);
	if (props.marginX !== undefined) {
		style.marginLeft = sp(props.marginX);
		style.marginRight = sp(props.marginX);
	}
	if (props.marginY !== undefined) {
		style.marginTop = sp(props.marginY);
		style.marginBottom = sp(props.marginY);
	}
	return style;
}

export function layoutStyle(props = {}) {
	const style = {};
	if (props.fullWidth) style.width = "100%";
	if (props.fullHeight) style.height = "100%";
	if (props.maxWidth !== undefined) {
		style.maxWidth =
			typeof props.maxWidth === "number"
				? `${props.maxWidth}px`
				: props.maxWidth;
	}
	return style;
}

export const colorVar = (token) => (token ? `var(--${token})` : undefined);
