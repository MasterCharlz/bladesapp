import { layoutStyle } from "./helpers";

export function Stepper({
	amount = 5,
	activeCount = 0,
	type,
	getSegmentClass,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	return (
		<div
			className={`stepper ${className}`}
			style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
		>
			{Array.from({ length: amount }).map((_, index) => {
				const segmentClass = getSegmentClass?.(index);

				return (
					<div
						key={index}
						className={`stepper__segment ${index < activeCount ? "stepper__segment--active" : ""}${segmentClass ? ` ${segmentClass}` : ""}`}
						data-type={type}
					/>
				);
			})}
		</div>
	);
}
