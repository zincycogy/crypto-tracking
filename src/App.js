import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";
import "./Coin.css";
function App() {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios
			.get(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false"
			)
			.then((response) => setCoins(response.data))
			.catch((error) => console.log(error));
	}, []);

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="coin-app">
			<div className="coin-search">
				<h1 className="coin-text">search currency</h1>
				<form>
					<input
						onChange={handleChange}
						type="text"
						placeholder="search"
						className="coin-input"
					/>
				</form>
			</div>
			{filteredCoins.map((coin) => {
				return (
					<Coin
						key={coin.id}
						name={coin.name}
						price={coin.current_price}
						image={coin.image}
						symbol={coin.symbol}
						marketCap={coin.market_cap}
						priceChange={coin.price_change_percentage_24h}
						volume={coin.total_volume}
					/>
				);
			})}
		</div>
	);
}

export default App;
