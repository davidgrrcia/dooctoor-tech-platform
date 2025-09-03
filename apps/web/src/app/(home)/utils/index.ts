/**
 * Calculate age from birth date string in DD-MM-YYYY format
 */
export function calculateAge(dateOfBirth: string): number {
  const parts = dateOfBirth.split("-").map(Number);
  if (parts.length !== 3) return 0;

  const [day, month, year] = parts;
  if (!day || !month || !year) return 0;

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
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
 * Format date from DD-MM-YYYY to a more readable format
 */
export function formatDate(dateString: string): string {
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;

  const [day, month, year] = parts;
  if (!day || !month || !year) return dateString;

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

  const monthIndex = parseInt(month) - 1;
  const monthName = monthNames[monthIndex];

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
