'use client'
import Heading from "@radui/ui/Heading";
import { BookMarkLink } from "@/components/layout/Documentation/utils";


const TickIcon = () => {
  return <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
}


const ComponentFeatures = ({ features }) => {
  return (
    <div className="mb-10">
      <BookMarkLink id="features">
        <Heading as="h2" className="mb-4 text-gray-1000 font-bold">
          Features
        </Heading>
      </BookMarkLink>
      <div className="mb-10">
        <ul className="list-disc list-inside space-y-2">
          {features.map((feature, index) => (
            <li className="flex items-center space-x-2" key={index}>
              <span className="text-green-950 w-[24px] h-[24px] bg-green-500 rounded-full flex items-center justify-center p-1">
                <TickIcon />
              </span>
              <span>
              {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComponentFeatures;
