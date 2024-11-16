"use client";

import { useState, useEffect } from "react";

export default function Coin_Market() {
  const api = "e586d121b4b369b5e23e71b31e7b72cf"; 
  const [selected_coin, setSelected_coin] = useState<string>("BTC");
  const [rates, setRates] = useState<Record<string, number>>({});


  useEffect(() => {
    fetch(`http://api.coinlayer.com/live?access_key=${api}`)
    .then((response) => response.json())
    .then((json_converted) => {
      console.log("json converted data : ", json_converted);
      setRates(json_converted.rates);
    }
  );
  },[]
);

  const Coin_Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected_coin(event.target.value);
  };

return(
  <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-green-100 p-5">
    <div className="flex flex-col items-center gap-12 p-6 bg-white rounded-xl shadow-lg max-w-3xl w-full">
      <h1 className="font-serif font-extrabold text-4xl text-center text-gray-800" >Cryptocurrency Coin Rates</h1>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full ">
        <select className="border bg-white rounded-lg p-3 text-xl font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={selected_coin} 
        onChange={Coin_Change}>
          {Object.keys(rates).map((coin) => (
            <option key={coin} value={coin}>
              {coin}
            </option>
          ))
          }
        </select>
        <p className="border bg-white rounded-lg p-4 text-xl font-semibold text-gray-800">Rate: ${rates[selected_coin]??"Not Available"}</p>
      </div>
    </div>
  </div>
);
}

