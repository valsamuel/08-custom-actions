const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

function run() {
  const bucket = core.getInput("bucket", {
    trimWhitespace: true,
    required: true,
  });
  const bucketRegion = core.getInput("bucket-region", {
    trimWhitespace: true,
    required: true,
  });
  const distFolder = core.getInput("dist-folder", {
    trimWhitespace: true,
    required: true,
  });

  const s3Url = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Url}  --region ${bucketRegion}`);

  core.notice(`Deploying to bucket: ${bucket}`);
}
run();
