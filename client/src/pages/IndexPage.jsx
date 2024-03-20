import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";
import { format } from "date-fns";

export default function IndexPage() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    axios.get("/games").then((response) => {
      setGames(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {games.length > 0 &&
        games.map((game) => (
          <Link to={"/game/" + game._id} key={game._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {game.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={game.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{game.location}</h2>
            <h3 className="text-sm text-gray-500">{game.title}</h3>
            <div className="mt-1">
              <span className="font-bold">{game.price} TND</span> per player
            </div>
            <div>
              {"datetime" in game &&
                "Date: " + format(new Date(game.datetime), "dd/mm/yyyy")}
            </div>
            <div>
              {"datetime" in game &&
                "Time: " + format(new Date(game.datetime), "HH:mm")}
            </div>
          </Link>
        ))}
    </div>
  );
}
