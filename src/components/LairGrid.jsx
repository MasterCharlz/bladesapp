import React from "react";
import { Grid } from "./Grid";
import { LairConnector } from "./LairConnector";
import { LairNode } from "./LairNode";
import { layoutStyle, spacingStyle } from "./helpers";

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
