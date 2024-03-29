import React, { Fragment } from "react";

import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = (props) => {
	return (
		<Fragment>
			<MealsSummary />
			<AvailableMeals
				onGetItemData={props.onGetItemData}
				onShow={props.onShow}
			/>
		</Fragment>
	);
};

export default Meals;
