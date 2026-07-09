import React from "react";
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
import {
	useClocksRepeater,
	CLOCK_TYPES,
	CLOCK_SLICES,
	getClockIcon,
} from "../widgets/Repeaters";

export default function Clocks({ playerCharacters = [], profileId }) {
	const {
		rows,
		playerOptions,
		addRow,
		updateRow,
		startClock,
		cancelRow,
		deleteRow,
		progressRow,
	} = useClocksRepeater(profileId, playerCharacters);

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
										{CLOCK_SLICES.map((slice) => (
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
					onClick={addRow}
				>
					Clock
				</Button>
			</Flex>
		</>
	);
}
