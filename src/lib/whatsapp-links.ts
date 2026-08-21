import type { BookingDTO } from "@/types";
import { formatAirportTaxiChoice, resolveAirportTaxiType } from "@/lib/airport-vehicles";
import { siteConfig } from "@/config/site";

export function normalizeWhatsAppNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function buildWhatsAppUrl(phone: string, message: string) {
  return `https://wa.me/${normalizeWhatsAppNumber(phone)}?text=${encodeURIComponent(message)}`;
}

function displayDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeZone: "Asia/Colombo",
  }).format(new Date(value));
}

function airportTaxiPageUrl(taxiId: string) {
  return `${siteConfig.url.replace(/\/$/, "")}/airport-hire#taxi-${taxiId}`;
}

export function buildAirportTaxiWhatsAppDetails(booking: Pick<BookingDTO, "vehicleType" | "vehicleId">) {
  const taxi = resolveAirportTaxiType(booking.vehicleType, booking.vehicleId);
  if (!taxi) return [];

  const extraPhotos = taxi.photos.filter((photo) => photo !== taxi.image);
  return [
    `Your taxi: ${formatAirportTaxiChoice(taxi)}`,
    taxi.shortDescription,
    `Seats: ${taxi.capacity}`,
    `Luggage: ${taxi.luggagePieces} bags`,
    `Includes: ${taxi.features.join(", ")}`,
    "",
    "See the vehicle:",
    taxi.image,
    extraPhotos.length ? "More photos:" : undefined,
    ...extraPhotos,
    "",
    `Vehicle page: ${airportTaxiPageUrl(taxi.id)}`,
  ].filter((line): line is string => line !== undefined);
}

export function buildAdminRequestMessage(
  booking: Pick<
    BookingDTO,
    | "bookingCode"
    | "type"
    | "customerName"
    | "email"
    | "phone"
    | "country"
    | "sourceTitle"
    | "travelDate"
    | "returnDate"
    | "guests"
    | "pickupLocation"
    | "dropoffLocation"
    | "flightNumber"
    | "arrivalTime"
    | "vehicleType"
    | "estimatedAmountUSD"
    | "notes"
  >,
) {
  return [
    `Hello GH Tours, I have submitted a ${booking.type.toLowerCase()} request.`,
    "",
    `Reference: ${booking.bookingCode}`,
    `Service: ${booking.sourceTitle ?? booking.type}`,
    `Name: ${booking.customerName}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    booking.country ? `Country: ${booking.country}` : "",
    `Travel date: ${displayDate(booking.travelDate)}`,
    booking.returnDate ? `Return date: ${displayDate(booking.returnDate)}` : "",
    booking.guests ? `Guests: ${booking.guests}` : "",
    booking.pickupLocation ? `Pickup: ${booking.pickupLocation}` : "",
    booking.dropoffLocation ? `Drop-off: ${booking.dropoffLocation}` : "",
    booking.flightNumber ? `Flight: ${booking.flightNumber}` : "",
    booking.arrivalTime ? `Time: ${booking.arrivalTime}` : "",
    booking.vehicleType ? `Vehicle: ${booking.vehicleType}` : "",
    booking.estimatedAmountUSD !== undefined ? `Quoted fare: USD ${booking.estimatedAmountUSD}` : "",
    booking.notes ? `Notes: ${booking.notes}` : "",
    "",
    "Please confirm availability and the next steps. Thank you.",
  ].filter((line) => line !== "").join("\n");
}

export function buildCustomerReplyMessage(booking: BookingDTO) {
  const statusLine: Record<BookingDTO["status"], string> = {
    PENDING: booking.type === "AIRPORT"
      ? "Thank you for your airport transfer request. Here is the taxi for your trip."
      : "We have received your request and are reviewing the details.",
    CONFIRMED: "Good news — your request has been approved and confirmed.",
    DECLINED: "Thank you for your request. Unfortunately, we cannot confirm it for the selected details.",
    IN_PROGRESS: "Your booking is now in progress.",
    COMPLETED: "Your booking has been completed. Thank you for travelling with GH Tours.",
    CANCELLED: "Your booking has been cancelled.",
  };

  const taxiDetails = booking.type === "AIRPORT" ? buildAirportTaxiWhatsAppDetails(booking) : [];

  return [
    `Hello ${booking.customerName},`,
    "",
    statusLine[booking.status],
    ...taxiDetails,
    taxiDetails.length ? "" : undefined,
    `Reference: ${booking.bookingCode}`,
    `Service: ${booking.sourceTitle ?? booking.type}`,
    `Travel date: ${displayDate(booking.travelDate)}`,
    booking.pickupLocation ? `Pickup: ${booking.pickupLocation}` : undefined,
    booking.dropoffLocation ? `Drop-off: ${booking.dropoffLocation}` : undefined,
    booking.guests ? `Guests: ${booking.guests}` : undefined,
    booking.totalAmountUSD !== undefined ? `Confirmed total: USD ${booking.totalAmountUSD}` : undefined,
    booking.adminNotes ? `Update: ${booking.adminNotes}` : undefined,
    "",
    booking.type === "AIRPORT"
      ? "We will confirm the driver, meeting point and fare next. Reply here if you have any questions."
      : "Reply here if you have any questions.",
    "GH Tours",
  ].filter((line) => line !== undefined).join("\n");
}
