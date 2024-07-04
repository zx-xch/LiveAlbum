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
  redirectUri: 'https://live-album.vercel.app/api/auth/callback/spotify'
});

export default function Home() {

  const { data: sessionData, status } = useSession();
  const [session, setSession] = useState(sessionData);

  const [currentTrack, setCurrentTrack] = useState<any | null>(null)
  const [tracksSet, setTracksSet] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);


  spotifyApi.setAccessToken(session?.accessToken as string);

  useEffect(() => {
    const interval = setInterval(() => {
      if (session?.accessToken && !tracksSet ) {
        spotifyApi.getMyCurrentPlayingTrack()
.then(function(data) {

      let currentTrack = data.body.item;
      setCurrentTrack(currentTrack);
      setTracksSet(true)
      console.log(currentTrack)

    }, function(err) {
      console.log('Something went wrong!', err);
    });
      }
    }, 5000);

    return () => clearInterval(interval);
  }
  , [session]);
  
    return (
      session ? 

      <div className="relative flex flex-col h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden">
  <div className="absolute inset-0">
    <Image 
      src={currentTrack ? currentTrack?.album?.images[0]?.url : 'https://i.scdn.co/image/ab6761610000e5ebd77c094a3b11b8cebad34ff4'} 
      className="h-full w-full object-cover opacity-50 blur-sm"
      alt="" 
      layout="fill"
    />
  </div>
  
  <div className="relative flex-grow flex items-center justify-center z-10">
    <div className="text-center text-white max-w-2xl px-4">
      <blockquote className="text-3xl text-[color:white] font-bold mb-4">
        {currentTrack && currentTrack?.name}
      </blockquote>
      <div className="text-lg text-[color:white]">
        <p className="mb-2 text-[color:white]">
          {currentTrack && currentTrack?.artists[0]?.name}
        </p>
      </div>
    </div>
  </div>
  
  <div className="relative z-10 flex justify-center p-4 bg-black bg-opacity-30">
    <button className="text-xs text-[color:white]" onClick={() => signOut()}>
      Sign Out
    </button>
  </div>
</div>
      :

      <div>
        

        <div className="relative flex flex-col h-screen w-full bg-cover bg-center bg-no-repeat overflow-hidden">
  
  <div className="relative flex-grow flex items-center justify-center z-10">
    <div className="text-center text-white max-w-2xl px-4">
      <blockquote className="text-3xl text-[color:white] font-bold mb-4">
        <button onClick={() => signIn()}>Sign in</button>
      </blockquote>

    </div>
  </div>
  

</div>


      </div>
      
    )

  }