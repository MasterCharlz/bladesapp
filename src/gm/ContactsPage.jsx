import React from "react";
import {
	Flex,
	Heading,
	Card,
	Body,
	Caption,
	Banner,
	Button,
	IconButton,
	Stepper,
	Icon,
	Repeater,
	TextInput,
	Select,
} from "../components";
import cohortInfo from "../data/gm/CohortInfo.json";
import { useContactsRepeater, useCohortsRepeater } from "../widgets/Repeaters";

function toggleOption(options, option) {
	return options.includes(option)
		? options.filter((item) => item !== option)
		: [...options, option];
}

export default function ContactsPage({
	profile,
	onContactsChange,
	onCohortsChange,
}) {
	const { items: cohortItems, handleChange: persistCohortChange } =
		useCohortsRepeater(profile);
	const { items: contactItems, handleChange: persistContactChange } =
		useContactsRepeater(profile);

	const cohortTypeOptions = cohortInfo.cohort_type || [];
	const cohortEdgeOptions = cohortInfo.cohort_edges || [];
	const cohortFlawOptions = cohortInfo.cohort_flaws || [];

	const handleCohortChange = (nextItems) => {
		persistCohortChange(nextItems);
		onCohortsChange?.(nextItems);
	};

	const handleContactChange = (nextItems) => {
		persistContactChange(nextItems);
		onContactsChange?.(nextItems);
	};

	return (
		<>
			{/* --- COHORTS --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="person-rifle" color="highlight" />
						<Body color="highlight" bold>
							Cohorts
						</Body>
					</Flex>
					<Card backgroundColor="darker" noBorder padding="none">
						<Repeater
							controlledItems={cohortItems}
							onChange={handleCohortChange}
							initialItems={profile?.cohorts || []}
							initialFormValue={{
								name: "",
								type: "",
								gang_type: "",
								expertise: "",
								edges: [],
								flaws: [],
								danger: 0,
								armor: true,
							}}
							addButtonText="Cohort"
							addIcon="plus"
							formRenderer={({ value, setValue, onSave, onCancel }) => (
								<Flex
									direction="column"
									gap="md"
									padding="md"
									className="repeater__row"
								>
									<Flex direction="column" gap="xs">
										<Caption color="highlight">New Cohort</Caption>
										<TextInput
											value={value.name}
											onChange={(name) => setValue({ ...value, name })}
											placeholder="Enter Name"
										/>
									</Flex>
									<Flex direction="column" gap="xs">
										<Caption color="highlight">Type</Caption>
										<Flex gap="sm">
											<Button
												variant={value.type === "gang" ? "active" : "secondary"}
												fullWidth
												icon="people-group"
												onClick={() =>
													setValue({
														...value,
														type: "gang",
														expertise: "",
													})
												}
											>
												Gang
											</Button>
											<Button
												variant={
													value.type === "expert" ? "active" : "secondary"
												}
												fullWidth
												icon="person"
												onClick={() =>
													setValue({
														...value,
														type: "expert",
														gang_type: "",
													})
												}
											>
												Expert
											</Button>
										</Flex>
									</Flex>
									{value.type === "gang" && (
										<Flex direction="column" gap="xs">
											<Caption color="highlight">Gang Type</Caption>
											<Select
												options={cohortTypeOptions}
												value={value.gang_type}
												onChange={(gang_type) =>
													setValue({ ...value, gang_type })
												}
												placeholder="Select Gang Type"
											/>
										</Flex>
									)}
									{value.type === "expert" && (
										<Flex direction="column" gap="xs">
											<Caption color="highlight">Expertise</Caption>
											<TextInput
												value={value.expertise}
												onChange={(expertise) =>
													setValue({ ...value, expertise })
												}
												placeholder="Enter Expertise"
											/>
										</Flex>
									)}
									<Flex direction="column" gap="xs">
										<Caption color="highlight">Edges</Caption>
										<Flex gap="sm" wrap="wrap">
											{cohortEdgeOptions.map((edge) => (
												<Button
													key={edge}
													variant={
														value.edges.includes(edge) ? "active" : "secondary"
													}
													onClick={() =>
														setValue({
															...value,
															edges: toggleOption(value.edges, edge),
														})
													}
												>
													{edge}
												</Button>
											))}
										</Flex>
									</Flex>
									<Flex direction="column" gap="xs">
										<Caption color="highlight">Flaws</Caption>
										<Flex gap="sm" wrap="wrap">
											{cohortFlawOptions.map((flaw) => (
												<Button
													key={flaw}
													variant={
														value.flaws.includes(flaw) ? "active" : "secondary"
													}
													onClick={() =>
														setValue({
															...value,
															flaws: toggleOption(value.flaws, flaw),
														})
													}
												>
													{flaw}
												</Button>
											))}
										</Flex>
									</Flex>
									<Flex gap="sm" justifyContent="space-between" paddingTop="md">
										<Button
											icon="check"
											onClick={() => {
												const name = value.name?.trim();
												const expertise = value.expertise?.trim();
												const gangType = value.gang_type?.trim();

												if (!name || !value.type) {
													return;
												}

												if (value.type === "gang" && !gangType) {
													return;
												}

												if (value.type === "expert" && !expertise) {
													return;
												}

												onSave({
													name,
													type: value.type,
													gang_type: value.type === "gang" ? gangType : "",
													expertise: value.type === "expert" ? expertise : "",
													edges: value.edges,
													flaws: value.flaws,
													danger: Number(value.danger ?? 0),
													armor: value.armor ?? false,
												});
											}}
										>
											Save
										</Button>
										<Button variant="tertiary" onClick={onCancel}>
											Cancel
										</Button>
									</Flex>
								</Flex>
							)}
							itemRenderer={({ key, value, onDelete, onUpdate }) => {
								const danger = Math.max(
									0,
									Math.min(6, Number(value.danger ?? 0)),
								);
								const armor = value.armor ?? false;

								return (
									<Flex
										key={key}
										direction="column"
										gap="sm"
										padding="md"
										className="repeater__row"
									>
										<Flex direction="column">
											<Flex alignItems="baseline" gap="sm">
												<Body
													color={
														value.danger < 4 ? "highlight" : "highlight_subtle"
													}
													bold
												>
													{value.name}
												</Body>
												<Caption color={value.danger < 4 ? "" : "lightest"}>
													{value.type === "gang"
														? value.gang_type
														: value.expertise}{" "}
													{value.type === "gang" ? "Gang" : "Expert"}
												</Caption>
											</Flex>
											<Flex gap="xs">
												<Caption
													className={"subcaption"}
													color={value.danger < 4 ? "" : "lightest"}
												>
													{value.edges.join(", ")}
													{", "}
													{value.flaws.join(", ")}
												</Caption>
											</Flex>
										</Flex>
										<Flex gap="sm" alignItems="center">
											<IconButton
												color="heat"
												icon="minus"
												variant="secondary"
												onClick={() =>
													onUpdate({
														...value,
														danger: Math.max(0, danger - 1),
													})
												}
											/>
											<IconButton
												color="heat"
												icon="plus"
												variant="secondary"
												onClick={() =>
													onUpdate({
														...value,
														danger: Math.min(4, danger + 1),
													})
												}
											/>
											<Flex
												direction="column"
												gap="xs"
												flexGrow={1}
												justifyContent="space-around"
											>
												<Stepper
													amount={4}
													activeCount={danger}
													className="stepper--heat"
												/>
												<Flex gap="sm">
													<Caption
														className="align-center"
														fullWidth
														color={value.danger > 0 ? "heat" : "lightest"}
													>
														-Fct
													</Caption>
													<Caption
														className="align-center"
														fullWidth
														color={value.danger > 1 ? "heat" : "lightest"}
													>
														-1d
													</Caption>
													<Caption
														className="align-center"
														fullWidth
														color={value.danger > 2 ? "heat" : "lightest"}
													>
														Help
													</Caption>
													<Caption
														className="align-center"
														fullWidth
														color={value.danger > 3 ? "heat" : "lightest"}
													>
														Dead
													</Caption>
												</Flex>
											</Flex>
											<IconButton
												icon="shield-alt"
												variant="secondary"
												onClick={() =>
													onUpdate({
														...value,
														armor: !armor,
													})
												}
												color={armor ? "hero" : "darker"}
											/>
											<IconButton
												icon="trash-alt"
												variant="secondary"
												onClick={onDelete}
												color="highlight"
											/>
										</Flex>
									</Flex>
								);
							}}
						/>
					</Card>
				</Flex>
			</Banner>

			{/* --- CONTACTS --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="phone" color="highlight" />
						<Body color="highlight" bold>
							Contacts
						</Body>
					</Flex>
					<Card backgroundColor="darker" noBorder padding="none">
						<Repeater
							controlledItems={contactItems}
							onChange={handleContactChange}
							initialItems={profile?.contacts || []}
							initialFormValue={{ name: "", title: "" }}
							addButtonText="Contact"
							addIcon="plus"
							formRenderer={({ value, setValue, onSave, onCancel }) => (
								<Flex
									direction="column"
									gap="xs"
									padding="md"
									className="repeater__row"
								>
									<Caption color="highlight">New Contact</Caption>
									<Flex direction="column" gap="sm">
										<TextInput
											value={value.name}
											onChange={(name) => setValue({ ...value, name })}
											placeholder="Enter Name"
										/>
										<TextInput
											value={value.title}
											onChange={(title) => setValue({ ...value, title })}
											placeholder="Enter Title"
										/>
									</Flex>
									<Flex gap="sm" justifyContent="space-between" paddingTop="md">
										<Button
											icon="check"
											onClick={() => {
												const name = value.name?.trim();
												const title = value.title?.trim();

												if (name && title) {
													onSave({ name, title, reputation: 3 });
												}
											}}
										>
											Save
										</Button>
										<Button variant="tertiary" onClick={onCancel}>
											Cancel
										</Button>
									</Flex>
								</Flex>
							)}
							itemRenderer={({ key, value, onDelete, onUpdate }) => {
								const reputation = Math.max(
									0,
									Math.min(6, Number(value.reputation ?? 3)),
								);

								return (
									<Flex
										key={key}
										gap="md"
										alignItems="stretch"
										padding="md"
										className="repeater__row"
										direction="column"
										gap="sm"
									>
										<Flex
											gap="sm"
											alignItems="flex-end"
											justifyContent="space-between"
										>
											<Flex direction="column">
												<Body bold color="highlight">
													{value.name}
												</Body>
												<Caption>{value.title}</Caption>
											</Flex>
											<Flex gap="sm" alignItems="center">
												<Caption>Rep</Caption>
												<Body
													bold
													color={
														Math.min(value.reputation - 3) < 0 ? "heat" : ""
													}
												>
													{Math.min(value.reputation - 3)}
												</Body>
											</Flex>
										</Flex>
										<Stepper
											amount={6}
											activeCount={reputation}
											type="contested"
											className="contested"
										/>
										<Flex gap="sm" justifyContent="space-between">
											<Flex gap="sm">
												<IconButton
													color="highlight"
													icon="minus"
													variant="secondary"
													onClick={() =>
														onUpdate({
															...value,
															reputation: Math.max(0, reputation - 1),
														})
													}
												/>

												<IconButton
													color="highlight"
													icon="plus"
													variant="secondary"
													onClick={() =>
														onUpdate({
															...value,
															reputation: Math.min(6, reputation + 1),
														})
													}
												/>
											</Flex>
											<IconButton
												icon="trash-alt"
												variant="secondary"
												onClick={onDelete}
												color="highlight"
											/>
										</Flex>
									</Flex>
								);
							}}
						/>
					</Card>
				</Flex>
			</Banner>
		</>
	);
}
