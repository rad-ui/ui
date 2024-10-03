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

const Playground = () => {
    return (
        <div className='text-gray-900 p-8'>
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
            <QuotePlayground/>
        </div>
    );
    }

export default Playground