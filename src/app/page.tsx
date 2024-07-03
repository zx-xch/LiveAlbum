'use client'
import "../styles/globals.css";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";

// ... SpotifyWebApi setup ...

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/api/auth/callback/spotify'
});

export default function Home() {

  const { data: sessionData, status } = useSession();
  const [session, setSession] = useState(sessionData);

  const [topTracks, setTopTracks] = useState<any | null>(null)
  const [tracksSet, setTracksSet] = useState(false)

  const [trackInt, setTrackInt] = useState(3)
  const [trackLyrics, setTrackLyrics] = useState('')

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  function getRandomInt(max: any) {
    return Math.floor(Math.random() * max);
  }

  spotifyApi.setAccessToken(session?.accessToken as string);
  
      useEffect(() => {
        if (!tracksSet) {
          spotifyApi.getMySavedTracks({
            limit: 50,
            offset: getRandomInt(60)
          })
      .then(function(data) {
  
        let topTracks = data.body.items;
        setTopTracks(topTracks);
        setTracksSet(true)
        console.log(topTracks)
  
        setTrackInt(getRandomInt(50))
  
      }, function(err) {
        console.log('Something went wrong!', err);
      });
        }
      }, [session])

      /* useEffect(() => {
        if (topTracks && trackInt !== null) {
          fetch(topTracks && `https://lyrist.vercel.app/api/${topTracks[trackInt]?.name}/${topTracks[trackInt]?.artists[0]?.name}`)
          .then(response => response.json())
          .then(data => { 
            console.log(data)
            setTrackLyrics(data['lyrics'])}
        )
  .catch(error => console.error('Error:', error));
        }
      }, [topTracks, trackInt]) */


    return (
      session ? 

      <div className="relative flex flex-col h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden">
  <div className="absolute inset-0">
    <Image 
      src={topTracks ? topTracks[trackInt]?.track?.album?.images[0]?.url : 'https://i.scdn.co/image/ab6761610000e5ebd77c094a3b11b8cebad34ff4'} 
      className="h-full w-full object-cover opacity-50"
      alt="" 
      layout="fill"
    />
  </div>
  
  <div className="relative flex-grow flex items-center justify-center z-10">
    <div className="text-center text-white max-w-2xl px-4">
      <blockquote className="text-3xl text-[color:white] font-bold mb-4">
        {topTracks && topTracks[trackInt]?.track?.name}
      </blockquote>
      <div className="text-lg text-[color:white]">
        <p className="mb-2 text-[color:white]">
          {topTracks && topTracks[trackInt]?.track?.artists[0]?.name}
        </p>
      </div>
    </div>
  </div>
  
  <div className="relative z-10 flex justify-center p-4 bg-black bg-opacity-30">
    <button className="text-xs text-[color:white] mr-2" onClick={() => window.location.reload()}>
      Change track
    </button>
    <button className="text-xs text-[color:white] ml-2" onClick={() => signOut()}>
      Sign Out
    </button>
  </div>
</div>
      :

      <div>
        <button onClick={() => signIn()} className="text-[color:white]"> Sign in </button>
      </div>
    )

  }