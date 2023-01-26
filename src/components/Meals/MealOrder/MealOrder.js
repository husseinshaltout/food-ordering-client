import React, { useState, useContext } from "react";

import CartContext from "../../../store/cart-context";
import Modal from "../../UI/Modal";
import MealItemForm from "../MealItem/MealItemForm";
import classes from "./MealOrder.module.css";

const MealOrder = (props) => {
	const cartCtx = useContext(CartContext);

	const addItemToCartHandler = (amount) => {
		cartCtx.addItem({
			id: props.id,
			name: props.name,
			amount: amount,
			price: props.price,
		});
	};

	const item = {
		id: "m5",
		name: "Latte",
		stock: 64,
		category: { name: "Beverage", description: "Coffee" },
		options: [
			{
				name: "Milk",
				isAvailable: true,
				optionList: ["Full", "Skimmed"],
			},
			{
				name: "Sugar",
				isAvailable: true,
				optionList: ["1", "2"],
			},
		],
		cover_img:
			"https://upload.wikimedia.org/wikipedia/commons/c/c6/Latte_art_3.jpg",
	};
	const hasOptions = item.options.length > 0;

	const [checked, setChecked] = useState([]);

	const checkboxHandler = (event) => {
		let updatedList = [...checked];

		const isChecked = event.target.checked;

		if (isChecked) {
			updatedList = [...checked, event.target.value];
		} else {
			updatedList.splice(checked.indexOf(event.target.value), 1);
		}
		setChecked(updatedList);
	};

	const listOptions = item.options.map(
		(option, index) =>
			option.isAvailable && (
				<div key={index} className={classes["order-item__option"]}>
					<label>
						<input onClick={checkboxHandler} type="checkbox" />
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
