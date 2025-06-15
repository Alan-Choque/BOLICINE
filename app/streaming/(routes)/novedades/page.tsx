import { auth } from "@/auth";
import { Navbar } from "@/components/Shared/Navbar";
import { getMovies } from "@/data/movies";
import { redirect } from "next/navigation";
import { TrendingGrid } from "./components/TrendingGrid";
// import { getUserProfiles } from "@/lib/data/users";

export default async function NovedadesPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");
    
    // const userProfiles = await getUserProfiles(session.user.id);
    const trendingContent = await getMovies({ isTrending: true });

    return (
        <div className="bg-zinc-900 min-h-screen text-white">
            <Navbar users={[]} /> {/* Reemplaza con tus userProfiles */}
            <main className="px-4 md:px-12 py-24">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Novedades Populares</h1>
                {trendingContent.length > 0 ? (
                    <TrendingGrid trendingContent={trendingContent} />
                ) : (
                    <p>No hay novedades en este momento.</p>
                )}
            </main>
        </div>
    );
}