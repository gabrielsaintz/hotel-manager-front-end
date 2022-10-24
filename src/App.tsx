import { Routes, Route, HashRouter } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Hotels from "./pages/Hotels/Hotels";
import RegisterHotel from "./pages/Hotels/RegisterHotel";
import RegisterReservation from "./pages/Reservations/RegisterReservation";
import Reservations from "./pages/Reservations/Reservations";

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Hotels />} />
					<Route path="/CadastrarHotel" element={<RegisterHotel />} />
					<Route path="/Reservas" element={<Reservations />} />
					<Route path="/CadastrarReserva" element={<RegisterReservation />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}
