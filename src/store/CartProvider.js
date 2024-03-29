import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
};

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.itemID === action.item.itemID
		);

		const existingCartItem = state.items[existingCartItemIndex];

		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				qty: existingCartItem.qty + action.item.qty,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}
		return {
			items: updatedItems,
		};
	}

	if (action.type === "REMOVE") {
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.itemID === action.id
		);
		const existingCartItem = state.items[existingCartItemIndex];

		let updatedItems;

		if (existingCartItem.qty === 1) {
			updatedItems = state.items.filter(
				(item) => item.itemID !== action.id
			);
		} else {
			const updatedItem = {
				...existingCartItem,
				qty: existingCartItem.qty - 1,
			};
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
		};
	}
	if (action.type === "CLEAR") {
		return defaultCartState;
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item: item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};
	const clearCartHandler = () => {
		dispatchCartAction({ type: "CLEAR" });
	};

	const cartContext = {
		items: cartState.items,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		clearCart: clearCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
