"use client";

import { useState } from "react";
import Image from "next/image";
import { getInitials, type TeamMember } from "@/lib/team";
import { cn } from "@/lib/cn";

/** Circular team avatar: photo when available, initials-on-gradient otherwise. */
export function TeamAvatar({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(member.photo) && !failed;

  return (
    <span
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full text-white",
        className,
      )}
    >
      {showPhoto ? (
        <Image
          src={member.photo as string}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="64px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <span
            className={cn("absolute inset-0 bg-gradient-to-b", member.gradient)}
            aria-hidden
          />
          <span className="relative text-lg font-semibold">{getInitials(member.name)}</span>
        </>
      )}
    </span>
  );
}
