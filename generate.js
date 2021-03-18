const { promisify } = require("util");
const { exec: execSync } = require("child_process");
const rimraf = promisify(require("rimraf"));
const OpenAPI = require("openapi-typescript-codegen");

const exec = promisify(execSync);

const OPEN_API_URL = require("./openapi.json"); // "https://api.twitter.com/2/openapi.json";
const DEST_PATH = "./src";

(async () => {
  try {
    await rimraf(DEST_PATH);
    const generatedSource = await OpenAPI.generate({
      input: OPEN_API_URL,
      output: DEST_PATH,
    });
    await exec(`prettier --write ${DEST_PATH}`);
  } catch (e) {
    console.log(e);
  }
})();
