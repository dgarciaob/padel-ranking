import LastMatches from "@/components/admin/LastMatches";
import Leaderboard from "@/components/admin/Leaderboard";
import { ResultModal } from "@/components/admin/ResultModal";

const DashboardPage = () => {
  return (
    <main className="mx-auto max-w-7xl px-8 md:px-16 mt-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-normal">Ranking</h1>
        <ResultModal />
      </div>
      <Leaderboard />

      {/* <h2 className="text-2xl font-semibold tracking-normal mt-12 md:mt-20">
        Mis Partidos
      </h2>
      <LastMatches /> */}
    </main>
  );
};

export default DashboardPage;
