import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Heading, Card, Button, Body, Caption, Nav } from "./components";
import Clocks from "./gm/Clocks";

export default function GMView() {
	const { id } = useParams();
	const navigate = useNavigate();

	const profilesRaw = (() => {
		try {
			return JSON.parse(localStorage.getItem("profiles") || "[]");
		} catch (e) {
			return [];
		}
	})();

	const profile = profilesRaw.find((p) => String(p.id) === String(id));

	if (!profile) {
		return (
			<Flex direction="column" gap="md" fullWidth alignItems="center">
				<Heading size={2} color="highlight" className="display-title">
					404
				</Heading>
				<Body>No crew found for this GM view.</Body>
				<Button onClick={() => navigate("/")}>Back</Button>
			</Flex>
		);
	}

	return (
		<>
			<Flex
				alignItems="center"
				padding="lg"
				gap="md"
				justifyContent="space-between"
			>
				<Button
					variant="tertiary"
					icon="arrow-left"
					onClick={() => navigate("/")}
				>
					Back
				</Button>
				<Heading color="highlight" className={"align-right display-title"}>
					Crew Name long long long
				</Heading>
			</Flex>
			<Clocks />
			{/* Also make sure you pass onChange if you want the buttons to do anything. 
                The Nav component only calls onChange?.(item.id) when a button is clicked. */}
			<Nav
				marginTop="sm"
				activeId="clock-management"
				items={[
					{ id: "clock-management", icon: "stopwatch" },
					{ id: "crew-management", icon: "people-group" },
				]}
			/>
		</>
	);
}
