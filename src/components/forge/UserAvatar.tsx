import { users } from "@/lib/mock-data";

export function UserAvatar({ userId, size = "sm" }: { userId: string; size?: "sm" | "md" }) {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;
  const dim = size === "md" ? "w-6 h-6 text-[10px]" : "w-5 h-5 text-[9px]";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-medium ring-1 ring-background`}
      style={{ backgroundColor: user.color, color: "white" }}
      title={user.name}
    >
      {user.initials}
    </div>
  );
}

export function AvatarStack({ userIds }: { userIds: string[] }) {
  return (
    <div className="flex -space-x-1.5">
      {userIds.map((id) => (
        <UserAvatar key={id} userId={id} />
      ))}
    </div>
  );
}
