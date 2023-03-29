// preact.config.js
// module.exports = function (config, env) {
//   config.resolve.alias.src = env.src;
// };

import { config } from "dotenv";

config({ path: `.env.{process.env.NODE_ENV || "development"}.local` });

export default (config, env, helpers) => {
  config.resolve.alias.src = env.src;
  config.plugins.push(
    new helpers.webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL),
      "process.env.GOOGLE_TAG_ID": JSON.stringify(process.env.GOOGLE_TAG_ID),
    })
  );
};
