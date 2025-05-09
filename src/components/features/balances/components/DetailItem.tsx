const DetailItem = ({ title, value }: { title: string; value: string }) => (
  <div>
    <h3 className="text-gray-3 dark:text-gray-7 text-sm md:text-base">
      {title}
    </h3>
    <p className="text-default-black dark:text-white text-base md:text-lg font-bold">
      {value}
    </p>
  </div>
);

export default DetailItem;
