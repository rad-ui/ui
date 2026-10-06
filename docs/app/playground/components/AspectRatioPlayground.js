'use client'

import AspectRatio from "@radui/ui/AspectRatio"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const AspectRatioPlayground = () => (
    <div>
        <PlaygroundSection
            title="AspectRatio"
            docsLink="/docs/components/aspect-ratio"
            description="Fixed-ratio media containers."
        >
            <Matrix
                rows={[{ key: "ratio", label: "ratio" }]}
                columns={["16/9", "4/3", "1/1"].map((ratio) => ({ key: ratio, label: ratio, value: ratio }))}
                renderCell={(_, column) => (
                    <div className="w-48">
                        <AspectRatio ratio={column.value} className="overflow-hidden rounded-lg border border-gray-300 bg-gray-200">
                            <img
                                src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Mountain landscape"
                                className="h-full w-full object-cover"
                            />
                        </AspectRatio>
                    </div>
                )}
            />
        </PlaygroundSection>
    </div>
)

export default AspectRatioPlayground
