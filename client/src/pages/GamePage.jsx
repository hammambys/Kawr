import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import AddressLink from "../AddressLink";
import GameGallery from "../GameGallery";
import { format } from "date-fns";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/games/${id}`).then((response) => {
      setGame(response.data);
    });
  }, [id]);

  if (!game) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{game.title}</h1>
      <AddressLink>{game.address}</AddressLink>
      <GameGallery game={game} />
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Owner</h2>
            {game.owner?.name ? game.owner?.name : "foulen fouleni"}
          </div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {game.description ? game.description : "No description"}
          </div>
          <div>
            {"datetime" in game &&
              "Date: " + format(new Date(game.datetime), "dd/mm/yyyy")}
          </div>
          <div>
            {"datetime" in game &&
              "Time: " + format(new Date(game.datetime), "HH:mm")}
          </div>
          <br />
          Max number of players: {game.maxPlayers}
        </div>
        <div>
          <BookingWidget game={game} />
        </div>
      </div>
    </div>
  );
}
