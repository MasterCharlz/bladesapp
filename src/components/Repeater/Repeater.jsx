import React, { useState } from "react";
import { Button } from "../Button";

export function Repeater({
	form: Form,
	output: Output,
	value = [],
	onChange,
	buttonText = "Add",
}) {
	const [formValue, setFormValue] = useState({});
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleAdd = () => {
		setFormValue({});
		setIsFormOpen(true);
	};

	const handleSave = () => {
		onChange?.([
			...value,
			{
				id: crypto.randomUUID(),
				...formValue,
			},
		]);
		setFormValue({});
		setIsFormOpen(false);
	};

	const handleCancel = () => {
		setFormValue({});
		setIsFormOpen(false);
	};

	const handleDelete = (id) => {
		onChange?.(value.filter((item) => item.id !== id));
	};

	return (
		<div className="repeater-wrapper">
			{value.map((item) => (
				<Output
					key={item.id}
					value={item}
					onDelete={() => handleDelete(item.id)}
				/>
			))}

			{isFormOpen && (
				<Form
					value={formValue}
					onChange={setFormValue}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			)}

			<Button icon="plus" onClick={handleAdd} variant="secondary">
				{buttonText}
			</Button>
		</div>
	);
}
