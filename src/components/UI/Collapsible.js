import React, { useState } from "react";

import classes from "./Collapsible.module.css";

const Collapsible = ({ open, children, title }) => {
	const [isOpen, setIsOpen] = useState(open);

	const handleFilterOpening = () => {
		setIsOpen((prev) => !prev);
	};

	const collapseControl = `${classes.title} ${
		isOpen ? classes["custom-collapsed"] : ""
	}`;

	return (
		<div className={classes["item-options"]}>
			<h4 onClick={handleFilterOpening} className={`${collapseControl}`}>
				{title}
			</h4>

			{isOpen && children}
		</div>
	);
};

export default Collapsible;
