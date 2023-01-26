import React, { useContext } from "react";

// import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
// import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
	// const cartCtx = useContext(CartContext);
	// const price = `$${props.price.toFixed(2)}`;

	// const addItemToCartHandler = (amount) => {
	// 	cartCtx.addItem({
	// 		id: props.id,
	// 		name: props.name,
	// 		amount: amount,
	// 		price: props.price,
	// 	});
	// };

	return (
		<li className={classes["menu-item"]}>
			<div className={classes.content}>
				<button onClick={props.onShow}> + </button>
				<div>
					<h3>{props.name}</h3>
					<div className={classes.category}>{props.category}</div>
				</div>
			</div>
			<div className={classes["img-holder"]}>
				<img src={props.thumbnail} alt="Product" />
			</div>

			{/* <button onClick={props.onShow}> + </button>
			<div>
				<h3>{props.name}</h3>
				<div className={classes.description}>{props.description}</div>
				<div className={classes.price}>{price}</div>
			</div> */}
			{/* <img
				style={{ width: "15%", height: "15%" }}
				src={props.thumbnail}
				alt="Product"
			/> */}
			{/* <div>
				<MealItemForm
					onAddToCart={addItemToCartHandler}
					stock={props.stock}
				/>
			</div> */}
		</li>
	);
};
export default MealItem;
