'use client'
import Heading from "@radui/ui/Heading";
import { BookMarkLink } from "@/components/layout/Documentation/utils";
import { Check } from 'lucide-react';
import { docsSectionBlockClassName, docsSectionHeadingClassName } from '../../shared';


const ComponentFeatures = ({ features }) => {
  return (
    <section className={docsSectionBlockClassName}>
      <BookMarkLink id="features">
        <Heading as="h2" className={docsSectionHeadingClassName}>
          Features
        </Heading>
      </BookMarkLink>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li className="flex items-start gap-3 text-[0.98rem] leading-7 text-gray-900" key={index}>
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-green-100 text-green-1000">
              <Check size={13} strokeWidth={2.5} />
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ComponentFeatures;
