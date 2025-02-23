const code = {
    javascript: {
        code: `
import Callout from "@radui/ui/Callout";
import Text from "@radui/ui/Text";

const CalloutExample = () => (
  <Callout color="red">
        <BookmarkIcon />
        <Text className="font-bold">Error</Text>
        <Text>Something went wrong. Please try again later.</Text>
  </Callout>
)
`
    },
    scss: {
        code: `.rad-ui-callout {
    padding:16px;
    border-radius:8px;
     background-color: var(--rad-ui-color-accent-200);
     color: var(--rad-ui-color-accent-950);
     display: flex;
     align-items: center;
     font-weight: 300;
     font-size: 14px;
     gap:8px;
 }`
    }
};

export const BookmarkIcon = () => {
  return <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

export default code;
