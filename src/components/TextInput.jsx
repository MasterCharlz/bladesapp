import { layoutStyle, spacingStyle } from "./helpers";

export function TextInput({
	placeholder,
	value,
	onChange,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<input
			type="text"
			className={`text-input ${className}`}
			placeholder={placeholder}
			value={value}
			onChange={(event) => onChange?.(event.target.value)}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		/>
	);
}
