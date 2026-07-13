import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Flex,
	Button,
	LairGrid,
	LairNode,
	Caption,
	Heading,
} from "../components";
import lairNodesData from "../data/gm/LairNodes.json";

export default function LairMap() {
	const navigate = useNavigate();
	const { id } = useParams();
	const storageKey = `lair-map-${id}`;
	const [nodeStates, setNodeStates] = useState(() => {
		try {
			const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
			return saved && typeof saved === "object" && !Array.isArray(saved)
				? saved
				: {};
		} catch (e) {
			return {};
		}
	});

	const profilesRaw = (() => {
		try {
			return JSON.parse(localStorage.getItem("profiles") || "[]");
		} catch (e) {
			return [];
		}
	})();

	const profile = profilesRaw.find((item) => String(item.id) === String(id));
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
		try {
			localStorage.setItem(storageKey, JSON.stringify(nodeStates));
			navigate(`/gm/${id}`);
		} catch (e) {
			// ignore storage failures
		}
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
				<Button variant="tertiary" onClick={() => navigate(`/gm/${id}`)}>
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
