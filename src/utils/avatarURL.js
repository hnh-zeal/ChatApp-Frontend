import { AWS_S3_REGION, S3_BUCKET_NAME } from "./../config";

const avatarUrl = (avatar) => {
  if (!avatar) {
    // If avatar is not provided, return a default URL or handle it as per your requirement
    return '';
  }

  return `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${avatar}`;
};

export default avatarUrl;
