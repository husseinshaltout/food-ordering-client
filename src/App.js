import { useState } from "react";
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

	return (
		<CartProvider>
			{cartIsShown && <Cart onClose={hideCartHandler} />}
			{mealOrderIsShown && <MealOrder onClose={hideMealOrderHandler} />}
			<Header onShowCart={showCartHandler} />
			<main>
				<Meals onShow={showMealOrderHandler} />
			</main>
		</CartProvider>
	);
}

export default App;
