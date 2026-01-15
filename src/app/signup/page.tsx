import SignUpForm from "@/components/common/SignUpForm";
import { getAuth } from "@/lib/auth/getAuth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { isLoggedIn } = await getAuth();
  if (isLoggedIn) redirect("/favories");

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-600 via-green-500 to-green-100 px-4 py-[52px] md:px-0 md:py-[70px] lg:py-[100px]">
      <SignUpForm />
    </section>
  );
}
