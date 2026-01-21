import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="bg-card text-card-foreground shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-border">
        
        <div className="text-red-500 text-6xl mb-4">⚠️</div>

        <h1 className="text-2xl font-semibold mb-2">
          OAuth Login Failed
        </h1>

        <p className="text-muted-foreground mb-6">
          {error
            ? `Reason: ${error.replaceAll("_", " ")}`
            : "Something went wrong while signing you in. Please try again."}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-border py-2 rounded-lg hover:bg-muted transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OAuthFailure;
