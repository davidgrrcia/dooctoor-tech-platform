/**
 * Calculate age from birth date string in ISO 8601 format (YYYY-MM-DD)
 */
export function calculateAge(dateOfBirth: string): number {
  if (!dateOfBirth) return 0;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  // Check if the date is valid
  if (isNaN(birthDate.getTime())) return 0;

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
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
      date = new Date(dateString);
    } else {
      // Assume DD-MM-YYYY format
      const [day, month, year] = parts;
      if (day && month && year) {
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else {
        date = new Date(dateString);
      }
    }
  } else if (dateString.includes("/") && dateString.split("/").length === 3) {
    // Handle MM/DD/YYYY format
    const [month, day, year] = dateString.split("/");
    if (month && day && year) {
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      date = new Date(dateString);
    }
  } else {
    // Try direct parsing
    date = new Date(dateString);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  // Return in YYYY-MM-DD format
  const isoString = date.toISOString();
  return isoString.split("T")[0] || "";
}

/**
 * Format date from ISO 8601 (YYYY-MM-DD) to a more readable format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return dateString;

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) return dateString;

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthName = monthNames[month];

  if (!monthName) return dateString;

  return `${day} de ${monthName}, ${year}`;
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
