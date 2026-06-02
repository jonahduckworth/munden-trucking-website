"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function BlogSubscribeForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/blog-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          company: formData.get("company"),
          website: formData.get("website"),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to subscribe right now.");
      }

      setStatus("success");
      setMessage("Thanks. You are on the blog update list.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.4fr_auto]">
        <Input
          name="name"
          type="text"
          placeholder="Name"
          autoComplete="name"
          className="h-11 bg-background"
        />
        <Input
          name="company"
          type="text"
          placeholder="Company"
          autoComplete="organization"
          className="h-11 bg-background"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          required
          className="h-11 bg-background"
        />
        <Button type="submit" className="h-11" disabled={status === "loading"}>
          <Mail className="h-4 w-4" />
          {status === "loading" ? "Joining" : "Subscribe"}
        </Button>
      </div>
      {message && (
        <p
          className={
            status === "error"
              ? "text-sm font-medium text-destructive"
              : "text-sm font-medium text-munden-burgundy"
          }
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
