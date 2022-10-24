import { useState } from "react";
import { Outlet } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { SidebarData } from "./SidebarData";
import { LayoutStyled, NavBar, SideBar, SideBarOption } from "./LayoutStyle";

import { IconButtonStyled } from "../Styled/Styled";

export default function Layout() {
	const [sidebar, setSidebar] = useState(true);

	const icon = !sidebar ? (
		<MenuIcon className="menuSidebar" />
	) : (
		<MenuOpenIcon className="menuSidebar" />
	);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<NavBar open={sidebar}>
				<IconButtonStyled onClick={showSidebar}>{icon}</IconButtonStyled>
				<a href="/#/">HOTEL MANAGER</a>
			</NavBar>

			<LayoutStyled open={sidebar}>
				<Outlet />
			</LayoutStyled>

			<SideBar open={sidebar}>
				<ul>
					{SidebarData.map((val, key) => {
						return (
							<a key={key} href={val.link}>
								<SideBarOption>
									<val.icon />
									{val.title}
								</SideBarOption>
							</a>
						);
					})}
				</ul>
				<a target="_blank" href="https://www.linkedin.com/in/gabsaintz/">
					<span>By Gabriel Saintz</span>
				</a>
			</SideBar>
		</>
	);
}
