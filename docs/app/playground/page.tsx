import ButtonPlayground from "./components/ButtonPlayground"
import AvatarPlayground from "./components/AvatarPlayground"
import BadgePlayground from "./components/BadgePlayground"
import BlockquotePlayground from "./components/BlockquotePlayground"
import CodePlayground from "./components/CodePlayground"
import HeadingPlayground from "./components/HeadingPlayground"
import EmPlayground from "./components/EmPlayground"
import SeparatorPlayground from "./components/SeparatorPlayground"
import LinkPlayground from "./components/LinkPlayground"
import TextPlayground from "./components/TextPlayground"
import QuotePlayground from "./components/QuotePlayground"
import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'


const Playground = () => {
    return (
        <FullHeightScroll>
            <div className='text-gray-1000 p-8'>
                <AvatarPlayground/>
                <BadgePlayground/>
                <ButtonPlayground/>
                <BlockquotePlayground/>
                <CodePlayground/>
                <HeadingPlayground/>
                <EmPlayground/>
                <SeparatorPlayground/>
                <LinkPlayground/>
                <TextPlayground/>
                {/* <QuotePlayground />  TODO: This is not working - Once its added back to package we can uncomment this */}
            </div>
        </FullHeightScroll>

    );
    }

export default Playground