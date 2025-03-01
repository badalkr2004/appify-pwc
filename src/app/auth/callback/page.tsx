import { onAuthenticateUser } from "@/actions/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const afterSignIn = await onAuthenticateUser();

  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;

  if (
    (afterSignIn.status === 200 || afterSignIn.status === 201) &&
    role === "admin"
  ) {
    return redirect(`/admin`);
  }
  if (!role) {
    return redirect(`/`);
  }
  if (
    afterSignIn.status === 403 ||
    afterSignIn.status === 400 ||
    afterSignIn.status === 500
  )
    return redirect("/auth/sign-in");
};

export default AuthCallbackPage;
