import { onAuthenticateUser } from "@/actions/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  if (role == "/admin") return redirect(`/admin`);

  const afterSignIn = await onAuthenticateUser();
  if (
    (afterSignIn.status === 200 || afterSignIn.status === 201) &&
    role === "admin"
  ) {
    return redirect(`/admin`);
  }

  if (
    afterSignIn.status === 403 ||
    afterSignIn.status === 400 ||
    afterSignIn.status === 500
  )
    return redirect("/auth/sign-in");
};

export default AuthCallbackPage;
