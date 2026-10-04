'use client'

import Text from "@radui/ui/Text"
import Matrix from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const elements = ["p", "span", "div", "label"].map((element) => ({ key: element, label: element, value: element }))

const TextPlayground = () => (
    <PlaygroundSection title="Text" docsLink="/docs/components/text" description="Body text rendered as each supported element.">
        <Matrix
            rows={elements}
            columns={[{ key: "sample" }]}
            align="top"
            renderCell={(element) => (
                <Text as={element.value} className="max-w-xl">
                    Start with readable defaults, then layer visual treatment on top.
                </Text>
            )}
        />
    </PlaygroundSection>
)

export default TextPlayground
