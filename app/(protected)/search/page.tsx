import { SearchUsers } from "@/components/search-users";
import { db } from "@/lib/db";

import { SearchInput } from "../_components/search";

interface SearchPageProps {}

const SearchPage = async () => {
  const users = await db.user.findMany({});
  return (
    <>
      <SearchUsers label="🔍 Search users">
        <div>
          <SearchInput users={users} />
        </div>
      </SearchUsers>
      ;
    </>
  );
};

export default SearchPage;
