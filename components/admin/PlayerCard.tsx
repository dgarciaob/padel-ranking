import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface PlayerCardUser {
  id: string;
  firstName: string;
  lastName: string;
  points: number;
  imageUrl: string;
  lastResults: string[];
}

type PlayerCardProps = {
  ranking: number;
  user: PlayerCardUser | null;
  totalPoints: number;
  avatarFallback: string;
  isActiveUser: boolean;
};

const PlayerCard = async ({
  ranking,
  user,
  totalPoints,
  avatarFallback,
  isActiveUser,
}: PlayerCardProps) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between my-4">
        <div className="flex flex-row space-x-4 items-center">
          <div className="relative">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            {isActiveUser && (
              <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border border-white" />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-base font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-slate-400">
              {user?.lastResults.join(" - ")}
            </p>
          </div>
        </div>

        <div className="flex flex-row space-x-4 items-center">
          <p className="text-base text-slate-400">{totalPoints}</p>
          <span
            className={cn(
              "font-medium rounded-full h-8 w-8 p-2 flex items-center justify-center",
              ranking === 1
                ? "bg-emerald-500 text-white"
                : "bg-slate-100 text-black"
            )}
          >
            {ranking}
          </span>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default PlayerCard;
