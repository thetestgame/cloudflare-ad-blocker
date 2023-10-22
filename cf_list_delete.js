import {
  deleteZeroTrustListsAtOnce,
  deleteZeroTrustListsOneByOne,
  getZeroTrustLists,
} from "./lib/api.js";
import { FAST_MODE } from "./lib/constants.js";

(async () => {
  const { result: lists } = await getZeroTrustLists();

  if (!lists) {
    console.warn(
      "No file lists found - this is not an issue if it's your first time running this script. Exiting."
    );
    return;
  }

  const CGABLists = lists.filter(({ name }) => name.startsWith("CGAB List"));

  if (!CGABLists.length) {
    console.warn(
      "No lists with matching name found - this is not an issue if you haven't created any filter lists before. Exiting."
    );
    return;
  }

  console.log(
    `Got ${lists.length} lists, ${CGABLists.length} of which are CGAB lists that will be deleted.`
  );

  if (FAST_MODE) {
    await deleteZeroTrustListsAtOnce(CGABLists);
    return;
  }

  await deleteZeroTrustListsOneByOne(CGABLists);
})();
