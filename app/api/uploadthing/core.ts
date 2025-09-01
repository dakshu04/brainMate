import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter: FileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "8MB" } })
    .middleware(async ({ req }) => {
      const user = await currentUser();

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }
      console.log(user);
      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completed for user id:", metadata.userId);
      console.log("file url", file.ufsUrl);

      // Only return JSON-safe data
      return {
        userId: metadata.userId,
        fileUrl: file.ufsUrl,
        fileName: file.name,
        fileKey: file.key,
      };
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;
