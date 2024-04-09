import React from "react";

const SongCard = ({ song }) => {
  return (
    <div className="flex w-full p-0.5 transition ease-in hover:bg-gray-100">
      <div className="w-12 h-12">
        <img src={song?.album.images[1]?.url} className="h-full w-full" />
      </div>
      <div className="ml-4 w-3/5 flex flex-col justify-center h-12">
        <h1 className="font-bold text-sm leading-none">{song.name}</h1>
        <p className="font-light text-sm truncate">
          {song.artists.map(
            (artist, i) =>
              `${
                i < 3
                  ? `${artist.name}${
                      i === song.artists.length - 1 || i === 2 ? "" : ","
                    } `
                  : ""
              }`
          )}
        </p>
      </div>
    </div>
  );
};

export default SongCard;
