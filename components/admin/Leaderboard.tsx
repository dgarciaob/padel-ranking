import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

import PlayerCard from "./PlayerCard";

const Leaderboard = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await currentUser(); // usuario de la sesion loggeada. solo usar user para firstName, lastName e imgUrl

  // datos del usuario de la sesion loggeada. No uso el user de mi base de datos pq no tiene el imgUrl
  const firstNameFirstLetter = user?.firstName?.slice(0, 1);
  const lastNameFirstLetter = user?.lastName?.slice(0, 1);
  const avatarFallback = `${firstNameFirstLetter}${lastNameFirstLetter}`;

  const matchResults = await db.match.findMany({
    orderBy: {
      date: "desc",
    },
  });

  const allUsers = await db.user.findMany({
    include: {
      matches: true,
    },
  });

  const usersWithPoints = await Promise.all(
    allUsers.map(async (user) => {
      const clerkUser = await currentUser();
      const lastResults = user.matches
        .slice(-3)
        .map((match) => (match.result === "Victoria" ? "V" : "D"));
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        points: user.matches.reduce(
          (acc, match) => acc + (match.result === "Victoria" ? 3 : 0),
          0
        ),
        imageUrl: clerkUser?.imageUrl || "",
        lastResults,
      };
    })
  );

  return (
    <div className="mt-8 overflow-y-auto max-h-96 rounded-xl border border-slate-200 px-8 pt-2 pb-0">
      {matchResults.length > 0 ? (
        usersWithPoints.map((player, idx) => {
          const playerTotalPoints = player.points;
          const playerRanking = idx + 1;
          return (
            <PlayerCard
              key={player.id + idx}
              ranking={playerRanking}
              user={player}
              avatarFallback={avatarFallback}
              totalPoints={playerTotalPoints}
              isActiveUser={player.id === userId}
            />
          );
        })
      ) : (
        <div className="flex items-center justify-center h-24">
          <p className="text-slate-400 text-base text-center">
            Todavía no hay resultados. Agrega uno para empezar
          </p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
