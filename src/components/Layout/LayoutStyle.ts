import { styled } from "@mui/material";

export interface StyledProps {
	open: boolean;
}

export const LayoutStyled = styled("div")(({ open = false }: StyledProps) => ({
	width: open ? "calc(100% - 14rem)" : "100%",
	height: "min(100vh, 100%)",
	marginLeft: open ? "14rem" : "",
	paddingTop: "6rem",

	background: "var(--gradient)",

	transition: "all 400ms",
}));

export const NavBar = styled("nav")(({ open = false }: StyledProps) => ({
	width: open ? "calc(100% - 14rem)" : "100%",
	marginLeft: open ? "14rem" : "",
	height: "6rem",
	paddingInline: "1rem",

	display: "flex",
	justifyContent: "space-between",
	flexDirection: "row",
	alignItems: "center",

	position: "fixed",
	zIndex: "10",

	backgroundColor: "var(--off-white)",
	boxShadow: "var(--shadow)",
	overflow: "hidden",
	transition: "all 400ms",

	"& .menuSidebar": {
		position: "relative",
		left: "0rem",

		fontSize: "3.2rem",
		color: "var(--main-color)",
	},

	"& a": {
		fontSize: "2.4rem",
		fontWeight: 800,

		color: "var(--main-color)",
		textDecoration: "none",
	},
}));

export const SideBar = styled("div")(({ open = false }: StyledProps) => ({
	width: "14rem",
	height: "100%",
	paddingTop: "6rem",

	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "center",

	position: "fixed",
	top: 0,
	zIndex: 10,

	background: "var(--main-gradient)",

	left: open ? "0" : "-140px",
	transition: "all 400ms",

	"& a": {
		textDecoration: "none",
		color: "white",
	},
	"& span": {
		color: "white",
		fontSize: ".9rem",
		fontStyle: "italic",
		fontWeight: "300",
	},
}));

export const SideBarOption = styled("li")(() => ({
	fontSize: " 1.2rem",
	fontWeight: 600,
	padding: "1rem",

	display: "flex",
	alignItems: "center",
	gap: "0.5rem",

	cursor: "pointer",
	transition: "all 400ms",
	"& svg": {
		fill: "white",
		fontSize: " 3.2rem",
	},
	"&:hover": {
		backgroundColor: "var(--main-dark)",
	},
}));
