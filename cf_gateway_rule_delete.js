import { deleteZeroTrustRule, getZeroTrustRules } from "./lib/api.js";

const { result: rules } = await getZeroTrustRules();
const CGABRule = rules.find(({ name }) => name === "CGAB Filter Lists");

(async () => {
  if (!CGABRule) {
    console.warn(
      "No rule with matching name found - this is not an issue if you haven't run the create script yet. Exiting."
    );
    return;
  }

  console.log(`Deleting rule ${CGABRule.name}`);
  await deleteZeroTrustRule(CGABRule.id);
})();
