"use client";

import { Avatar } from "@heroui/react";

function initialsFromUser(name, email) {
  const text = (name && String(name).trim()) || email || "?";
  return text.slice(0, 2).toUpperCase();
}

/** Shows session `user.image` (e.g. Google) when present; otherwise initials. */
export default function UserAvatar({ user, size = "sm", className }) {
  const photo = user?.image || user?.picture;
  const initials = initialsFromUser(user?.name, user?.email);

  return (
    <Avatar color="accent" size={size} className={className}>
      {photo ? (
        <Avatar.Image src={photo} alt="" referrerPolicy="no-referrer" />
      ) : null}
      <Avatar.Fallback>{initials}</Avatar.Fallback>
    </Avatar>
  );
}
