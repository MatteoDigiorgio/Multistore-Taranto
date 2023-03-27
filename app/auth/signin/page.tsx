import Link from "next/link";
import Image from "next/image";
import "app/(main)/global.css";
import SignInButton from "./SignInButton";

export default function SignIn() {
  const MultistoreLogo = () => {
    return (
      <div className="flex-grow justify-center items-center my-2 mx-4 sm:flex-grow-0">
        <Link title="Home" passHref href="/">
          <Image
            alt="Multistore Taranto Logo"
            src="/multistore_big.png"
            width={100}
            height={50}
            className="object-contain cursor-pointer "
          />
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="relative m-auto bg-green">
        <div className="flex items-center justify-center grow py-2 h-20 bg-multistore_green">
          <MultistoreLogo />
        </div>
        <div className="rounded-md box-border w-64 h-full p-6 mt-20 mx-auto border">
          <h1 className="pb-4 cursor-text text-3xl">Sign In</h1>
          <div>
            <SignInButton />
          </div>
        </div>
      </div>
    </>
  );
}
