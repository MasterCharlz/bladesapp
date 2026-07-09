import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Flex,
	Button,
	LairGrid,
	LairNode,
	Caption,
	Heading,
} from "../components";
import lairNodesData from "./LairNodes.json";

export default function LairMap() {
	const navigate = useNavigate();
	const { id } = useParams();

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

	return (
		<Flex
			direction="column"
			justifyContent="center"
			alignItems="center"
			gap="xl"
			padding="lg"
			fullHeight
		>
			<LairGrid>
				{lairNodes.map((node) => (
					<LairNode key={node.id} id={node.id} position={node.position}>
						<Heading>{node.title}</Heading>
						<Caption>{node.description}</Caption>
					</LairNode>
				))}
			</LairGrid>

			<Flex gap="lg" justifyContent="center">
				<Button icon="check">Save</Button>
				<Button variant="tertiary" onClick={() => navigate(`/gm/${id}`)}>
					Cancel
				</Button>
			</Flex>
		</Flex>
	);
}
