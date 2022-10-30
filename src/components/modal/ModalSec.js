import * as React from "react";
import {
	Dialog,
	DialogContent,
	styled,
	DialogTitle,
	IconButton,
	Typography,
	Avatar,
	Chip,
	Slide,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

function BootstrapDialogTitle(props) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};
const ModalSec = (props) => {
	const { setOpen, open, modalObj, convertDate } = props;
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			{Object.keys(modalObj).length > 0 && (
				<BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open} TransitionComponent={Transition}>
					<BootstrapDialogTitle id='customized-dialog-title' onClose={handleClose}>
						<Grid container spacing={1} direction={{ xs: "column", md: "row" }}>
							<Grid item xs={2}>
								<Avatar alt={modalObj.mission_name} src={modalObj.links.mission_patch_small} sx={{ width: 56, height: 56 }} />
							</Grid>
							<Grid item xs={10}>
								<Grid container spacing={1}>
									<Grid item md={3} xs={6}>
										<Grid container spacing={1}>
											<Grid item xs={12} style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
												{modalObj.mission_name}
											</Grid>
											<Grid item xs={12} style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: 12 }}>
												{modalObj.rocket.rocket_name}
											</Grid>
											<Grid item xs={12}>
												<Grid container spacing={1}>
													<Grid item xs={3}>
														{modalObj.links.article_link && (
															<a href={modalObj.links.article_link} target='_blank' rel='noreferrer'>
																<Avatar
																	variant='circular'
																	alt='Nasa Logo'
																	title='Nasa'
																	src='https://www.azavea.com/wp-content/uploads/2020/09/flat-nasa-logo.svg'
																	sx={{ width: 18, height: 18 }}
																/>
															</a>
														)}
													</Grid>
													<Grid item xs={3}>
														{modalObj.links.wikipedia && (
															<a href={modalObj.links.wikipedia} target='_blank' rel='noreferrer'>
																<Avatar
																	variant='circular'
																	alt='wikipedia Logo'
																	title='Wikipedia'
																	src='https://cdn.icon-icons.com/icons2/2845/PNG/512/wikipedia_logo_icon_181367.png'
																	sx={{ width: 18, height: 18 }}
																/>
															</a>
														)}
													</Grid>
													<Grid item xs={3}>
														{modalObj.links.video_link && (
															<a href={modalObj.links.video_link} target='_blank' rel='noreferrer'>
																<Avatar
																	variant='circular'
																	alt='Youtube Logo'
																	title='Youtube'
																	src='https://cdn-icons-png.flaticon.com/512/87/87421.png'
																	sx={{ width: 18, height: 18 }}
																/>
															</a>
														)}
													</Grid>
													<Grid item xs={3}>
														{modalObj.links.presskit && (
															<a href={modalObj.links.presskit} target='_blank' rel='noreferrer'>
																<Avatar
																	variant='circular'
																	alt='Press Kit Logo'
																	title='Press Kit'
																	src='https://www.sindhustanthedocumentary.com/wp-content/uploads/2020/04/presskitlogo.png'
																	sx={{ width: 18, height: 18 }}
																/>
															</a>
														)}
													</Grid>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
									<Grid item md={9} xs={6}>
										<Chip
											label={modalObj.upcoming === true ? "Upcoming" : modalObj.launch_success === true ? "Success" : "Failed"}
											className={modalObj.upcoming === true ? "upcoming" : modalObj.launch_success === true ? "success" : "failed"}
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</BootstrapDialogTitle>
					<DialogContent>
						<Typography gutterBottom>
							{modalObj.details}{" "}
							{modalObj.links.wikipedia && (
								<a href={modalObj.links.wikipedia} target='_blank' rel='noreferrer'>
									wikipedia
								</a>
							)}
						</Typography>

						<Table aria-label='a dense table'>
							<TableBody>
								<TableRow>
									<TableCell>Flight Number</TableCell>
									<TableCell>{modalObj.flight_number}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Mission Name</TableCell>
									<TableCell>{modalObj.mission_name}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Rocket Type</TableCell>
									<TableCell>{modalObj.rocket.rocket_type}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Manufacturer</TableCell>
									<TableCell>{modalObj.rocket.second_stage.payloads[0].manufacturer}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Nationality</TableCell>
									<TableCell>{modalObj.rocket.second_stage.payloads[0].nationality}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Launch Date</TableCell>
									<TableCell>{convertDate(modalObj.launch_date_utc)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Payload Type</TableCell>
									<TableCell>{modalObj.rocket.second_stage.payloads[0].payload_type}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Orbit</TableCell>
									<TableCell>{modalObj.rocket.second_stage.payloads[0].orbit}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Launch Site</TableCell>
									<TableCell>{modalObj.launch_site.site_name}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</DialogContent>
				</BootstrapDialog>
			)}
		</div>
	);
};
export default ModalSec;
