import { useState } from "react";
import { api } from "../../services/api";
import { IMaskInput } from "react-imask";

import {
	Container,
	IconButtonStyled,
	ListCard,
	SearchBox,
	TextFieldStyled,
} from "../../components/Styled/Styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { ReservationsData } from "./ReservationsData";
import FrammerMotion from "../../components/FramerMotion/FramerMotion";
import { Alert, Snackbar } from "@mui/material";

export default function Reservations() {
	const [Reservation, setReservation] = useState<any>([]);
	const [ReservationGuests, setReservationGuests] = useState<any>([]);

	const [SearchValue, setSearchValue] = useState("");

	const [OpenSnackbar, setOpenSnackbar] = useState(false);
	const [SnackbarMenssage, setSnackbarMenssage] = useState("");

	const [EnabledEditMode, setEnabledEditMode] = useState(false);

	const [AddNewGuestName, setAddNewGuestName] = useState("");
	const [AddNewGuestLastName, setAddNewGuestLastName] = useState("");

	const [ClickButton, setClickButton] = useState(false);

	const [state, setState] = useState({
		hotelid: "",
		checkin: "",
		checkout: "",
		status: "",
		apartment: "",
	});

	const handleChange = (v: any, ref: any) => {
		setState({
			...state,
			[ref.el.input.name]: v,
		});
	};
	console.log(state);
	const searchReservation = async () => {
		const response = await api.get("buscarReserva", {
			params: {
				id: SearchValue,
			},
		});

		if (response.data[0] === null) {
			setOpenSnackbar(true);
			return setSnackbarMenssage("Não existem reservas com esse ID");
		}

		if (SearchValue === "") {
			setOpenSnackbar(true);
			return setSnackbarMenssage("O campo está vazio");
		}

		setReservation([response.data[0]]);
		setReservationGuests(response.data[1]);
	};

	const RemoveGuest = async (value: any) => {
		setClickButton(true);
		await api.delete("/deletarHospede", {
			params: {
				id: value.id,
			},
		});

		const response = await api.get("buscarReserva", {
			params: {
				id: Reservation[0].id,
			},
		});
		setReservationGuests(response.data[1]);
		setClickButton(false);
	};

	const UpdateReservation = async () => {
		const response = await api.put("/atualizarReserva", {
			params: {
				id: SearchValue,
				hotel_id: state.hotelid,
				apartment: state.apartment,
				date_checkin: state.checkin,
				date_checkout: state.checkout,
				status: state.status,
			},
		});

		if (response.data.menssage) {
			setOpenSnackbar(true);
			return setSnackbarMenssage(response.data.menssage);
		}

		setEnabledEditMode(false);
	};

	const AddNewGuestReservation = async () => {
		setClickButton(true);
		await api.post("/adicionarHospede", {
			params: {
				name: AddNewGuestName,
				last_name: AddNewGuestLastName,
				reservation_id: Reservation[0].id,
			},
		});

		const response = await api.get("buscarReserva", {
			params: {
				id: Reservation[0].id,
			},
		});
		setReservationGuests(response.data[1]);
		setClickButton(false);
	};

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnackbar(false);
	};

	return (
		<FrammerMotion>
			<Container>
				{EnabledEditMode ? (
					<>
						<h1>MODO EDIÇÃO</h1>
					</>
				) : (
					<>
						<h1>RESERVAS CADASTRADAS</h1>
						<SearchBox>
							<TextFieldStyled
								placeholder="digite o id da reserva"
								defaultValue={SearchValue}
								type="number"
								onChange={(e) => setSearchValue(e.target.value)}
							/>
							<IconButtonStyled
								disabled={SearchValue ? false : true}
								onClick={() => searchReservation()}
							>
								<SearchIcon style={{ fill: `${SearchValue ? "" : "grey"}` }} />
							</IconButtonStyled>
						</SearchBox>
					</>
				)}

				{Reservation.map((value: ReservationsData, key: any) => (
					<ListCard key={key}>
						<h2>ID da Reserva: {value.id}</h2>
						<label>
							ID do hotel:<h3>{value.hotel_id}</h3>
							<label style={{ display: `${EnabledEditMode ? "" : "none"}` }}>
								<IMaskInput
									// @ts-ignore
									name="hotelid"
									mask={Number}
									onAccept={handleChange}
									value={state.hotelid}
								/>
							</label>
						</label>
						<label>
							Data de Checkin:<h3> {value.date_checkin}</h3>
							<label style={{ display: `${EnabledEditMode ? "" : "none"}` }}>
								<IMaskInput
									// @ts-ignore
									name="checkin"
									mask={"00/00/0000"}
									onAccept={handleChange}
									value={state.checkin}
								/>
							</label>
						</label>
						<label>
							Data de Checkout:<h3> {value.date_checkout}</h3>
							<label style={{ display: `${EnabledEditMode ? "" : "none"}` }}>
								<IMaskInput
									// @ts-ignore
									name="checkout"
									mask={"00/00/0000"}
									onAccept={handleChange}
									value={state.checkout}
								/>
							</label>
						</label>

						<label>
							Apartamento:
							<h3>{value.apartment}</h3>
							<label style={{ display: `${EnabledEditMode ? "" : "none"}` }}>
								<IMaskInput
									// @ts-ignore
									name="apartment"
									mask={"00"}
									onAccept={handleChange}
									value={state.apartment}
								/>
							</label>
						</label>
						<label>
							status:<h3> {value.status} </h3>
							<label style={{ display: `${EnabledEditMode ? "" : "none"}` }}>
								<IMaskInput
									// @ts-ignore
									name="status"
									mask={"00"}
									onAccept={handleChange}
									value={state.status}
								/>
							</label>
						</label>

						<div>
							{EnabledEditMode ? (
								<IconButtonStyled
									onClick={() => {
										UpdateReservation();
									}}
								>
									<CheckIcon />
								</IconButtonStyled>
							) : (
								<>
									<IconButtonStyled
										onClick={() => {
											setEnabledEditMode(true);
										}}
									>
										<BorderColorIcon />
									</IconButtonStyled>
								</>
							)}

							{/* <IconButtonStyled>
								<DeleteForeverIcon className="deleteIconButton" />
							</IconButtonStyled> */}
						</div>
					</ListCard>
				))}

				{ReservationGuests.map((value: any, key: any) => (
					<ListCard>
						<h2>ID do Hospede: {value.id}</h2>
						<label>
							Nome:<h3>{value.name}</h3>
						</label>
						<label>
							Sobrenome:<h3> {value.last_name}</h3>
						</label>

						<div>
							{EnabledEditMode ? (
								<IconButtonStyled
									onClick={() => {
										RemoveGuest(value);
									}}
									disabled={ClickButton}
								>
									<DeleteForeverIcon className="deleteIconButton" />
								</IconButtonStyled>
							) : (
								<></>
							)}
						</div>
					</ListCard>
				))}
				{EnabledEditMode ? (
					<>
						<h2>Adicione mais 1 hopesde</h2>
						<ListCard>
							<label>
								Nome:{" "}
								<input onChange={(e) => setAddNewGuestName(e.target.value)} type="text" />
							</label>
							<label>
								Sobrenome:
								<input
									onChange={(e) => setAddNewGuestLastName(e.target.value)}
									type="text"
								/>
							</label>

							<IconButtonStyled
								onClick={() => {
									AddNewGuestReservation();
								}}
								disabled={ClickButton}
							>
								<AddCircleIcon />
							</IconButtonStyled>
						</ListCard>
					</>
				) : (
					<></>
				)}

				<Snackbar open={OpenSnackbar} autoHideDuration={2500} onClose={handleClose}>
					<Alert
						onClose={handleClose}
						severity="error"
						sx={{
							width: "100%",
							fontSize: "1.4rem",
							fontFamily: `"Montserrat", sans-serif`,
						}}
					>
						{SnackbarMenssage}
					</Alert>
				</Snackbar>
			</Container>
		</FrammerMotion>
	);
}
