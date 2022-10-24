import DomainIcon from "@mui/icons-material/Domain";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import KeyIcon from "@mui/icons-material/Key";

export const SidebarData = [
	{
		icon: DomainIcon,
		title: "Hoteis Cadastrados",
		link: "/#/",
	},
	{
		icon: DomainAddIcon,
		title: "Cadastrar Hotel",
		link: "/#/CadastrarHotel",
	},
	{
		icon: RoomServiceIcon,
		title: "Cadastrar Reservar",
		link: "/#/CadastrarReserva",
	},
	{
		icon: KeyIcon,
		title: "Reservas",
		link: "/#/Reservas",
	},
];
