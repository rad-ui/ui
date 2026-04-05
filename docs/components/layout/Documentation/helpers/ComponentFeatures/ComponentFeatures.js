'use client'
import Heading from "@radui/ui/Heading";
import { BookMarkLink } from "@/components/layout/Documentation/utils";
import { Check } from 'lucide-react';
import { docsSectionBlockClassName, docsSectionHeadingClassName } from '../../shared';


const ComponentFeatures = ({ features }) => {
  return (
    <section className={docsSectionBlockClassName}>
      <BookMarkLink id="features">
        <Heading as="h2" className={`${docsSectionHeadingClassName} text-gray-1000 font-bold`}>
          Features
        </Heading>
      </BookMarkLink>
      <ul className="list-disc list-inside space-y-2">
        {features.map((feature, index) => (
          <li className="flex items-center space-x-2" key={index}>
            <span className="text-green-950 w-[24px] h-[24px] bg-green-500 rounded-full flex items-center justify-center p-1">
              <Check size={14} strokeWidth={2.5} />
            </span>
            <span>
            {feature}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ComponentFeatures;
