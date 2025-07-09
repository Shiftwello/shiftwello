import React from "react";
import { useAuth } from "../context/AuthContext";

export default function UserStatus() {
  const { user } = useAuth();

  if (!user) return <p>No user logged in</p>;

  return (
    <div>
      <p>Logged in as: {user.full_name} ({user.username})</p>
      <p>Role ID: {user.role_id}</p>
    </div>
  );
}