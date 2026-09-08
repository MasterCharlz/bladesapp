import { Icon } from "./Icon";
import { layoutStyle, spacingStyle } from "./helpers";

export function Button({
	variant = "primary",
	icon,
	fullWidth,
	children,
	onClick,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<button
			className={`btn btn--${variant} ${fullWidth ? "btn--full-width" : ""} ${className}`}
			style={{
				...layoutStyle({ ...spacingProps, fullWidth }),
				...spacingStyle({ ...spacingProps, fullWidth }),
				...style,
			}}
			onClick={onClick}
		>
			{icon && <Icon icon={icon} />}
			{children}
		</button>
	);
}
