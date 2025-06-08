import Image from "next/image";
import SearchView from "./components/search/SearchView";
import { SidebarOption } from "./components/sidebar/Sidebar.types";
import { GlobalAppContextProvider } from "./components/context/GlobalAppContext";
import { Sidebar } from "./components/sidebar/Sidebar";
import { fetchSources } from "./components/fetchers";

export default async function Home() {
  const sources: SidebarOption[] = await fetchSources();

  // TODO have authentication logic happening here and supply the token to the GlobalAppContextProvider
  return (
    <GlobalAppContextProvider initialSources={sources}>
      <div className="flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pl-20 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
        <header className="fixed top-0 left-0 right-0 text-cente z-50">
          <div className="h-fit mx-auto max-w-[calc(100%-1rem)] bg-amber-300 rounded-b-3xl">
            <blockquote className="text-center tracking-wide font-medium text-gray-900 dark:text-white">
              <p>Demo application with 24/hours license</p>            
            </blockquote>
          </div>
        </header>

        <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
          <Image
                    className="dark:invert w-1/5"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                  />

          <SearchView />
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <p className="uppercase text-sm tracking-wide">Made with ❤️ for you</p>
        </footer>
      </div>
    </div>
    </GlobalAppContextProvider>
  );
}