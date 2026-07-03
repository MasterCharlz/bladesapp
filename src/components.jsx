import React, { useState, useRef, useEffect } from "react";

const SPACE = {
	none: "0px",
	xs: "4px",
	sm: "8px",
	md: "16px",
	lg: "24px",
	xl: "40px",
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
			{Array.from({ length: amount }).map((_, i) => (
				<div
					key={i}
					className="stepper__segment"
					style={i < activeCount ? { backgroundColor: "var(--highlight)" } : {}}
					data-type={type}
				/>
			))}
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

export function Flex({
	direction,
	wrap,
	justifyContent,
	alignItems,
	alignContent,
	gap,
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

export function Repeater({
	items: controlledItems,
	onChange,
	onMutate,
	addButtonText = "Item",
	addIcon = "plus",
	formRenderer,
	itemRenderer,
	initialItems = [],
	initialFormValue = {},
}) {
	const [internalItems, setInternalItems] = useState(initialItems);
	const [isCreating, setIsCreating] = useState(false);
	const [formValue, setFormValue] = useState(initialFormValue);

	const items = controlledItems ?? internalItems;

	function emit(nextItems) {
		if (onChange) {
			onChange(nextItems);
			// also update internalItems so UI reflects new items immediately
			setInternalItems(nextItems);
		} else {
			setInternalItems(nextItems);
		}
		// always notify onMutate (useful for persistence hooks)
		try {
			onMutate?.(nextItems);
		} catch (e) {}
	}

	function handleSave(newValues) {
		emit([
			...items,
			{
				id: crypto.randomUUID(),
				value: newValues,
			},
		]);

		setIsCreating(false);
		setFormValue(initialFormValue);
	}

	function handleCancel() {
		setIsCreating(false);
		setFormValue(initialFormValue);
	}

	function handleDelete(id) {
		emit(items.filter((item) => item.id !== id));
	}

	function handleUpdate(id, newValue) {
		emit(
			items.map((item) =>
				item.id === id ? { ...item, value: newValue } : item,
			),
		);
	}

	function handleAdd() {
		setFormValue(initialFormValue);
		setIsCreating(true);
	}

	return (
		<div>
			{items.map((item) =>
				itemRenderer?.({
					key: item.id,
					value: item.value,
					onDelete: () => handleDelete(item.id),
					onUpdate: (value) => handleUpdate(item.id, value),
				}),
			)}

			{isCreating &&
				formRenderer?.({
					value: formValue,
					setValue: setFormValue,
					onSave: handleSave,
					onCancel: handleCancel,
				})}

			{!isCreating && (
				<Button
					variant="tertiary"
					icon={addIcon}
					onClick={handleAdd}
					fullWidth
					padding="md"
				>
					{addButtonText}
				</Button>
			)}
		</div>
	);
}
