import { useEffect, useState } from "react";
import { api } from "../../services/api";

import {
	ButtonStyled,
	Container,
	IconButtonStyled,
	ListCard,
} from "../../components/Styled/Styled";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { HotelsData } from "./HotelsData";
import FrammerMotion from "../../components/FramerMotion/FramerMotion";
import UpdateHotel from "./UpdateHotel";

export default function HomePage() {
	const [hotels, setHotels] = useState([]);

	const [editModel, setEditModel] = useState(true);
	const [idHotelEdit, setidHotelEdit] = useState("");

	useEffect(() => {
		const getHotels = async () => {
			const response = await api.get("buscarHotels");
			setHotels(response.data);
		};
		getHotels();
	}, []);

	const EditHotel = (value: any) => {
		setidHotelEdit(value.id);
		setEditModel(!editModel);
	};

	return (
		<FrammerMotion>
			<Container>
				{editModel ? (
					<>
						<h1>HOTEIS CADASTRADOS</h1>

						{hotels.map((value: HotelsData, key) => (
							<ListCard key={key}>
								<h2>{value.name}</h2>
								<label>
									ID:<h3>{value.id}</h3>
								</label>

								<label>
									País:<h3> {value.country}</h3>
								</label>
								<label>
									Estado:<h3> {value.state}</h3>
								</label>
								<label>
									Cidade:<h3> {value.city} </h3>
								</label>

								<div>
									<IconButtonStyled
										onClick={() => {
											EditHotel(value);
										}}
									>
										<BorderColorIcon />
									</IconButtonStyled>
									<IconButtonStyled>
										<DeleteForeverIcon className="deleteIconButton" />
									</IconButtonStyled>
								</div>
							</ListCard>
						))}
					</>
				) : (
					<>
						<UpdateHotel id={idHotelEdit} />
						<ButtonStyled onClick={EditHotel}>
							VOLTAR PARA HOTEIS CADASTRADOS
						</ButtonStyled>
					</>
				)}
			</Container>
		</FrammerMotion>
	);
}
