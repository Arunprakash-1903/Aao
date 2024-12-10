
import { signIn } from "next-auth/react";


export default function ContinueWithGoogleButton() {
  const handleGoogleSignIn = () => {
    signIn("google")
   // const router = useRouter()
    window.location.href="/v2024"
    
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

// Google Icon Component
function GoogleIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.7 1.2 9.2 3.6l6.9-6.9C36.3 2.8 30.4 0 24 0 14.6 0 6.7 5.8 3.1 14.1l8 6.2C12.8 13.6 18 9.5 24 9.5z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.1 0 11.4-2.1 15.1-5.8l-7.2-5.7C29.7 38.5 27 39.5 24 39.5c-6 0-11.1-4.1-12.8-9.7l-8.1 6.2C6.5 42.3 14.7 48 24 48z"
      />
      <path
        fill="#4A90E2"
        d="M48 24c0-1.6-.2-3.3-.5-4.8H24v9.1h13.6c-.7 3.6-2.9 6.6-6.1 8.6l7.2 5.7C43.4 38.2 48 31.7 48 24z"
      />
      <path
        fill="#FBBC05"
        d="M3.2 14.1C1.2 18.2 0 22.9 0 27.5s1.2 9.3 3.2 13.4l8.1-6.2c-1.5-3.6-2.3-7.5-2.3-11.5s.8-7.9 2.3-11.5l-8.1-6.2z"
      />
    </svg>
  );
}
