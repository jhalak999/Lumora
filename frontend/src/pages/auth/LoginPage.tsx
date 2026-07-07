import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">

      {/* Background glow */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <section className="relative z-10 flex w-full max-w-6xl items-center justify-between gap-20">

        <div className="hidden max-w-xl lg:block">

          <h2 className="mb-6 text-6xl font-bold tracking-tight text-foreground">
            Lumora
          </h2>

          <p className="text-xl leading-9 text-muted-foreground">
            Transform ideas into professional AI-powered video campaigns.
            Research, script, visuals, SEO and publishing — all in one workspace.
          </p>

        </div>

        <LoginForm />

      </section>

    </main>
  );
}