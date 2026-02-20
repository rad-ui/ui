export interface Sponsor {
  name: string
  logo: string
  description: string
  websiteUrl: string
  logoAlt?: string
  logoWidth?: number
  logoHeight?: number
}

export const sponsors: Sponsor[] = [
  {
    name: "CodeRabbit",
    logo: "/sponsorship/code_rabbit_light.png",
    description: "CodeRabbit is an AI-powered code review assistant that helps development teams catch bugs, security issues, and code quality problems before they reach production.",
    websiteUrl: "https://coderabbit.ai/",
    logoAlt: "CodeRabbit",
    logoWidth: 200,
    logoHeight: 80
  },
  {
    name: "BrowserStack",
    logo: "/sponsorship/browserstack_light.png",
    description: "BrowserStack provides instant access to 3000+ real devices and browsers for testing. Their platform helps developers ensure their applications work seamlessly across all devices and browsers.",
    websiteUrl: "https://www.browserstack.com/",
    logoAlt: "BrowserStack",
    logoWidth: 200,
    logoHeight: 80
  }
]
