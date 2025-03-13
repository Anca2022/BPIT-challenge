import Transaction from "../types/Transaction";
import { SearchFilterParams } from "../types/Props";

export default function searchSortFilter({
  data,
  category,
  search,
  sort,
}: SearchFilterParams): Transaction[] {
  let orderedData: Transaction[] = [];
  if (category === "All Transactions") orderedData = [...data];
  else orderedData = data.filter((item) => item.category.includes(category));
  switch (sort) {
    case "Highest":
      orderedData.sort((a, b) => b.amount - a.amount);
      break;
    case "Lowest":
      orderedData.sort((a, b) => a.amount - b.amount);
      break;
    case "Latest":
    case "Oldest":
      orderedData.sort((a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        if (sort === "Latest") {
          return date2.getTime() - date1.getTime();
        } else return date1.getTime() - date2.getTime();
      });
  }
  const filteredData = orderedData.filter((item) => {
    return item.description.toLowerCase().includes(search.toLowerCase());
  });
  return filteredData;
}
