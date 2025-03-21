import multer from "multer";

// const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).single("image");
// export { multerUploads };

const multerUploads = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).single("image");

export { multerUploads };
