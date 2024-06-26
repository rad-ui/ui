import React from 'react'

import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'Table'

const TableRoot = ({
  children,
  className = '',
  customRootClass = '',
  ...props
}: any) => {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

  // Its important to wrap the table in a div with the class 'rad-ui-table' so that the table can be styled properly
  // so we created a new class for <table> element as a one off case in pattern when it comes to naming classes/conventions
  // this is because we cant style the table element directly, so we'll need to wrap it in a div and style it instead

  return (
    <div className={`${rootClass}-wrapper ${className}`} {...props}>
      {/* Todo: need to break this down into its own wrapper component */}
      <table className={rootClass}>{children}</table>
    </div>
  )
}

export default TableRoot
