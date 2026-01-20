import { Button } from "./ui/button";
import { GithubIcon, Mail } from "lucide-react";

function OAuth2Buttons() {

  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full flex gap-2 py-5 sm:py-6 text-sm sm:text-base"
        onClick={() => {
          console.log("VITE_BASE_URL: ", baseUrl);

          window.location.href =
            `${baseUrl}/oauth2/authorization/google`;
        }}
      >
        <Mail className="w-5 h-5" />
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="w-full flex gap-2 py-5 sm:py-6 text-sm sm:text-base"
        onClick={() => {
          console.log("VITE_BASE_URL: ", baseUrl);

          window.location.href =
            `${baseUrl}/oauth2/authorization/github`;
        }}
      >
        <GithubIcon className="w-5 h-5" />
        Continue with GitHub
      </Button>
    </div>
  );
}

export default OAuth2Buttons;
