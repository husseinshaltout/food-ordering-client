import { Fragment, useState, useEffect } from "react";

import classes from "./MealFinder.module.css";

const MealFinder = (props) => {
	const [filteredItems, setFilteredItems] = useState(props.items);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		setFilteredItems(
			props.items.filter((item) => item.name.includes(searchTerm))
		);
	}, [searchTerm, props.items]);

	const searchChangeHandler = (event) => {
		setSearchTerm(event.target.value);
		props.onGetItems(filteredItems);
	};

	return (
		<Fragment>
			<div className={classes.finder}>
				<label>Search by name: </label>
				<input type="search" onChange={searchChangeHandler} />
			</div>
			{/* <Users users={filteredItems} /> */}
		</Fragment>
	);
};

export default MealFinder;
