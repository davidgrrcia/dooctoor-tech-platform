import { Id } from "@repo/backend/convex/_generated/dataModel";
import { differenceInYears, format, isValid, parse, parseISO } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Validate if a string is a valid Convex ID for members
 */
export function isValidConvexId(id: string): id is Id<"members"> {
  // Convex IDs are alphanumeric strings, typically 32+ characters
  // Based on the error patterns, they look like: p5703wjr6ysdcv4zjvdb8mr3sn7q06p23g
  const convexIdPattern = /^[a-z0-9]+$/;
  return convexIdPattern.test(id) && id.length >= 30 && id.length <= 40;
}

/**
 * Calculate age from birth date string in ISO 8601 format (YYYY-MM-DD)
 */
export function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0;

  const birthDate = parseISO(dateOfBirth);
  if (!isValid(birthDate)) return 0;

  return differenceInYears(new Date(), birthDate);
}

/**
 * Format date for HTML date input (YYYY-MM-DD)
 * Handles multiple input formats: ISO 8601, DD-MM-YYYY, MM/DD/YYYY
 */
export function formatDateForInput(dateString: string): string {
  if (!dateString) return "";

  let date: Date;

  // Try different date formats
  if (dateString.includes("-") && dateString.split("-").length === 3) {
    const parts = dateString.split("-");

    // Check if it's already in YYYY-MM-DD format
    if (parts[0] && parts[0].length === 4) {
      date = parseISO(dateString);
    } else {
      // Assume DD-MM-YYYY format
      date = parse(dateString, "dd-MM-yyyy", new Date());
    }
  } else if (dateString.includes("/") && dateString.split("/").length === 3) {
    // Handle MM/DD/YYYY format
    date = parse(dateString, "MM/dd/yyyy", new Date());
  } else {
    // Try direct parsing
    date = parseISO(dateString);
  }

  // Check if the date is valid
  if (!isValid(date)) {
    return "";
  }

  // Return in YYYY-MM-DD format
  return format(date, "yyyy-MM-dd");
}

/**
 * Format date from ISO 8601 (YYYY-MM-DD) to a more readable format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return dateString;

  const date = parseISO(dateString);

  if (!isValid(date)) return dateString;

  return format(date, "d 'de' MMMM, yyyy", { locale: es });
}

/**
 * Generate member stats from array of members
 */
export function generateMemberStats(members: any[]) {
  const stats = {
    totalMembers: members.length,
    genderDistribution: {} as Record<string, number>,
    bloodTypeDistribution: {} as Record<string, number>,
    averageAge: 0,
  };

  let totalAge = 0;

  members.forEach((member) => {
    // Gender distribution
    stats.genderDistribution[member.gender] =
      (stats.genderDistribution[member.gender] || 0) + 1;

    // Blood type distribution
    const bloodType = `${member.bloodType}${member.rh}`;
    stats.bloodTypeDistribution[bloodType] =
      (stats.bloodTypeDistribution[bloodType] || 0) + 1;

    // Age calculation
    totalAge += calculateAge(member.dateOfBirth);
  });

  stats.averageAge =
    members.length > 0 ? Math.round(totalAge / members.length) : 0;

  return stats;
}
