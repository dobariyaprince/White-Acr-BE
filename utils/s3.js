const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file.name,
    Body: file.data,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${file.name}`;
};

const deleteFile = async (fileUrl) => {
  const key = fileUrl.split('/').pop();
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);
};

module.exports = {
  uploadFile,
  deleteFile,
  s3Client,
};
