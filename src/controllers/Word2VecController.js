const { PythonShell } = require("python-shell");

require("dotenv").config(); // dotenv 설정 불러오기

async function runPythonScript(scriptPath, options) {
  console.log("Running Python Script..."); // Initial log
  return new Promise((resolve, reject) => {
    PythonShell.run(scriptPath, options)
      .then((results) => {
        try {
          const parsedResults = JSON.parse(results.join(""));
          resolve(parsedResults);
        } catch (parseError) {
          reject(parseError);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

async function getSimilarityCompanies(word) {
  console.log("word", word);
  try {
    const options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: "src/scripts",
      args: [word],
      env: process.env,
    };
    const results = await runPythonScript("get_similar_words.py", options);

    return results;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getSimilarityCompanies };
