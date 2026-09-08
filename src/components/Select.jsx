import { layoutStyle, spacingStyle } from "./helpers";

export function Select({
	options = [],
	value,
	onChange,
	placeholder,
	className = "",
	style = {},
	...spacingProps
}) {
	const normalizedOptions = options.map((option) =>
		typeof option === "string" ? { value: option, label: option } : option,
	);

	return (
		<div
			className="select-wrapper"
			style={{ ...layoutStyle(spacingProps), ...spacingStyle(spacingProps) }}
		>
			<select
				className={`select ${className}`}
				value={value}
				onChange={(event) => onChange?.(event.target.value)}
				style={style}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{normalizedOptions.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<span className="select-arrow">
				<i className="fa-solid fa-chevron-down" />
			</span>
		</div>
	);
}
