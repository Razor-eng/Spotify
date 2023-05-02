import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify"
import { millisToMinutes } from "../lib/time"
import { XCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";

function Song({ order, track }) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [clicked, setClicked] = useState(false)

    const playSong = () => {
        setCurrentTrackId(track.track);
        setIsPlaying(true);
        setClicked(true)
        // console.log(track.track.name)
        // spotifyApi.play({
        //     uris: [track.track.uri],
        // });
    };
    const closeSong = () => {
        setCurrentTrackId(null);
        setIsPlaying(false);
        setClicked(false)
        // console.log(track.track.name)
        // spotifyApi.play({
        //     uris: [track.track.uri],
        // });
    };
    console.log(clicked)
    return (
        <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={playSong}>
            <div className="flex items-center space-x-4">
                <p>{order + 1}</p>
                <img className="h-10 w-10" src={track.track.album.images[0].url} alt="" />
                <div>
                    <p className="w-36 lg:w-34 text-white truncate">{track.track.name}</p>
                    <p className="w-40">{track.track.artists[0].name},{track.track.artists[1]?.name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline w-40">{track.track.album.name}</p>
                <p>{millisToMinutes(track.track.duration_ms)}</p>
            </div>
            {clicked &&
                (
                    <div className="backdrop-blur-lg w-[60%] absolute flex items-center justify-start right-0 top-24 h-20">
                        <img src={currentTrackId?.album?.images[0]?.url} alt="" className="w-16 rounded-full" />
                        <div className=" ml-8 flex items-center">
                            <p className="w-36 lg:w-34 text-white truncate">{currentTrackId?.name}</p>
                            <p className="w-40 ml-12 text-gray-400">{currentTrackId?.artists[0].name},{currentTrackId?.artists[1]?.name}</p>
                        </div>
                        <div className="flex items-center justify-between ml-auto md:ml-0">
                            <p className="ml-20 hidden md:inline text-gray-400 w-40">{currentTrackId?.album.name}</p>
                            <p className=" ml-20 text-gray-400">{millisToMinutes(currentTrackId?.duration_ms)}</p>
                        </div>
                        <div onClick={closeSong}>
                            <XCircleIcon className="w-8 mr-0 text-white ml-16 hover:text-red-300" />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Song
