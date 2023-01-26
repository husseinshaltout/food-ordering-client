import React, { Fragment, useState } from "react";

import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
	const [selectedItem, setSelectedItem] = useState("");

	const getSelectedItemHandler = (item) => {
		setSelectedItem(item);
		props.onGetItemData(selectedItem);
	};

	return (
		<Fragment>
			<MealsSummary />
			<AvailableMeals
				getSelectedItem={getSelectedItemHandler}
				onShow={props.onShow}
			/>
		</Fragment>
	);
};

export default Meals;
