import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/solid';
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];

function center() {
    const { data: session } = useSession();
    const playlistId = useRecoilValue(playlistIdState);
    const router = useRouter();
    const [color, setColor] = useState(null);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const spotifyApi = useSpotify();

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId])

    function redirect() {
        router.push('/login')
    }

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => console.log("Something went wrong!", err));
    }, [spotifyApi, playlistId])

    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8 text-white">
                <div className="flex items-center bg-gray-800 space-x-3 opacity-90 hover:opacity-70 cursor-pointer rounded-full p-1 pr-2" onClick={redirect}>
                    <UserCircleIcon className='h-10 w-10 rounded-full' />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} text-white p-8 h-80`}>
                <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>

            <div>
                <Songs />
            </div>
        </div>
    )
}

export default center
