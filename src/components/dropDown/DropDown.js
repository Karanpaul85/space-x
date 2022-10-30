import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const DropDown = (props) => {
	let { selectedMenu, startIcon, endIcon, menuOptions, setFilter } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [selected, setSelected] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (event) => {
		setSelected(event.currentTarget.dataset.value);
		setAnchorEl(null);
		setFilter(
			Object.keys(event.currentTarget.dataset).length > 0
				? event.currentTarget.dataset.myvalue === "all"
					? ""
					: event.currentTarget.dataset.myvalue
				: ""
		);
	};
	return (
		<div>
			<Button
				id='basic-button'
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup='true'
				aria-expanded={open ? "true" : undefined}
				startIcon={startIcon}
				endIcon={endIcon}
				color='inherit'
				onClick={handleClick}>
				{!selected ? selectedMenu() : selected}
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				{menuOptions &&
					menuOptions.length &&
					menuOptions?.map((item, index) => {
						return (
							<MenuItem onClick={handleClose} key={index} data-myvalue={item.value} data-value={item.type}>
								{item.type}
							</MenuItem>
						);
					})}
			</Menu>
		</div>
	);
};
export default DropDown;
