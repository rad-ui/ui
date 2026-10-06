import PlaygroundSection from "../helpers/PlaygroundSection"

import Quote from "@radui/ui/Quote"

const QuotePlayground = () => (
    <div>
        <PlaygroundSection
            title="Quote"
            docsLink="/docs/components/quote"
            description="Inline quotation for short cited phrases within running text."
        >
            <Quote className="text-gray-1000">And the time's come to realize there will be Promises I can't Keep</Quote>
        </PlaygroundSection>
    </div>
)

export default QuotePlayground
