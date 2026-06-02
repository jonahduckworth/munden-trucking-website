"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Facebook,
  Linkedin,
  Mail,
  MessageSquare,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type BlogShareButtonsProps = {
  title: string;
  excerpt: string;
  url: string;
};

export default function BlogShareButtons({
  title,
  excerpt,
  url,
}: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encoded = useMemo(
    () => ({
      title: encodeURIComponent(title),
      excerpt: encodeURIComponent(excerpt),
      url: encodeURIComponent(url),
      sms: encodeURIComponent(`${title} ${url}`),
    }),
    [excerpt, title, url],
  );

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        copyWithTemporaryInput(url);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      copyWithTemporaryInput(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  const shareLinks = [
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encoded.title}&body=${encoded.excerpt}%0A%0A${encoded.url}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`,
    },
    {
      label: "X",
      icon: Share2,
      href: `https://twitter.com/intent/tweet?text=${encoded.title}&url=${encoded.url}`,
    },
    {
      label: "Text",
      icon: MessageSquare,
      href: `sms:?&body=${encoded.sms}`,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2" aria-label="Share article">
      {shareLinks.map(({ label, icon: Icon, href }) => (
        <Button key={label} variant="outline" size="sm" asChild>
          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
            <Icon className="h-4 w-4" />
            {label}
          </a>
        </Button>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={copyLink}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

function copyWithTemporaryInput(value: string) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}
