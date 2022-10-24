import { useState } from "react";
import { ButtonStyled, Container, TextFieldStyled } from "../../components/Styled/Styled";
import { api } from "../../services/api";
import { Alert, Snackbar } from "@mui/material";

export default function RegisterReservation() {
	const [ReservationHotel, setReservationHotel] = useState("");
	const [ReservationApartment, setReservationApartment] = useState("");
	const [ReservationNumber, setReservationNumber] = useState("");
	const [ReservationCheckin, setReservationCheckin] = useState("");
	const [ReservationCheckout, setReservationCheckout] = useState("");
	const [ReservationStatus, setReservationStatus] = useState("");

	const [OpenSnackbar, setOpenSnackbar] = useState(false);
	const [SnackbarMenssage, setSnackbarMenssage] = useState("");
	const [SnackbarSeverity, setSnackbarSeverity] = useState<any>("error");

	const [ClickButton, setClickButton] = useState(false);

	const HandleSubmit = async () => {
		const response = await api.post("/cadastrarReserva", {
			params: {
				hotel_id: ReservationHotel,
				apartment: ReservationApartment,
				reservation_number: ReservationNumber,
				date_checkin: ReservationCheckin,
				date_checkout: ReservationCheckout,
				status: ReservationStatus,
			},
		});

		if (response.data.menssage) {
			setClickButton(true);
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			setSnackbarMenssage(response.data.menssage);
			return setClickButton(false);
		}

		setClickButton(true);
		setSnackbarSeverity("success");
		setOpenSnackbar(true);
		setSnackbarMenssage(`Reserva Cadatrada Com Successo ID:${response.data.id}`);
		setClickButton(false);
	};

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setOpenSnackbar(false);
	};

	return (
		<Container>
			<h1>CADASTRAR RESERVA</h1>

			<TextFieldStyled
				placeholder="ID do Hotel"
				onChange={(e) => setReservationHotel(e.target.value)}
			/>
			<TextFieldStyled
				placeholder="Apartamento "
				onChange={(e) => setReservationApartment(e.target.value)}
			/>
			<TextFieldStyled
				placeholder="Numero da reserva"
				onChange={(e) => setReservationNumber(e.target.value)}
			/>
			<TextFieldStyled
				placeholder="Data de Checkin"
				onChange={(e) => setReservationCheckin(e.target.value)}
			/>
			<TextFieldStyled
				placeholder="Data de Checkout"
				onChange={(e) => setReservationCheckout(e.target.value)}
			/>
			<TextFieldStyled
				placeholder="Status da Reserva"
				onChange={(e) => setReservationStatus(e.target.value)}
			/>
			<ButtonStyled disabled={ClickButton} variant="contained" onClick={HandleSubmit}>
				CADASTRAR RESERVA
			</ButtonStyled>
			<Snackbar open={OpenSnackbar} autoHideDuration={2500} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={SnackbarSeverity}
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
	);
}
