import Menu from "./menu/components/Menu";

export default function Home() {
    const screenSliceStyles = "border-1 border-gray-200 rounded-lg bg-white p-4"

    return (
        <div className="px-4 pb-4 h-screen font-sans flex flex-col bg-neutral-50">
            <header className="bg-amber-200 rounded-b-lg text-center select-none">
                Demo Software
            </header>

            <main className="mt-4 mx-auto flex flex-row flex-grow w-full overflow-hidden gap-x-4">
                <div className={`w-64 ${screenSliceStyles}`}>
                    <Menu />
                </div>
                <div className="flex flex-grow gap-x-4">
                    <div className={`w-1/2 ${screenSliceStyles}`}>todo</div>
                    <div className={`w-1/2 ${screenSliceStyles}`}>todo</div>
                </div>
            </main>
        </div>
    )
}