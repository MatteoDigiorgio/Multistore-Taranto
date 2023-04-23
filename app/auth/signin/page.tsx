import "app/(main)/global.css";
import SignInButton from "./SignInButton";

export default function SignIn() {
  return (
    <>
      <div className="relative m-auto">
        <div className="rounded-md box-border w-64 h-full p-6 mx-auto border">
          <h1 className="pb-4 cursor-text text-3xl">Sign In</h1>
          <div>
            <SignInButton />
          </div>
        </div>
      </div>
    </>
  );
}
