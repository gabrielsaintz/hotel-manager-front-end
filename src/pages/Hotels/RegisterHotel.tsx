import { useState } from "react";
import { ButtonStyled, Container, TextFieldStyled } from "../../components/Styled/Styled";
import { api } from "../../services/api";
import { Alert, Snackbar } from "@mui/material";
import FrammerMotion from "../../components/FramerMotion/FramerMotion";

export default function RegisterHotel() {
	const [HotelName, setHotelName] = useState("");
	const [HotelCnpj, setHotelCnpj] = useState("");
	const [HotelCountry, setHotelCountry] = useState("");
	const [HotelState, setHotelState] = useState("");
	const [Hotelcity, setHotelcity] = useState("");

	const [OpenSnackbar, setOpenSnackbar] = useState(false);
	const [SnackbarMenssage, setSnackbarMenssage] = useState("");
	const [SnackbarSeverity, setSnackbarSeverity] = useState<any>("error");

	const [ClickButton, setClickButton] = useState(false);

	const HandleSubmit = async () => {
		setClickButton(true);
		const response = await api.post("/cadastrarHotel", {
			params: {
				name: HotelName,
				cnpj: HotelCnpj,
				country: HotelCountry,
				state: HotelState,
				city: Hotelcity,
			},
		});

		if (response.data.menssage) {
			setSnackbarSeverity("error");
			setOpenSnackbar(true);
			setSnackbarMenssage(response.data.menssage);
			return setClickButton(false);
		}
		setSnackbarSeverity("success");
		setOpenSnackbar(true);
		setSnackbarMenssage("Hotel Cadastrado Com Sucesso");
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
				<h1>CADASTRAR HOTEL</h1>

				<TextFieldStyled
					placeholder="Nome do Hotel"
					onChange={(e) => setHotelName(e.target.value)}
				/>
				<TextFieldStyled
					placeholder="00.000.000/0001-00 CNPJ "
					onChange={(e) => setHotelCnpj(e.target.value)}
				/>
				<TextFieldStyled
					placeholder="País"
					onChange={(e) => setHotelCountry(e.target.value)}
				/>
				<TextFieldStyled
					placeholder="Estado"
					onChange={(e) => setHotelState(e.target.value)}
				/>
				<TextFieldStyled
					placeholder="Cidade"
					onChange={(e) => setHotelcity(e.target.value)}
				/>
				<ButtonStyled disabled={ClickButton} variant="contained" onClick={HandleSubmit}>
					CADASTRAR HOTEL
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
		</FrammerMotion>
	);
}
