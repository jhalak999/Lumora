import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema, type LoginFormValues } from "@/lib/validators";
import { useLogin } from "@/hooks/useLogin";
import { setTokens } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
    const loginMutation = useLogin();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = async (data: LoginFormValues) => {
    try {
        const tokens = await loginMutation.mutateAsync(data);

        setTokens(
        tokens.access_token,
        tokens.refresh_token,
        );

        toast.success("Welcome back!");

        navigate("/dashboard");
    } catch {
        toast.error("Invalid email or password.");
    }
    };
  return (
    <Card className="w-full max-w-md rounded-3xl border border-border bg-card/90 shadow-2xl backdrop-blur-xl">

        <CardContent className="space-y-8 p-8">

        <div className="space-y-2">

            <h1 className="text-4xl font-bold tracking-tight">
                Welcome back
            </h1>

            <p className="text-muted-foreground">
                Sign in to continue building with Lumora.
            </p>

        </div>

        <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        >

            <div className="space-y-2">
            <Label>Email</Label>

            <Input
                className="h-12 rounded-xl"
                placeholder="name@example.com"
                {...register("email")}
            />
            {errors.email && (
                <p className="text-sm text-destructive">
                    {errors.email.message}
                </p>
            )}
            </div>

            <div className="space-y-2">
            <Label>Password</Label>

            <Input
                type="password"
                className="h-12 rounded-xl"
                placeholder="••••••••"
                {...register("password")}
            />
            {errors.password && (
                <p className="text-sm text-destructive">
                    {errors.password.message}
                </p>
            )}
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl"
            >
                Sign In
            </Button>

            <div className="pt-2 text-center text-sm text-muted-foreground">

                Don't have an account?

                <button
                    className="ml-2 font-semibold text-primary transition hover:underline"
                >
                    Create one
                </button>

            </div>

        </form>

        </CardContent>

    </Card>
  );
}