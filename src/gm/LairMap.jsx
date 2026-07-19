import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
	Flex,
	Button,
	LairGrid,
	LairNode,
	Caption,
	Heading,
} from "../components";
import lairNodesData from "../data/LairNodes.json";
import { getProfiles, getStoreValue, setStoreValue } from "../apiStore";

export default function LairMap() {
	const router = useRouter();
	const routeId = router.query.id;
	const id = Array.isArray(routeId) ? routeId[0] : routeId;
	const storageKey = `lair-map-${id ?? ""}`;
	const [nodeStates, setNodeStates] = useState({});
	const [profile, setProfile] = useState(null);

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
		getProfiles([]).then((items) => {
			if (!mounted) return;
			setProfile(items.find((item) => String(item.id) === String(id)) || null);
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
			router.push(`/gm/${id}`);
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
				<Button variant="tertiary" onClick={() => router.push(`/gm/${id}`)}>
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
