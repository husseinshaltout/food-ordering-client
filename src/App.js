import React, { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import MealOrder from "./components/Meals/MealOrder/MealOrder";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);

	const showCartHandler = () => {
		setCartIsShown(true);
	};
	const hideCartHandler = () => {
		setCartIsShown(false);
	};

	const [mealOrderIsShown, setMealOrderIsShown] = useState(false);

	const showMealOrderHandler = () => {
		setMealOrderIsShown(true);
	};

	const hideMealOrderHandler = () => {
		setMealOrderIsShown(false);
	};

	const [itemData, setItemData] = useState("");

	const getItemDataHandler = (item) => {
		setItemData(item);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
			{mealOrderIsShown && (
				<MealOrder item={itemData} onClose={hideMealOrderHandler} />
			)}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals
					onGetItemData={getItemDataHandler}
					onShow={showMealOrderHandler}
				/>
			</main>
		</CartProvider>
	);
}

export default App;
