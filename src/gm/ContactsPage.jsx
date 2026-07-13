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
} from "../components";
import { useContactsRepeater } from "../widgets/Repeaters";

export default function ContactsPage({ profile, onContactsChange }) {
	const { items: contactItems, handleChange: persistContactChange } =
		useContactsRepeater(profile);

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
					<Card backgroundColor="darker" noBorder></Card>
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
										alignItems="flex-start"
										padding="md"
										className="repeater__row"
									>
										<Flex direction="column" gap="sm" flexGrow={1}>
											<Flex
												gap="sm"
												alignItems="baseline"
												justifyContent="space-between"
											>
												<Body color="highlight" bold>
													{value.name}
												</Body>
												<Caption>{value.title}</Caption>
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
												<Flex gap="sm" alignItems="center">
													<Caption color="highlight">Rep</Caption>
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
										</Flex>
										<IconButton
											icon="trash-alt"
											variant="tertiary"
											onClick={onDelete}
										/>
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
