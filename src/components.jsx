import React, { useState, useRef, useEffect } from "react";

const SPACE = {
	none: "0px",
	xs: "4px",
	sm: "8px",
	md: "16px",
	lg: "24px",
	xl: "40px",
	xxl: "80px",
};

const sp = (val) => (val !== undefined ? (SPACE[val] ?? val) : undefined);

function spacingStyle(props) {
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

function layoutStyle(props = {}) {
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

const colorVar = (token) => (token ? `var(--${token})` : undefined);

export function Icon({ icon, color, size, className = "", style = {} }) {
	return (
		<i
			className={`fa-solid fa-${icon} ${className}`}
			style={{ color: colorVar(color), fontSize: size, ...style }}
		/>
	);
}

export function Heading({
	size = 2,
	color,
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	const Tag = `h${size}`;
	return (
		<Tag
			className={`heading heading--${size} ${color ? `color--${color}` : ""} ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</Tag>
	);
}

export function Body({
	bold,
	color,
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<p
			className={`body-text ${bold ? "body-text--bold" : ""} ${color ? `color--${color}` : ""} ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</p>
	);
}

export function Caption({
	color,
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<span
			className={`caption ${color ? `color--${color}` : ""} ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</span>
	);
}

export function Card({
	borderColor,
	bgColor,
	backgroundColor,
	noBorder,
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	const borderStyle = noBorder
		? { borderTop: "none" }
		: borderColor
			? { borderTopColor: colorVar(borderColor) }
			: {};
	const backgroundStyle =
		bgColor || backgroundColor
			? { backgroundColor: colorVar(bgColor || backgroundColor) }
			: {};

	return (
		<div
			className={`card ${noBorder ? "card--no-border" : ""} ${className}`}
			style={{
				...borderStyle,
				...backgroundStyle,
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</div>
	);
}

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

export function IconButton({
	icon,
	color,
	variant = "secondary",
	onClick,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<button
			className={`icon-btn btn--${variant} ${className}`}
			style={{
				color: colorVar(color),
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
			onClick={onClick}
		>
			<Icon icon={icon} />
		</button>
	);
}

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
			onKeyDown={(e) => e.key === "Enter" && onToggle()}
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
		if (child.type === CollapsibleBody) {
			return collapsed ? null : child;
		}
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

export function Nav({
	items = [],
	activeId,
	onChange,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	return (
		<nav
			className={`nav ${className}`}
			style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
		>
			{items.map((item) => (
				<button
					key={item.id}
					className={`nav__item ${activeId === item.id ? "nav__item--active" : ""}`}
					onClick={() => onChange?.(item.id)}
				>
					{item.icon && <Icon icon={item.icon} />}
				</button>
			))}
		</nav>
	);
}

export function SubNav({
	items = [],
	activeId,
	onChange,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	return (
		<nav
			className={`sub-nav ${className}`}
			style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
		>
			{items.map((item) => (
				<button
					key={item.id}
					className={`sub-nav__item ${activeId === item.id ? "sub-nav__item--active" : ""}`}
					onClick={() => onChange?.(item.id)}
				>
					{item.icon && <Icon icon={item.icon} />}
				</button>
			))}
		</nav>
	);
}

export function Banner({
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	return (
		<div
			className={`banner ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{children}
		</div>
	);
}

export function Modal({
	open,
	onClose,
	children,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	const overlayRef = useRef(null);

	useEffect(() => {
		if (!open) return;
		const handler = (e) => {
			if (e.target === overlayRef.current) onClose?.();
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="modal-overlay" ref={overlayRef}>
			<div
				className={`modal-card ${className}`}
				style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
			>
				{children}
			</div>
		</div>
	);
}

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
			onChange={(e) => onChange?.(e.target.value)}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		/>
	);
}

export function Select({
	options = [],
	value,
	onChange,
	placeholder,
	className = "",
	style = {},
	...spacingProps
}) {
	const normalizedOptions = options.map((o) =>
		typeof o === "string" ? { value: o, label: o } : o,
	);

	return (
		<div
			className="select-wrapper"
			style={{ ...layoutStyle(spacingProps), ...spacingStyle(spacingProps) }}
		>
			<select
				className={`select ${className}`}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				style={style}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{normalizedOptions.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			<span className="select-arrow">
				<i className="fa-solid fa-chevron-down" />
			</span>
		</div>
	);
}

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
			{Array.from({ length: amount }).map((_, i) => {
				const segmentClass = getSegmentClass?.(i);

				return (
					<div
						key={i}
						className={`stepper__segment ${i < activeCount ? "stepper__segment--active" : ""}${segmentClass ? ` ${segmentClass}` : ""}`}
						data-type={type}
					/>
				);
			})}
		</div>
	);
}

export function SelectionDot({
	active: initialActive = false,
	onChange,
	className = "",
	style = {},
	fullWidth,
	fullHeight,
}) {
	const [active, setActive] = useState(initialActive);

	const handleClick = () => {
		const next = !active;
		setActive(next);
		onChange?.(next);
	};

	return (
		<button
			className={`selection-dot ${active ? "selection-dot--active" : ""} ${className}`}
			style={{ ...layoutStyle({ fullWidth, fullHeight }), ...style }}
			onClick={handleClick}
			aria-pressed={active}
		/>
	);
}

export function Pip({
	active: initialActive = false,
	onChange,
	className = "",
	style = {},
}) {
	const [active, setActive] = useState(initialActive);

	const handleClick = () => {
		const next = !active;
		setActive(next);
		onChange?.(next);
	};

	return (
		<div
			className={`pip ${active ? "pip--active" : ""} ${className}`}
			style={style}
			onClick={handleClick}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === "Enter" && handleClick()}
		/>
	);
}

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

export function LairNode({
	id,
	position,
	title,
	description,
	active: initialActive = false,
	onClick,
	onChange,
	className = "",
	style = {},
	children,
}) {
	const [active, setActive] = useState(initialActive);

	function handleClick(event) {
		const nextActive = !active;
		setActive(nextActive);
		onChange?.(nextActive);
		onClick?.(event);
	}

	return (
		<button
			type="button"
			data-id={id}
			data-position={position}
			data-active={active}
			title={description || title}
			className={`lair-node ${active ? "lair-node--active" : "lair-node--inactive"} ${className}`}
			style={style}
			onClick={handleClick}
			aria-pressed={active}
		>
			{children || title}
		</button>
	);
}

export function LairGrid({
	nodes = [],
	nodeStates = {},
	connectorStates = {},
	children,
	className = "",
	style = {},
	...spacingProps
}) {
	const rows = 5;
	const columns = 3;
	const totalNodes = rows * columns;
	const childNodes = React.Children.toArray(children);
	const sourceNodes = childNodes.length ? childNodes : nodes;
	const positionedNodes = Array.from({ length: totalNodes }, () => null);

	sourceNodes.forEach((node, index) => {
		if (!node) return;
		const position = Number(node.props?.position ?? node.position ?? index + 1);
		if (position >= 1 && position <= totalNodes) {
			positionedNodes[position - 1] = node;
		}
	});
	const gridColumns = `repeat(${columns * 2 - 1}, 1fr)`;
	const gridRows = `repeat(${rows * 2 - 1}, auto)`;
	const nodeByPosition = nodes.reduce((lookup, node) => {
		lookup[Number(node.position)] = node;
		return lookup;
	}, {});

	function getConnectorState(id, firstPosition, secondPosition) {
		const firstNode = nodeByPosition[firstPosition];
		const secondNode = nodeByPosition[secondPosition];
		const firstOrder = Number(firstNode?.order);
		const secondOrder = Number(secondNode?.order);
		const higherNode = firstOrder >= secondOrder ? firstNode : secondNode;
		const lowerNode = firstOrder >= secondOrder ? secondNode : firstNode;
		const active = Boolean(
			firstNode &&
			secondNode &&
			Number.isFinite(firstOrder) &&
			Number.isFinite(secondOrder) &&
			nodeStates[higherNode.id] &&
			nodeStates[lowerNode.id],
		);

		return {
			hidden: Boolean(connectorStates[id]?.hidden),
			active,
		};
	}

	function renderCell(rowIndex, columnIndex) {
		const isNodeRow = rowIndex % 2 === 0;
		const isNodeColumn = columnIndex % 2 === 0;

		if (isNodeRow && isNodeColumn) {
			const nodeRow = rowIndex / 2;
			const nodeColumn = columnIndex / 2;
			const nodeIndex = nodeRow * columns + nodeColumn;
			const node = positionedNodes[nodeIndex];

			if (React.isValidElement(node)) {
				return React.cloneElement(node, {
					key: `node-${rowIndex}-${columnIndex}`,
					position: node.props?.position ?? nodeIndex + 1,
				});
			}

			if (node) {
				return (
					<LairNode
						key={`node-${rowIndex}-${columnIndex}`}
						id={node.id}
						position={node.position ?? nodeIndex + 1}
						title={node.title}
						description={node.description}
					>
						{node.title}
					</LairNode>
				);
			}

			return (
				<LairNode
					key={`node-${rowIndex}-${columnIndex}`}
					position={nodeIndex + 1}
					title={node?.title}
					description={node?.description}
				>
					{node?.title}
				</LairNode>
			);
		}

		if (isNodeRow && !isNodeColumn) {
			const connectorId = `h-${rowIndex}-${columnIndex}`;
			const leftPosition = (rowIndex / 2) * columns + (columnIndex - 1) / 2 + 1;
			const rightPosition = leftPosition + 1;
			const connectorState = getConnectorState(
				connectorId,
				leftPosition,
				rightPosition,
			);

			return (
				<LairConnector
					key={connectorId}
					id={connectorId}
					orientation="horizontal"
					{...connectorState}
				/>
			);
		}

		if (!isNodeRow && isNodeColumn) {
			const connectorId = `v-${rowIndex}-${columnIndex}`;
			const topPosition = ((rowIndex - 1) / 2) * columns + columnIndex / 2 + 1;
			const bottomPosition = topPosition + columns;
			const connectorState = getConnectorState(
				connectorId,
				topPosition,
				bottomPosition,
			);

			return (
				<LairConnector
					key={connectorId}
					id={connectorId}
					orientation="vertical"
					{...connectorState}
				/>
			);
		}

		return (
			<div
				key={`empty-${rowIndex}-${columnIndex}`}
				className="lair-grid__spacer"
			/>
		);
	}

	return (
		<Grid
			columns={gridColumns}
			rows={gridRows}
			className={`lair-grid ${className}`}
			style={{
				...layoutStyle(spacingProps),
				...spacingStyle(spacingProps),
				...style,
			}}
		>
			{Array.from({ length: rows * 2 - 1 }, (_, rowIndex) =>
				Array.from({ length: columns * 2 - 1 }, (_, columnIndex) =>
					renderCell(rowIndex, columnIndex),
				),
			)}
		</Grid>
	);
}
