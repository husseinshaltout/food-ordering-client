import React from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
	const hasOptions = props.item.options.length > 0;
	return (
		<li className={classes["cart-item"]}>
			<div>
				<h2>{props.item.name}</h2>
				<div className={classes.summary}>
					{hasOptions && "Extras:"}
					{props.item.options.map((option) => (
						<span key={option._id} className={classes.price}>
							{option.name}
						</span>
					))}
					<span className={classes.amount}>x {props.qty}</span>
				</div>
			</div>
			<div className={classes.actions}>
				<button onClick={props.onRemove}>−</button>
				<button onClick={props.onAdd}>+</button>
			</div>
		</li>
	);
};

export default CartItem;
