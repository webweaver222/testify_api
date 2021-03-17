const { memo } = require("../resorses/utils");
const {
  fetchData,
  caclResults,
  prepareDocument,
} = require("../services/resultsService");

const memoFetch = memo(fetchData, 1000);

const getResults = async (ctx) => {
  const { exam_id } = ctx.params;
  try {
    const data = await memoFetch(exam_id);

    const results = caclResults(data);

    const doc = prepareDocument(results);

    ctx.status = 200;
    ctx.body = {
      results: doc,
    };
  } catch (e) {
    if (e === "404") {
      const error = new Error(e);
      error.status = 404;
      throw error;
    }
    throw new Error(e);
  }
};

module.exports = { getResults };
