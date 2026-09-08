export function LairConnector({
	id,
	orientation = "horizontal",
	hidden = false,
	active = false,
	className = "",
	style = {},
}) {
	return (
		<div
			data-id={id}
			data-active={active}
			className={`lair-connector lair-connector--${orientation} ${active ? "lair-connector--active" : "lair-connector--inactive"} ${hidden ? "lair-connector--hidden" : ""} ${className}`}
			style={style}
		/>
	);
}
