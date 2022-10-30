import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";
import Loader from "../loader/Loader";
import styles from "../table/table.module.css";

const LaunchedDetails = (props) => {
	const { allLaunched, showDetails, convertDate } = props;

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table' className={styles.tableHead}>
				<TableHead>
					<TableRow>
						<TableCell>No:</TableCell>
						<TableCell>Launched (UTC)</TableCell>
						<TableCell>Location</TableCell>
						<TableCell>Mission</TableCell>
						<TableCell>Orbit</TableCell>
						<TableCell align='center'>Launched Status</TableCell>
						<TableCell align='center'>Rocket</TableCell>
					</TableRow>
				</TableHead>
				{allLaunched.length ? (
					<TableBody>
						{allLaunched.map((row, index) => (
							<TableRow
								key={`${row.flight_number}_${row.mission_name}`}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								onClick={() => showDetails(row.flight_number)}>
								<TableCell scope='row'>{index + 1 <= 9 ? "0" + (index + 1) : index + 1}</TableCell>
								<TableCell scope='row'>{convertDate(row.launch_date_utc)}</TableCell>
								<TableCell>{row.launch_site.site_name}</TableCell>
								<TableCell>{row.mission_name}</TableCell>
								<TableCell>{row.rocket.second_stage.payloads[0].orbit}</TableCell>
								<TableCell align='center'>
									<Chip
										label={row.upcoming === true ? "Upcoming" : row.launch_success === true ? "Success" : "Failed"}
										className={row.upcoming === true ? "upcoming" : row.launch_success === true ? "success" : "failed"}
										clickable
									/>
								</TableCell>
								<TableCell align='center'>{row.rocket.rocket_name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				) : (
					<TableBody>
						<TableRow>
							<TableCell align='center' colSpan={7}>
								<Loader />
							</TableCell>
						</TableRow>
					</TableBody>
				)}
			</Table>
		</TableContainer>
	);
};

export default LaunchedDetails;
