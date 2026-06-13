import DashboardDemo from "../showcase/helpers/DashboardDemo"
import { CheckCircle2 } from "lucide-react"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

export const metadata = {
    title: "Showcase Dashboard",
    description: "A dashboard UI showcase demo built with Rad UI components.",
}

const ShowcaseDashboardPage = () => {
    return (
        <div className="min-h-full px-3 py-3 text-slate-1000 sm:px-4 lg:px-5">
            <div className="mx-auto max-w-[1520px]">
                <div className="mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <Text className="mb-2 uppercase tracking-[0.35em] !text-[11px] text-slate-1000/45">
                            Showcase
                        </Text>
                        <Heading as="h4" className="!text-slate-1000">
                            Dashboard Demo
                        </Heading>
                        <Text className="mt-1 max-w-2xl !text-base text-slate-1000/60">
                            A Rad UI-based dashboard route inspired by the shadcn example, adapted to the
                            docs app shell and visual language.
                        </Text>
                    </div>
                    <div className="flex items-center gap-2 self-start rounded-full border border-slate-400 bg-slate-100 px-2.5 py-1 backdrop-blur-sm sm:self-auto">
                        <CheckCircle2 className="h-4 w-4 text-green-1000" />
                        <Text className="!text-xs text-slate-1000/70">New route: /showcase-dashboard</Text>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-[32px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-300/10" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-1000/5 to-transparent" />
                    <div className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-green-300/10 blur-3xl" />
                    <div className="relative">
                        <DashboardDemo />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowcaseDashboardPage
