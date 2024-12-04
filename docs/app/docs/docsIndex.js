const POSTFIX = " | Rad UI";

const DOCS_SEO = {
    "INTRODUCTION": {
        title: `Introduction${POSTFIX}`,
        basic_title: "Introduction",
        next: "INSTALLATION",
        previous: null,
        description: `It's super easy to get started with Rad UI. You can install it using npm or yarn.`,
        url: "/docs/first-steps/introduction"
    },
    "INSTALLATION": {
        title: `Installation${POSTFIX}`,
        basic_title: "Installation",
        next: "USAGE",
        previous: "INTRODUCTION",
        description: `It's super easy to get started with Rad UI. You can install it using npm or yarn.`,
        url: "/docs/first-steps/installation"
    },
    "USAGE": {
        title: `Usage${POSTFIX}`,
        basic_title: "Usage",
        next: "ACCESSIBILITY",
        previous: "INSTALLATION",
        description: `It's super easy to get started with Rad UI. You can install it using npm or yarn.`,
        url: "/docs/first-steps/usage"
    },
    "ACCESSIBILITY": {
        title: `Accessibility${POSTFIX}`,
        basic_title: "Accessibility",
        next: null,
        previous: "USAGE",
        description: `It's super easy to get started with Rad UI. You can install it using npm or yarn.`,
        url: "/docs/principles/accessibility"
    },
    "AVATAR_DOCS": {
        title: `Avatar Documentation ${POSTFIX}`,
        basic_title: "Avatar",
        next: null,
        previous: null,
        description: `It's super easy to get started with Rad UI. You can install it using npm or yarn.`,
        url: "/docs/components/avatar"
    },
}

DOCS_SEO.getMetadata = (pageName) => {
    return DOCS_SEO[pageName]
}

DOCS_SEO.getNext = (pageName) => {
    const nextPageConstant = DOCS_SEO[pageName]?.next || null;
    return DOCS_SEO[nextPageConstant]
}

DOCS_SEO.getPrevious = (pageName) => {

    const nextPageConstant = DOCS_SEO[pageName]?.previous || null;

    return DOCS_SEO[nextPageConstant]
}

export default DOCS_SEO;