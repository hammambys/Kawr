import PhotosUploader from "../PhotosUploader.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function GamesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [datetime, setDatetime] = useState("");
  const [price, setPrice] = useState(0);
  //const [players, setPlayers] = useState([]);
  const [maxPlayers, setMaxPlayers] = useState(12);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/games/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setLocation(data.location);
      setDescription(data.description);
      setAddedPhotos(data.photos);
      setDatetime(new Date(data.datetime));
      setPrice(data.price);
      //setPlayers(data.players);
      setMaxPlayers(data.maxPlayers);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveGame(ev) {
    ev.preventDefault();
    const gameData = {
      title,
      location,
      description,
      addedPhotos,
      datetime,
      price,
      //players,
      maxPlayers,
    };
    //console.log(gameData);
    if (id) {
      // update
      await axios.put("/games", {
        id,
        ...gameData,
      });
      setRedirect(true);
    } else {
      // new game
      await axios.post("/games", gameData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/games"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={saveGame}>
        {preInput(
          "Title",
          "Title for your game. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("location", "location to this game")}
        <input
          type="text"
          value={location}
          onChange={(ev) => setLocation(ev.target.value)}
          placeholder="location"
        />
        {preInput("Description", "description of the game")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {/*{preInput("Players", "select all the players of your game")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Players selected={players} onChange={setPlayers} />
        </div>*/}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Date and time</h3>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={datetime}
                onChange={(date) => setDatetime(date)}
              />
            </LocalizationProvider>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of players</h3>
            <input
              type="number"
              max={16}
              min={12}
              value={maxPlayers}
              onChange={(ev) => setMaxPlayers(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per player</h3>
            <div className="flex align-middle">
              <input
                type="number"
                max={15}
                min={0}
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
              TND
            </div>
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
