import React, { useState } from "react";
import { Icon } from "./Icon";
import { layoutStyle, spacingStyle } from "./helpers";

function CollapsibleHeader({
	children,
	collapsed,
	onToggle,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<div
			className={`collapsible__header ${collapsed ? "" : "collapsible__header--open"} ${className}`}
			style={{ ...spacingStyle(spacingProps), ...style }}
			onClick={onToggle}
			role="button"
			tabIndex={0}
			onKeyDown={(event) => event.key === "Enter" && onToggle()}
		>
			<span className="collapsible__header-text body-text">{children}</span>
			<Icon
				icon={collapsed ? "chevron-down" : "chevron-up"}
				className="collapsible__icon"
				color="highlight"
			/>
		</div>
	);
}

function CollapsibleBody({
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<div
			className={`collapsible__body ${className}`}
			style={{ ...spacingStyle(spacingProps), ...style }}
		>
			{children}
		</div>
	);
}

export function Collapsible({
	defaultCollapsed = true,
	onToggle,
	children,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	const [collapsed, setCollapsed] = useState(defaultCollapsed);

	const handleToggle = () => {
		const next = !collapsed;
		setCollapsed(next);
		onToggle?.(next);
	};

	const enhanced = React.Children.map(children, (child) => {
		if (!child) return null;
		if (child.type === CollapsibleHeader) {
			return React.cloneElement(child, { collapsed, onToggle: handleToggle });
		}
		if (child.type === CollapsibleBody) return collapsed ? null : child;
		return child;
	});

	return (
		<div
			className={`collapsible ${className}`}
			style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
		>
			{enhanced}
		</div>
	);
}

Collapsible.Header = CollapsibleHeader;
Collapsible.Body = CollapsibleBody;
