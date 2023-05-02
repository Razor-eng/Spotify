import { getProviders, signIn } from "next-auth/react"

function Login({ providers }) {
    return (
        <div className="flex flex-col items-center h-full bg-[#1db954] gap-5 min-h-screen w-full justify-center">
            <img src="/Spotify.png" alt="" className=" h-20" />

            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="bg-black text-[#49f585] py-4 px-20 text-xl cursor-pointer border-none rounded-full"
                        onClick={() => signIn(provider.id, { callbackUrl: "/" })}>Login with {provider.name}</button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        }
    }
}
