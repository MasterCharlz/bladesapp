import React, { useEffect, useState } from "react";
import {
	Flex,
	Button,
	LairGrid,
	LairNode,
	Caption,
	Heading,
} from "../components/index";
import lairNodesData from "../data/LairNodes.json";
import { getStoreValue, setStoreValue } from "../apiStore";

export default function LairMap({ profile, onClose }) {
	const id = profile?.id;
	const storageKey = `lair-map-${id ?? ""}`;
	const [nodeStates, setNodeStates] = useState({});

	useEffect(() => {
		if (!id) return;
		let mounted = true;
		getStoreValue(storageKey, {}).then((saved) => {
			if (!mounted) return;
			setNodeStates(
				saved && typeof saved === "object" && !Array.isArray(saved)
					? saved
					: {},
			);
		});
		return () => {
			mounted = false;
		};
	}, [id, storageKey]);

	const crewType = profile?.crew_type || "";
	const lairNodes = lairNodesData.crew_type?.[crewType] || [];
	const connectorStates = lairNodesData.connections?.[crewType] || {};

	function handleNodeChange(nodeId, active) {
		setNodeStates((previous) => ({
			...previous,
			[nodeId]: active,
		}));
	}

	function handleSave() {
		setStoreValue(storageKey, nodeStates).then(() => {
			onClose?.(nodeStates);
		});
	}

	return (
		<Flex
			direction="column"
			justifyContent="center"
			alignItems="center"
			gap="xl"
			padding="lg"
			fullHeight
		>
			<LairGrid
				nodes={lairNodes}
				nodeStates={nodeStates}
				connectorStates={connectorStates}
			>
				{lairNodes.map((node) => (
					<LairNode
						key={node.id}
						id={node.id}
						position={node.position}
						active={nodeStates[node.id] ?? false}
						onChange={(active) => handleNodeChange(node.id, active)}
					>
						<Heading>{node.title}</Heading>
						<Caption>{node.description}</Caption>
					</LairNode>
				))}
			</LairGrid>

			<Flex gap="lg" justifyContent="center">
				<Button icon="check" onClick={handleSave}>
					Save
				</Button>
				<Button variant="tertiary" onClick={onClose}>
					Cancel
				</Button>
			</Flex>
		</Flex>
	);
}
// ----------------------------------------------------------------------------
// How to turn Lair Connectors off:
// Connector positions use a 0-based grid
// [Horizontal or Vertical connector] - [Row position] - [Column position]
// ----------------------------------------------------------------------------
