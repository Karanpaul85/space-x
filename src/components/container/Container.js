import { Container, Grid, Pagination } from "@mui/material";
import Table from "../table/Table";
import ModalSec from "../modal/ModalSec";
import styles from "../container/container.module.css";
import DropDown from "../dropDown/DropDown";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const ContainerSec = () => {
	let history = useNavigate();
	const location = useLocation();
	const [page, setPage] = useState(1);
	const [allLaunched, setAllLaunched] = useState([]);
	const [displayLaunched, setDisplayLaunched] = useState([]);
	const [filterArr, setFilterArr] = useState([]);
	const [open, setOpen] = useState(false);
	const [modalObj, setModalObj] = useState({});
	const [filterType, setFilterType] = useState("");
	const path = location.pathname.split("/")[1];

	//get all data from api
	useEffect(() => {
		fetchData();
		setFilterType(path);
		return () => path;
	}, [path]);

	useEffect(() => {
		//get array as page
		let apiPage = (page - 1) * 12;
		let restArray = filterArr.length > 0 ? filterArr.slice(apiPage, 12 * page) : allLaunched.slice(apiPage, 12 * page);
		setDisplayLaunched(restArray);
	}, [page, allLaunched, filterArr]);

	useEffect(() => {
		const allFilter = () => {
			let filterArr = allLaunched.filter((item) => {
				if (filterType === "upcoming") {
					return item.upcoming === true;
				} else if (filterType === "success") {
					return item.launch_success === true;
				} else if (filterType === "failed") {
					return item.launch_success === false;
				} else {
					return item;
				}
			});
			history(`/${filterType}`);
			setFilterArr(filterArr);
			setPage(1);
		};
		allFilter();
	}, [filterType, allLaunched, history]);

	//update page
	const updatePage = (val) => {
		setPage(val);
	};
	//fetch data

	const fetchData = () => {
		fetch(`https://api.spacexdata.com/v3/launches`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setAllLaunched(data);
				setDisplayLaunched(data.slice(0, 12));
			});
	};

	//display details in model
	const showDetails = (flightNumber) => {
		let myObj = allLaunched.find((launch) => launch.flight_number === flightNumber);
		setOpen(true);
		setModalObj(myObj);
	};
	//convert date formate
	const convertDate = (dateStamp) => {
		const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const date = new Date(dateStamp);
		const lDate = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
		const monthName = month[date.getMonth()];
		const year = date.getFullYear();
		const hrs = date.getHours();
		const mins = date.getMinutes();
		const finalTime = `${lDate} ${monthName} ${year} at ${hrs}:${mins}`;
		return finalTime;
	};
	//all filter

	let pageinationLength = filterArr.length > 0 ? filterArr.length : allLaunched.length;
	return (
		<>
			<Container maxWidth='xl' className={styles.mt}>
				<Grid container style={{ margin: "20px 0" }}>
					<Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", padding: 0 }}>
						<DropDown
							selectedMenu='All Launches'
							endIcon={<KeyboardArrowDownIcon />}
							startIcon={<FilterAltOutlinedIcon />}
							setFilter={setFilterType}
							menuOptions={[
								{ type: "All Launches", value: "all" },
								{ type: "Upcoming Launches", value: "upcoming" },
								{ type: "Successful Launches", value: "success" },
								{ type: "Failed Launches", value: "failed" },
							]}
						/>
					</Grid>
				</Grid>
				<Table allLaunched={displayLaunched} showDetails={showDetails} convertDate={convertDate} />
				{pageinationLength > 12 && (
					<Pagination
						count={Math.ceil(pageinationLength / 12)}
						page={page}
						variant='outlined'
						shape='rounded'
						className={styles.pagination}
						onChange={(event, value) => updatePage(value)}
					/>
				)}
			</Container>
			<ModalSec setOpen={setOpen} open={open} modalObj={modalObj} convertDate={convertDate} />
		</>
	);
};
export default ContainerSec;
