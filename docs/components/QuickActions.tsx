'use client'
import { useState } from 'react'
import Button from '@radui/ui/Button'
import Card from '@radui/ui/Card'
import Text from '@radui/ui/Text'
import { Copy, ExternalLink, Github, MessageCircle, Star } from 'lucide-react'

const QuickActions = () => {
  const [copied, setCopied] = useState(false)
  
  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm install @radui/ui')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const actions = [
    {
      icon: <Copy className="w-4 h-4" />,
      label: 'Copy Install Command',
      action: copyInstallCommand,
      variant: 'outline' as const
    },
    {
      icon: <ExternalLink className="w-4 h-4" />,
      label: 'Open Playground',
      action: () => window.open('/playground', '_blank'),
      variant: 'outline' as const
    },
    {
      icon: <Github className="w-4 h-4" />,
      label: 'View on GitHub',
      action: () => window.open('https://github.com/rad-ui/ui', '_blank'),
      variant: 'outline' as const
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      label: 'Join Discord',
      action: () => window.open('https://discord.gg/nMaQfeEPNp', '_blank'),
      variant: 'outline' as const
    },
    {
      icon: <Star className="w-4 h-4" />,
      label: 'Star on GitHub',
      action: () => window.open('https://github.com/rad-ui/ui', '_blank'),
      variant: 'solid' as const,
      color: 'green' as const
    }
  ]
  
  return (
    <Card className="p-6 border border-gray-200">
      <Text className="font-semibold text-gray-1000 mb-4">Quick Actions</Text>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            color={action.color}
            size="small"
            onClick={action.action}
            className="w-full justify-start gap-2"
          >
            {action.icon}
            {action.label === 'Copy Install Command' && copied ? 'Copied!' : action.label}
          </Button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <Text className="text-sm text-gray-600 mb-2">Install Rad UI</Text>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-sm bg-white px-2 py-1 rounded border">
            npm install @radui/ui
          </code>
          <Button
            variant="ghost"
            size="small"
            onClick={copyInstallCommand}
            className="p-1"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default QuickActions
