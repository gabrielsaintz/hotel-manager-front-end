import { Button, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const IconButtonStyled = styled(IconButton)(() => ({
	width: "fit-content",
	height: "fit-content",
}));

export const ButtonStyled = styled(Button)(() => ({
	width: "60%",
	height: "4rem",

	fontFamily: `"Montserrat", sans-serif`,
	fontSize: "1.4rem",
	fontWeight: "600",
	textTransform: "none",
}));

export const TextFieldStyled = styled(TextField)(() => ({
	width: "60%",
	margin: "1rem",

	"& input": {
		height: "1rem",
		fontFamily: `"Montserrat", sans-serif`,
		fontWeight: 500,
		fontSize: "1.6rem",
	},
}));

export const Container = styled("div")(() => ({
	width: "100%",
	paddingBottom: "2rem",
	display: "flex",
	alignItems: "center",
	flexDirection: "column",

	"& h1": {
		fontSize: "3rem",
		fontWeight: "800",
		color: "var(--main-color)",
		marginTop: "2rem",
	},
}));

export const ListCard = styled("div")(() => ({
	width: "80%",
	margin: ".5rem",
	padding: "1rem",
	borderRadius: ".5rem",

	backgroundColor: "white",

	display: "flex",
	alignItems: "center",
	flexDirection: "row",

	"& label, h2": {
		display: "flex",
		flexDirection: "column",
		flex: "1",
	},
	"& .deleteIconButton": {
		fill: "#a51006",
	},
	"& svg": {
		fill: "var(--main-color)",
		cursor: "pointer",
		fontSize: "2rem",
	},
	"& input": {
		fontFamily: `"Montserrat", sans-serif`,
		fontSize: "1.3rem",
		fontWeight: 600,
		width: "60%",
	},
}));

export const SearchBox = styled("div")(() => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",

	"& svg": {
		fontSize: "3rem",
		fill: "var(--main-color)",
	},
}));
