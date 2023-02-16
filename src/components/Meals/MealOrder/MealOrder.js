import React, { useState, useContext } from "react";

import CartContext from "../../../store/cart-context";
import Collapsible from "../../UI/Collapsible";
import Modal from "../../UI/Modal";
import MealItemForm from "../MealItem/MealItemForm";
import classes from "./MealOrder.module.css";

const MealOrder = (props) => {
	const cartCtx = useContext(CartContext);

	const transformOptionList = () => {
		let transformedOptions = [];
		for (const name in optionsList) {
			transformedOptions.push({
				name: name,
				selectedOption: optionsList[name],
			});
		}
		return transformedOptions;
	};

	const addItemToCartHandler = (amount) => {
		const transformedOptions = transformOptionList();

		cartCtx.addItem({
			itemID: props.item._id,
			name: props.item.name,
			remarks: "",
			options: transformedOptions,
			qty: amount,
		});
	};

	const { item } = props;
	const hasOptions = item.options.length > 0;

	const [checked, setChecked] = useState({});

	const [optionsList, setOptionsList] = useState({});

	const updateOptionListHandler = (optionName, selection) => {
		let newOptionsList = { ...optionsList };
		const isAlreadySelected = newOptionsList.optionName === selection;

		if (!(optionName in newOptionsList)) {
			setOptionsList({ ...optionsList, [optionName]: selection });
			return;
		}
		if (!isAlreadySelected) {
			newOptionsList[optionName] = selection;
			setOptionsList(newOptionsList);
		}
	};

	const radioButtonHandler = (index, optionName, selection) => {
		let newChecked = { ...checked };

		const isAlreadySelected = newChecked.optionName === index;

		if (!(optionName in newChecked)) {
			setChecked({ ...checked, [optionName]: index });
			return;
		}
		if (!isAlreadySelected) {
			newChecked[optionName] = index;
			setChecked(newChecked);
		}
		updateOptionListHandler(optionName, selection);

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
										checked={checked[option.name] === index}
										onChange={() =>
											radioButtonHandler(
												index,
												option.name,
												selection
											)
										}
										type="radio"
									/>

									{selection}
								</label>
							</li>
						))}
					</ul>
				</Collapsible>
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
