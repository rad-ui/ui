const PAGE_NAME = 'BADGE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"


import BlockQuote from "@radui/ui/BlockQuote"
import Text from "@radui/ui/Text"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"


const BlockQuoteDocs = () => {
    return <div>
        <Documentation currentPage={PAGE_NAME} title='BlockQuote' description={`
            BlockQuote is used to display a quote.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='bg-gray-100 p-10 rounded shadow space-y-4 text-gray-1000'>
                    <BlockQuote color="green" className="space-x-2" >When my time comes, forget the wrong that I've done.
                        <br />
                        Help me leave behind some reasons to be missed.
                        <br />
                        Don't resent me and when you're feeling empty, keep me in your memory.
                        <br />
                        Leave out all the rest, leave out all the rest.
                    </BlockQuote>
                    {/* <div>
                        <Text>
                            BlockQuotes are used to display a quote.
                        </Text>
                    </div> */}

                </div>
            </Documentation.ComponentHero>

        </Documentation>
    </div>
}

export default BlockQuoteDocs;