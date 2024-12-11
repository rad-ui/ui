import Heading from "@radui/ui/Heading";
import { BookMarkLink } from "@/components/layout/Documentation/utils";
const ComponentFeatures = ({ features }) => {
  return (
    <div>
      <BookMarkLink id="features">
        <Heading as="h6" className="mb-2 text-gray-1000 font-bold">
          Features
        </Heading>
      </BookMarkLink>
      <div className="mb-10">
        <ul className="list-disc list-inside">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComponentFeatures;
