import React from 'react'
import Modal from './Modal'
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor'


export default {
  title: 'UI/Data Display/Modal',
  component: Modal
}

const Template = (args) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <SandboxEditor>
      <Modal open={isOpen} onClose={onClose}>
        <button onClick={toggle} className="bg-green-500 p-2">
          Trigger
        </button>
      </Modal>
    </SandboxEditor>
};

export const All = Template.bind({})
