import React, { useEffect, useState } from "react";
import {
	Flex,
	Banner,
	Icon,
	Body,
	Caption,
	TextInput,
	Select,
	Button,
	IconButton,
	Stepper,
} from "../components";

const CLOCK_TYPES = [
	{ id: "race", icon: "flag-checkered" },
	{ id: "contested", icon: "scale-unbalanced" },
	{ id: "danger", icon: "skull-crossbones" },
];

const SLICES = [3, 4, 6, 12];

const getClockStorageKey = (profileId) => `gm-clocks-${profileId}`;

const createClockRow = () => ({
	id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
	name: "",
	type: "race",
	slices: 3,
	player: "All",
	progress: 0,
	editing: true,
});

const getClockIcon = (type) =>
	CLOCK_TYPES.find((option) => option.id === type)?.icon || "flag-checkered";

export default function Clocks({ playerCharacters = [], profileId }) {
	const loadRows = () => {
		if (!profileId) return [];
		try {
			const raw = localStorage.getItem(getClockStorageKey(profileId));
			const parsed = raw ? JSON.parse(raw) : [];
			return Array.isArray(parsed) ? parsed : [];
		} catch (e) {
			return [];
		}
	};

	const [rows, setRows] = useState(loadRows);
	const playerOptions = [
		"All",
		...playerCharacters
			.map((character) => character?.value?.name)
			.filter(Boolean),
	];

	useEffect(() => {
		if (!profileId) return;
		try {
			localStorage.setItem(getClockStorageKey(profileId), JSON.stringify(rows));
		} catch (e) {
			// ignore storage failures
		}
	}, [profileId, rows]);

	const addClockRow = () => {
		setRows((prev) => [...prev, createClockRow()]);
	};

	const updateRow = (id, changes) => {
		setRows((prev) =>
			prev.map((row) => (row.id === id ? { ...row, ...changes } : row)),
		);
	};

	const startClock = (id) => {
		setRows((prev) =>
			prev.map((row) =>
				row.id === id && row.name.trim() ? { ...row, editing: false } : row,
			),
		);
	};

	const cancelRow = (id) => {
		setRows((prev) => prev.filter((row) => row.id !== id));
	};

	const deleteRow = (id) => {
		setRows((prev) => prev.filter((row) => row.id !== id));
	};

	const progressRow = (id, delta) => {
		setRows((prev) =>
			prev.map((row) => {
				if (row.id !== id) return row;
				const nextProgress = Math.max(
					0,
					Math.min(row.slices, row.progress + delta),
				);
				return { ...row, progress: nextProgress };
			}),
		);
	};

	return (
		<>
			<Flex direction="column" alignItems="center">
				{rows.map((row) =>
					row.editing ? (
						<Banner key={row.id}>
							<Flex direction="column" gap="md">
								<Flex direction="column" gap="sm">
									<Flex alignItems="center" gap="sm">
										<Icon icon="stopwatch" color="highlight" />
										<Caption color="highlight">New Clock</Caption>
									</Flex>
									<TextInput
										placeholder="Enter Clock Name"
										value={row.name}
										onChange={(name) => updateRow(row.id, { name })}
									/>
								</Flex>
								<Flex direction="column" gap="sm">
									<Caption>Type</Caption>
									<Flex gap="sm">
										{CLOCK_TYPES.map((option) => (
											<Button
												key={option.id}
												type="button"
												icon={option.icon}
												variant={
													row.type === option.id ? "active" : "secondary"
												}
												fullWidth
												onClick={() => updateRow(row.id, { type: option.id })}
											/>
										))}
									</Flex>
								</Flex>
								<Flex direction="column" gap="sm">
									<Caption>Slices</Caption>
									<Flex gap="sm">
										{SLICES.map((slice) => (
											<Button
												key={slice}
												type="button"
												variant={row.slices === slice ? "active" : "secondary"}
												fullWidth
												onClick={() => updateRow(row.id, { slices: slice })}
											>
												{slice}
											</Button>
										))}
									</Flex>
								</Flex>
								<Flex direction="column" gap="sm">
									<Caption>Player</Caption>
									<Select
										value={row.player}
										onChange={(player) => updateRow(row.id, { player })}
										options={playerOptions}
										placeholder="Select Player..."
									/>
								</Flex>
								<Flex gap="md" justifyContent="space-between" marginTop="sm">
									<Button
										type="button"
										icon="check"
										onClick={() => startClock(row.id)}
									>
										Start Clock
									</Button>
									<Button
										type="button"
										variant="tertiary"
										onClick={() => cancelRow(row.id)}
									>
										Cancel
									</Button>
								</Flex>
							</Flex>
						</Banner>
					) : (
						<Banner key={row.id}>
							<Flex gap="md" alignItems="center">
								<IconButton
									icon="trash-alt"
									color="highlight"
									onClick={() => deleteRow(row.id)}
								/>
								<Flex direction="column" fullWidth>
									<Flex
										alignItems="baseline"
										gap="sm"
										justifyContent="space-between"
									>
										<Body color="highlight">
											<Icon icon={getClockIcon(row.type)} /> {row.name}
										</Body>
										<Caption color="highlight">
											{row.player || "Player"}
										</Caption>
									</Flex>
									<Stepper amount={row.slices} activeCount={row.progress} />
								</Flex>
								<Flex gap="sm">
									<IconButton
										type="button"
										icon="minus"
										color="highlight"
										onClick={() => progressRow(row.id, -1)}
									/>
									<IconButton
										type="button"
										icon="plus"
										color="highlight"
										onClick={() => progressRow(row.id, 1)}
									/>
								</Flex>
							</Flex>
						</Banner>
					),
				)}

				<Button
					type="button"
					icon="plus"
					variant="secondary"
					margin="lg"
					onClick={addClockRow}
				>
					Clock
				</Button>
			</Flex>
		</>
	);
}
