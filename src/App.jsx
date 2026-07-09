import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Flex } from "./components";
import ProfileSelection from "./ProfileSelection";
import GMView from "./GMView";
import LairMap from "./gm/LairMap";

export default function App() {
	return (
		<BrowserRouter>
			<div className="app-shell">
				<Routes>
					<Route path="/" element={<ProfileSelection />} />
					<Route path="/gm/:id" element={<GMView />} />
					<Route path="/gm/:id/lair-map" element={<LairMap />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}
