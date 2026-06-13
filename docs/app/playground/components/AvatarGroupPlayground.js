'use client'

import AvatarGroup from "@radui/ui/AvatarGroup"
import ColorLooper from "../helpers/ColorLooper"

const AvatarGroupPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="AvatarGroup"
            docsLink="/docs/components/avatar-group"
            description="Compact grouped avatars for teams, activity lists, and participant summaries."
        >
            <div className='flex flex-wrap items-center gap-8'>
                <AvatarGroup.Root size="large">
                    <AvatarGroup.Item>
                        <AvatarGroup.Avatar src="https://i.pravatar.cc/64?img=15" alt="Nina" />
                        <AvatarGroup.Fallback>NI</AvatarGroup.Fallback>
                    </AvatarGroup.Item>
                    <AvatarGroup.Item>
                        <AvatarGroup.Avatar src="https://i.pravatar.cc/64?img=28" alt="Omar" />
                        <AvatarGroup.Fallback>OM</AvatarGroup.Fallback>
                    </AvatarGroup.Item>
                    <AvatarGroup.Item>
                        <AvatarGroup.Avatar src="https://i.pravatar.cc/64?img=44" alt="Maya" />
                        <AvatarGroup.Fallback>MY</AvatarGroup.Fallback>
                    </AvatarGroup.Item>
                </AvatarGroup.Root>
                <AvatarGroup.Root size="small" variant="square">
                    <AvatarGroup.Item>
                        <AvatarGroup.Fallback>RU</AvatarGroup.Fallback>
                    </AvatarGroup.Item>
                    <AvatarGroup.Item>
                        <AvatarGroup.Fallback>PK</AvatarGroup.Fallback>
                    </AvatarGroup.Item>
                    <AvatarGroup.Item>
                        <AvatarGroup.Fallback>AN</AvatarGroup.Fallback>
                    </AvatarGroup.Item>
                </AvatarGroup.Root>
            </div>
        </ColorLooper>
    </div>
)

export default AvatarGroupPlayground
