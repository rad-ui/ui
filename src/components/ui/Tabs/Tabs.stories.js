import Tabs from './Tabs';
import SandboxEditor from '@/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Navigation/Tabs',
    component: Tabs,
    render: (args) => <SandboxEditor>
        <div >
            <Tabs {...args} />
        </div>
    </SandboxEditor>,
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
        tabs: [{
            label: 'Tab 1',
            value: 'tab1',
            content: `Following the success of Hybrid Theory and Reanimation, Linkin Park spent a significant amount of time touring around the United States. The band members began to work on new material amidst their saturated schedule, spending a sliver of their free time in their tour bus's studio.[34] The band officially announced the production of a new studio album in December 2002, revealing their new work was inspired by the rocky region of Meteora in Greece, where numerous monasteries have been built on top of the rocks.[35] Meteora features a mixture of the band's nu metal and rap metal style with newer innovative effects, including the induction of a shakuhachi (a Japanese flute made of bamboo) and other instruments`,

        },
        {
            label: <div>Tab 2</div>,
            value: 'tab2',
            content: <div className='text-gray-1000'>
                { `Linkin Park was founded by three high school friends: Mike Shinoda, Rob Bourdon, and Brad Delson.[6][7] The three attended Agoura High School in Agoura Hills, California, a suburb of Los Angeles.[6][7] After graduating from high school, the three began to take their musical interests more seriously, recruiting Joe Hahn, Dave "Phoenix" Farrell, and Mark Wakefield to perform in their band, then called Xero. Though limited in resources, the band began recording and producing songs within Shinoda's makeshift bedroom studio in 1996, resulting in a four-track demo album, entitled Xero, released in November 1997.[6][8] Delson introduced the band to Jeff Blue, the vice president of A&R for Zomba Music, whom he had interned for in college.[9][10] Blue offered the band constructive criticism to catch the attention of record labels. Blue himself was impressed with Xero after watching them play a live show in 1998, but believed the band needed a different vocalist.[9][10] Tensions and frustration within the band grew after they failed to land a record deal.[6] The lack of success and stalemate in progress prompted Wakefield, at that time the band's vocalist, to leave the band in search of other projects.[6][8] Farrell also left to tour with Tasty Snax, a Christian punk and ska band.`}
            </div>,
        },

        ],
    },
};
