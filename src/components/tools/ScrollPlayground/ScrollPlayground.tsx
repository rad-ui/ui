import React, { useState } from 'react'

import Button from '~/components/ui/Button/Button'

export type ScrollPlaygroundProps = {
  children: React.ReactNode
}
const ScrollPlayground = ({ children }: ScrollPlaygroundProps) => {
  const [scrollable, setScrollable] = useState(false)

  const handleScrollableChange = () => {
    setScrollable((scroll) => !scroll)

    setTimeout(() => {
      const elem = document.getElementById('middle')
      if (elem) {
        elem.scrollIntoView()
      }
    }, 100)
  }

  const SCROLL_BOUNDING_BOX = 200

  return (
    <div
      className="block bg-plum-200 relative p-2 overflow-auto"
      style={{ height: '300px', width: '300px' }}
    >
      <Button onClick={handleScrollableChange}>
        {scrollable ? 'Disable' : 'Enable Scrollable'}
      </Button>
      <div
        className="mt-10"
        style={
          scrollable
            ? {
                height: SCROLL_BOUNDING_BOX * 4,
                width: SCROLL_BOUNDING_BOX * 4
              }
            : {}
        }
      >
        <div
          style={
            scrollable
              ? {
                  marginTop: SCROLL_BOUNDING_BOX * 2,
                  paddingLeft: SCROLL_BOUNDING_BOX * 2
                }
              : {}
          }
        >
          <span id="middle">{children}</span>
        </div>
      </div>
    </div>
  )
}

export default ScrollPlayground
