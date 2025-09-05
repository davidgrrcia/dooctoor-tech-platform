"use client";

import { LoadingSpinner } from "@/components";
import { api } from "@repo/backend/convex/_generated/api";
import { Id } from "@repo/backend/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Link from "next/link";
import { calculateAge, formatDate } from "../utils";

interface MemberViewProps {
  memberId: Id<"members">;
}

export function MemberView({ memberId }: MemberViewProps) {
  const member = useQuery(api.members.getMemberById, { id: memberId });

  if (member === undefined) {
    return <LoadingSpinner message="Cargando información del miembro..." />;
  }

  if (member === null) {
    return null; // This will be handled by the error boundary
  }

  const age = calculateAge(member.dateOfBirth);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {member.name} {member.surname}
          </h1>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/members/${memberId}/edit`}
            className="bg-brand hover:bg-brand-hover text-brand-foreground focus:ring-brand rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Editar Miembro
          </Link>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar - Left Column */}
        <div className="lg:col-span-1">
          <MemberSidebar member={member} />
        </div>

        {/* Main Content - Right Column */}
        <div className="lg:col-span-3">
          <MemberHealthSummary member={member} />
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function MemberSidebar({ member }: { member: any }) {
  return (
    <div className="space-y-6">
      {/* Personal Info Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Información Personal
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
            <p className="text-sm text-gray-900">
              {member.name} {member.surname}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Nickname</p>
            <p className="text-sm text-gray-900">{member.nickname}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Fecha de Nacimiento
            </p>
            <p className="text-sm text-gray-900">
              {formatDate(member.dateOfBirth)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Edad</p>
            <p className="text-sm text-gray-900">
              {calculateAge(member.dateOfBirth)} años
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Género</p>
            <p className="text-sm text-gray-900">{member.gender}</p>
          </div>
        </div>
      </div>

      {/* Contact Info Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Información de Contacto
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-sm text-gray-900">{member.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Teléfono</p>
            <p className="text-sm text-gray-900">{member.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Dirección</p>
            <p className="text-sm text-gray-900">{member.address}</p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Contactos de Emergencia
        </h3>
        <div className="space-y-4">
          {member.emergencyContacts?.map((contact: any, index: number) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-3 last:border-b-0"
            >
              <p className="text-sm font-medium text-gray-900">
                {contact.name}
              </p>
              <p className="text-sm text-gray-500">{contact.relationship}</p>
              <p className="text-sm text-gray-700">{contact.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Health Summary Component
function MemberHealthSummary({ member }: { member: any }) {
  return (
    <div className="space-y-6">
      {/* Health Overview */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Resumen de Salud
        </h2>

        {/* Basic Health Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-red-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <svg
                    className="h-5 w-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">
                  Tipo de Sangre
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {member.bloodType}
                  {member.rh}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v2a1 1 0 01-1 1h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Altura</p>
                <p className="text-lg font-semibold text-gray-900">
                  {member.height} cm
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-6-2"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Peso</p>
                <p className="text-lg font-semibold text-gray-900">
                  {member.weight} kg
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                  <svg
                    className="h-5 w-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">IMC</p>
                <p className="text-lg font-semibold text-gray-900">
                  {calculateBMI(member.weight, member.height)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Medical Information Sections */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Allergies */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-900">Alergias</h3>
            <p className="text-sm text-gray-700">
              {member.allergies || "Sin alergias conocidas"}
            </p>
          </div>

          {/* Current Medications */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Medicamentos Actuales
            </h3>
            <p className="text-sm text-gray-700">
              {member.medication || "Sin medicamentos actuales"}
            </p>
          </div>

          {/* Major Diseases */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Enfermedades Importantes
            </h3>
            <p className="text-sm text-gray-700">
              {member.majorDiseases || "Sin enfermedades importantes"}
            </p>
          </div>

          {/* Medical Background */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-medium text-gray-900">
              Antecedentes Médicos
            </h3>
            <p className="text-sm text-gray-700">
              {member.background || "Sin antecedentes médicos relevantes"}
            </p>
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      {member.insurance &&
        (member.insurance.company || member.insurance.policyNumber) && (
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Información del Seguro
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Compañía</p>
                <p className="text-sm text-gray-900">
                  {member.insurance.company || "No especificado"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Número de Póliza
                </p>
                <p className="text-sm text-gray-900">
                  {member.insurance.policyNumber || "No especificado"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Vigencia</p>
                <p className="text-sm text-gray-900">
                  {member.insurance.validFrom && member.insurance.validTo
                    ? `${formatDate(member.insurance.validFrom)} - ${formatDate(member.insurance.validTo)}`
                    : "No especificado"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Coberturas</p>
                <p className="text-sm text-gray-900">
                  {member.insurance.coverages || "No especificado"}
                </p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

// Helper function to calculate BMI
function calculateBMI(weight: string, height: string): string {
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height) / 100; // Convert cm to meters

  if (isNaN(weightNum) || isNaN(heightNum) || heightNum === 0) {
    return "N/A";
  }

  const bmi = weightNum / (heightNum * heightNum);
  return bmi.toFixed(1);
}
