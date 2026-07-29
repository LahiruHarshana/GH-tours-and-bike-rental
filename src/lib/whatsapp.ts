import type { BookingDTO } from "@/types";

type NotificationResult =
  | { status: "SENT"; messageId?: string }
  | { status: "SKIPPED"; error: string }
  | { status: "FAILED"; error: string };

function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Asia/Colombo",
  }).format(new Date(value));
}

export async function sendAdminBookingNotification(
  booking: Pick<
    BookingDTO,
    | "bookingCode"
    | "type"
    | "customerName"
    | "phone"
    | "travelDate"
    | "pickupLocation"
    | "dropoffLocation"
  >,
): Promise<NotificationResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminPhone = process.env.WHATSAPP_ADMIN_PHONE;

  if (!token || !phoneNumberId || !adminPhone) {
    return {
      status: "SKIPPED",
      error: "WhatsApp credentials or admin phone are not configured.",
    };
  }

  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v23.0";
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const details = [
    `New ${booking.type.toLowerCase()} request`,
    `Reference: ${booking.bookingCode}`,
    `Guest: ${booking.customerName}`,
    `Phone: ${booking.phone}`,
    `Travel: ${formatDate(booking.travelDate)}`,
    booking.pickupLocation ? `From: ${booking.pickupLocation}` : "",
    booking.dropoffLocation ? `To: ${booking.dropoffLocation}` : "",
  ].filter(Boolean);

  const body = templateName
    ? {
        messaging_product: "whatsapp",
        to: adminPhone.replace(/\D/g, ""),
        type: "template",
        template: {
          name: templateName,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE ?? "en_US" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: booking.bookingCode },
                { type: "text", text: booking.type },
                { type: "text", text: booking.customerName },
                { type: "text", text: formatDate(booking.travelDate) },
              ],
            },
          ],
        },
      }
    : {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: adminPhone.replace(/\D/g, ""),
        type: "text",
        text: { preview_url: false, body: details.join("\n") },
      };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    const result = (await response.json()) as {
      messages?: Array<{ id?: string }>;
      error?: { message?: string };
    };
    if (!response.ok) {
      return {
        status: "FAILED",
        error: result.error?.message ?? `WhatsApp returned ${response.status}.`,
      };
    }
    return { status: "SENT", messageId: result.messages?.[0]?.id };
  } catch (error) {
    return {
      status: "FAILED",
      error: error instanceof Error ? error.message : "WhatsApp request failed.",
    };
  }
}

