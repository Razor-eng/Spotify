import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'
import Head from 'next/head';
import Player from '../components/Player';
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function Home() {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  const url = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    console.log("redrecting");
    url.pathname = '/login'
    return NextResponse.redirect(url);
  }
  return (
    <>
      <Head>
        <title>Spotify</title>
      </Head>
      <div className='bg-black h-screen overflow-hidden '>
        <main className='flex'>
          <Sidebar />
          <Center />
        </main>

        {/* <div className=' sticky bottom-0'>
          <Player />
        </div> */}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }
}

