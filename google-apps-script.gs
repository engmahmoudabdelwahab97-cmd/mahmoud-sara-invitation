/**
 * Google Apps Script backend for the Mahmoud & Sara online wishes guestbook.
 * Create a Google Sheet, open Extensions > Apps Script, paste this code, then
 * deploy as a Web app (Execute as: Me; Who has access: Anyone).
 */
const WISHES_SHEET_NAME = "Wishes";

function doGet() {
  return ContentService
    .createTextOutput("Mahmoud & Sara guestbook endpoint is ready.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    // A basic anti-spam honeypot. Legitimate submissions leave this blank.
    if (String(data.website || "").trim()) {
      return jsonResponse({ ok: true });
    }

    const name = String(data.name || "").trim().slice(0, 120);
    const message = String(data.message || "").trim().slice(0, 2000);
    const couple = `${String(data.groomName || "Mahmoud").trim().slice(0, 80)} & ${String(data.brideName || "Sara").trim().slice(0, 80)}`;

    if (!name || !message) {
      return jsonResponse({ ok: false, error: "Name and message are required." });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) throw new Error("Run this script from the Google Sheet that will store wishes.");

    let sheet = spreadsheet.getSheetByName(WISHES_SHEET_NAME);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(WISHES_SHEET_NAME);
      sheet.appendRow(["Received At", "Guest Name", "Message", "For"]);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date(), name, message, couple]);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: "Unable to save this message." });
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
