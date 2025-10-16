import LoginForm from "./_components/LoginForm";

export default function Page() {
  return (
    <section className="bg-gradient-to-b from-green-600 via-green-500 to-green-100">
      <div className="px-4 py-[52px] md:px-0 md:py-[70px] lg:py-[100px]">
        <LoginForm />
      </div>
    </section>
  );
}
