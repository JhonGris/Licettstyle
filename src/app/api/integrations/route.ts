import { NextResponse } from "next/server";
import { hasCloudinaryConfig } from "@/lib/cloudinary";

export function GET() {
  return NextResponse.json({
    cloudinary: {
      configured: hasCloudinaryConfig(),
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? null,
    },
    googleSheets: {
      configured: Boolean(process.env.GOOGLE_SHEETS_SPREADSHEET_ID),
      spreadsheetId:
        process.env.GOOGLE_SHEETS_SPREADSHEET_ID ??
        "1k89uYizzD5b8WO52CH774AGiV0PZHKYNuOp_c6oaAwc",
    },
  });
}
