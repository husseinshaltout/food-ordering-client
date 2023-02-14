import React, { useState, useContext } from "react";

import CartContext from "../../../store/cart-context";
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

	const [option, setOption] = useState([]);

	const checkboxHandler = (index, optionName) => {
		let newChecked = [...checked];

		newChecked[index] = !newChecked[index];

		setChecked(newChecked);

		let selectedOptions = newChecked.reduce(
			(accOptionList, currentState) => {
				if (currentState === true) {
					accOptionList.push(optionName);
				}
				return accOptionList;
			},
			[]
		);
		setOption(selectedOptions);
		console.log(selectedOptions);
	};

	const listOptions = item.options.map(
		(option, index) =>
			option.isAvailable && (
				<div key={index} className={classes["order-item__option"]}>
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
				</div>
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
