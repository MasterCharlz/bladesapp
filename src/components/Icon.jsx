import { colorVar } from "./helpers";

export function Icon({ icon, color, size, className = "", style = {} }) {
	return (
		<i
			className={`fa-solid fa-${icon} ${className}`}
			style={{ color: colorVar(color), fontSize: size, ...style }}
		/>
	);
}
