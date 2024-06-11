"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { MatchType } from "@prisma/client";

type MatchProps = {
  playerScore: number;
  opponentScore: number;
  date: Date;
  type: MatchType;
};

export const createMatch = async ({
  playerScore,
  opponentScore,
  date,
  type,
}: MatchProps) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userDb = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userDb) {
    return null;
  }

  const match = await db.match.create({
    data: {
      playerScore,
      opponentScore,
      date,
      type,
      result: playerScore > opponentScore ? "Victoria" : "Derrota",
      playerId: userId,
      points: playerScore > opponentScore ? 3 : 0,
    },
  });

  return match;
};
