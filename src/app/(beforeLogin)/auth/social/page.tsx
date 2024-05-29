import { cookies } from "next/headers";
import { getUserInfo } from "./_lib/getUserInfo";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SocialRedirectPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("AccessToken")?.value!;
  const refreshToken = cookieStore.get("RefreshToken")?.value!;
  const csrfToken = cookieStore.get("authjs.csrf-token")?.value!;
  const pk = cookieStore.get("Pk")?.value!;

  const session = await auth();

  // console.log({ accessToken, refreshToken, csrfToken });

  const user = await getUserInfo(accessToken, pk);

  // console.log({ user });

  if (csrfToken) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/auth/session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `authjs.csrf-token=${csrfToken}`,
        },
        body: JSON.stringify({
          csrfToken: csrfToken?.split("|")[0],
          user: {
            name: user.nickname,
            email: user.email,
            image: user.profileImage,
          },
        }),
      }
    );

    // console.log({ response });
  }

  // console.log({ session });

  // redirect("/auth/social/c");

  return <div>Redirecting...</div>;
}
