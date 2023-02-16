import React, { useState, useContext } from "react";

import CartContext from "../../../store/cart-context";
import Collapsible from "../../UI/Collapsible";
import Modal from "../../UI/Modal";
import MealItemForm from "../MealItem/MealItemForm";
import classes from "./MealOrder.module.css";

const MealOrder = (props) => {
	const cartCtx = useContext(CartContext);

	const addItemToCartHandler = (amount) => {
		cartCtx.addItem({
			itemID: props.item._id,
			name: props.item.name,
			remarks: "",
			options: [...props.item.options],
			qty: amount,
		});
	};

	const { item } = props;
	const hasOptions = item.options.length > 0;

	const [checked, setChecked] = useState(
		new Array(item.options.length).fill(false)
	);

	const [optionsList, setOptionsList] = useState({});

	const updateOptionsList = (item) => {
		if (optionsList.includes(item)) {
			setOptionsList(optionsList.filter((option) => option !== item));
		} else {
			setOptionsList([...optionsList, item]); // or push
		}
	};

	// const checkboxHandler = (index, optionName, selection) => {
	// 	let newChecked = [...checked];

	// 	newChecked[index] = !newChecked[index];

	// 	setChecked(newChecked);

	// 	if (newChecked[index] === true) {
	// 		const itemSelectedOption = { [optionName]: selection };
	// 		updateOptionsList(itemSelectedOption);
	// 	}
	// 	console.log(optionsList);
	// };
	const radioButtonHandler = (index, optionName, selection) => {
		let newOptionsList = { ...optionsList };

		if (optionName in newOptionsList) {
			const isAlreadySelected = newOptionsList.optionName === selection;
			if (!isAlreadySelected) newOptionsList[optionName] = selection;
			setOptionsList(newOptionsList);
		} else {
			setOptionsList({ ...optionsList, [optionName]: selection }); // or push
		}

		console.log(optionsList);
	};
	const listOptions = item.options.map(
		(option, optionIndex) =>
			option.isAvailable && (
				<Collapsible key={optionIndex} title={option.name}>
					<ul className={classes["option-selection"]}>
						{option.optionList.map((selection, index) => (
							<li key={index}>
								<label
									key={index}
									htmlFor={`custom-checkbox-${index}`}
								>
									<input
										key={index}
										name={option.name}
										id={`custom-checkbox-${index}`}
										checked={checked[index]}
										onChange={() =>
											radioButtonHandler(
												index,
												option.name,
												selection
											)
										}
										type="radio"
									/>
									{/* <input
										key={index}
										name={option.name}
										id={`custom-checkbox-${index}`}
										checked={checked[index]}
										onChange={() =>
											checkboxHandler(
												index,
												option.name,
												selection
											)
										}
										type="radio"
									/> */}
									{selection}
								</label>
							</li>
						))}
					</ul>
				</Collapsible>

				/* <div key={index} className={classes["order-item__option"]}>
						<input
							id={`custom-checkbox-${index}`}
							checked={checked[index]}
							onChange={() => checkboxHandler(index, option.name)}
							type="checkbox"
						/>
						<label htmlFor={`custom-checkbox-${index}`}>
							{option.name}
						</label>
						<select>
							{option.optionList.map((selection, index) => (
								<option key={index}>{selection}</option>
							))}
						</select>
					</div> */
			)
	);

	const orderItem = (
		<ul className={classes["order-item"]}>
			<li>{hasOptions && <label>Options: {listOptions}</label>}</li>
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			<div className={classes["item-thumbnail"]}>
				<img src={item.cover_img} alt={item.name} />
			</div>
			<span className={classes["item-name"]}> {item.name}</span>
			{orderItem}
			<MealItemForm
				onAddToCart={addItemToCartHandler}
				stock={props.stock}
				onClose={props.onClose}
			/>
		</Modal>
	);
};

export default MealOrder;
