"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./LoginForm.form";
import { useState } from "react";
import { FormError } from "./FormError";
import { login } from "@/actions/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export function LoginForm() {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check-auth");
        const data = await res.json();

        if (data.loggedIn) {
          router.push("/streaming/profiles");
        }
      } catch (err) {
        console.error("Error al verificar login", err);
        router.push("/streaming/login");
      }
    };

  checkAuth();
  }, []);
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      login(values).then((data) => {
          setError(data?.error);
          if (data?.success) {
            toast.success("Login se ha realizado con éxito");
            router.push("/profiles");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full gap-4 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Correo electrónico"
                  {...field}
                  className="h-14 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Contraseña"
                  {...field}
                  type="password"
                  className="h-14 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />

        <Button type="submit" className="w-full bg-[#E50914]">
          Iniciar sesión
        </Button>
      </form>
    </Form>
  );
}
