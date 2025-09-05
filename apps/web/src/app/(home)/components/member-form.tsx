"use client";

import { LoadingSpinner } from "@/components";
import { api } from "@repo/backend/convex/_generated/api";
import { Id } from "@repo/backend/convex/_generated/dataModel";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { formatDateForInput } from "../utils";

// Validation schema
const memberSchema = z.object({
  nickname: z.string().min(1, "Nickname es requerido"),
  name: z.string().min(1, "Nombre es requerido"),
  surname: z.string().min(1, "Apellido es requerido"),
  gender: z.string().min(1, "Género es requerido"),
  dateOfBirth: z.string().min(1, "Fecha de nacimiento es requerida"),
  bloodType: z.string().min(1, "Tipo de sangre es requerido"),
  rh: z.string().min(1, "RH es requerido"),
  height: z.string().min(1, "Altura es requerida"),
  weight: z.string().min(1, "Peso es requerido"),
  allergies: z.string(),
  medication: z.string(),
  majorDiseases: z.string(),
  background: z.string(),
  email: z.string().email("Email inválido"),
  phone: z.string().min(1, "Teléfono es requerido"),
  address: z.string().min(1, "Dirección es requerida"),
  // Emergency Contacts
  emergencyContacts: z.array(
    z.object({
      name: z.string().min(1, "Nombre del contacto es requerido"),
      relationship: z.string().min(1, "Relación es requerida"),
      phone: z.string().min(1, "Teléfono del contacto es requerido"),
    }),
  ),
  // Insurance Information
  insurance: z.object({
    company: z.string(),
    policyNumber: z.string(),
    coverages: z.string(),
    validFrom: z.string(),
    validTo: z.string(),
  }),
});

interface MemberFormProps {
  memberId?: Id<"members">;
  mode: "create" | "edit";
}

export function MemberForm({ memberId, mode }: MemberFormProps) {
  const router = useRouter();
  const createMember = useMutation(api.members.createMember);
  const updateMember = useMutation(api.members.updateMember);

  // Only fetch member data if we're editing
  const existingMember = useQuery(
    api.members.getMemberById,
    memberId ? { id: memberId } : "skip",
  );

  // Default form values
  const defaultValues = {
    nickname: "",
    name: "",
    surname: "",
    gender: "",
    dateOfBirth: "",
    bloodType: "",
    rh: "",
    height: "",
    weight: "",
    allergies: "",
    medication: "",
    majorDiseases: "",
    background: "",
    email: "",
    phone: "",
    address: "",
    emergencyContacts: [
      {
        name: "",
        relationship: "",
        phone: "",
      },
    ],
    insurance: {
      company: "",
      policyNumber: "",
      coverages: "",
      validFrom: "",
      validTo: "",
    },
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        if (mode === "create") {
          await createMember(value);
        } else if (memberId) {
          await updateMember({
            id: memberId,
            ...value,
          });
        }
        router.push("/");
      } catch (error) {
        console.error("Error saving member:", error);
      }
    },
  });

  // Update form values when existing member data loads
  useEffect(() => {
    if (mode === "edit" && existingMember) {
      form.setFieldValue("nickname", existingMember.nickname || "");
      form.setFieldValue("name", existingMember.name || "");
      form.setFieldValue("surname", existingMember.surname || "");
      form.setFieldValue("gender", existingMember.gender || "");
      form.setFieldValue(
        "dateOfBirth",
        formatDateForInput(existingMember.dateOfBirth || ""),
      );
      form.setFieldValue("bloodType", existingMember.bloodType || "");
      form.setFieldValue("rh", existingMember.rh || "");
      form.setFieldValue("height", existingMember.height || "");
      form.setFieldValue("weight", existingMember.weight || "");
      form.setFieldValue("allergies", existingMember.allergies || "");
      form.setFieldValue("medication", existingMember.medication || "");
      form.setFieldValue("majorDiseases", existingMember.majorDiseases || "");
      form.setFieldValue("background", existingMember.background || "");
      form.setFieldValue("email", existingMember.email || "");
      form.setFieldValue("phone", existingMember.phone || "");
      form.setFieldValue("address", existingMember.address || "");
      form.setFieldValue(
        "emergencyContacts",
        existingMember.emergencyContacts || [
          { name: "", relationship: "", phone: "" },
        ],
      );
      form.setFieldValue(
        "insurance",
        existingMember.insurance
          ? {
              company: existingMember.insurance.company || "",
              policyNumber: existingMember.insurance.policyNumber || "",
              coverages: existingMember.insurance.coverages || "",
              validFrom: formatDateForInput(
                existingMember.insurance.validFrom || "",
              ),
              validTo: formatDateForInput(
                existingMember.insurance.validTo || "",
              ),
            }
          : {
              company: "",
              policyNumber: "",
              coverages: "",
              validFrom: "",
              validTo: "",
            },
      );
    }
  }, [existingMember, mode, form]);

  const handleCancel = () => {
    router.push("/");
  };

  // Handle loading state
  if (mode === "edit") {
    // Still loading
    if (existingMember === undefined) {
      return <LoadingSpinner message="Cargando miembro..." />;
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {mode === "create" ? "Crear Nuevo Miembro" : "Editar Miembro"}
        </h1>
        <p className="mt-2 text-gray-600">
          {mode === "create"
            ? "Completa la información del nuevo miembro"
            : "Actualiza la información del miembro"}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        {/* Personal Information Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Información Personal
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <form.Field
              name="nickname"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.nickname.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nickname
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Ingresa el nickname"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.name.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Ingresa el nombre"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="surname"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.surname.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Ingresa el apellido"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="gender"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.gender.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Género
                  </label>
                  <select
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                  >
                    <option value="">Selecciona el género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="dateOfBirth"
              validators={{
                onChange: ({ value }) => {
                  const result =
                    memberSchema.shape.dateOfBirth.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Health Information Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Información de Salud
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <form.Field
              name="bloodType"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.bloodType.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tipo de Sangre
                  </label>
                  <select
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                  >
                    <option value="">Selecciona el tipo de sangre</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="rh"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.rh.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Factor RH
                  </label>
                  <select
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                  >
                    <option value="">Selecciona el factor RH</option>
                    <option value="+">Positivo (+)</option>
                    <option value="-">Negativo (-)</option>
                  </select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="height"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.height.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Ingresa la altura en cm"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="weight"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.weight.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Ingresa el peso en kg"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="sm:col-span-2">
              <form.Field
                name="allergies"
                children={(field) => (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Alergias
                    </label>
                    <textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={3}
                      className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                      placeholder="Describe cualquier alergia conocida"
                    />
                  </div>
                )}
              />
            </div>

            <div className="sm:col-span-2">
              <form.Field
                name="medication"
                children={(field) => (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Medicamentos Actuales
                    </label>
                    <textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={3}
                      className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                      placeholder="Lista los medicamentos que toma actualmente"
                    />
                  </div>
                )}
              />
            </div>

            <div className="sm:col-span-2">
              <form.Field
                name="majorDiseases"
                children={(field) => (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Enfermedades Importantes
                    </label>
                    <textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={3}
                      className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                      placeholder="Describe cualquier enfermedad importante"
                    />
                  </div>
                )}
              />
            </div>

            <div className="sm:col-span-2">
              <form.Field
                name="background"
                children={(field) => (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Antecedentes Médicos
                    </label>
                    <textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={3}
                      className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                      placeholder="Describe antecedentes médicos relevantes"
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Información de Contacto
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.email.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="correo@ejemplo.com"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <form.Field
              name="phone"
              validators={{
                onChange: ({ value }) => {
                  const result = memberSchema.shape.phone.safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0]?.message;
                },
              }}
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="+1 (555) 123-4567"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]?.toString()}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="sm:col-span-2">
              <form.Field
                name="address"
                validators={{
                  onChange: ({ value }) => {
                    const result = memberSchema.shape.address.safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0]?.message;
                  },
                }}
                children={(field) => (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Dirección
                    </label>
                    <textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={2}
                      className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                      placeholder="Ingresa la dirección completa"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-sm text-red-600">
                        {field.state.meta.errors[0]?.toString()}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contacts Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Contactos de Emergencia
          </h2>
          <form.Field
            name="emergencyContacts"
            mode="array"
            children={(field) => (
              <div className="space-y-4">
                {field.state.value.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Contacto {i + 1}
                      </h3>
                      {field.state.value.length > 1 && (
                        <button
                          type="button"
                          onClick={() => field.removeValue(i)}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <form.Field
                        name={`emergencyContacts[${i}].name`}
                        validators={{
                          onChange: ({ value }) => {
                            const result = z
                              .string()
                              .min(1, "Nombre es requerido")
                              .safeParse(value);
                            return result.success
                              ? undefined
                              : result.error.issues[0]?.message;
                          },
                        }}
                        children={(subField) => (
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Nombre Completo
                            </label>
                            <input
                              type="text"
                              value={subField.state.value}
                              onBlur={subField.handleBlur}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                              className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                              placeholder="Nombre del contacto"
                            />
                            {subField.state.meta.errors.length > 0 && (
                              <p className="mt-1 text-sm text-red-600">
                                {subField.state.meta.errors[0]?.toString()}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <form.Field
                        name={`emergencyContacts[${i}].relationship`}
                        validators={{
                          onChange: ({ value }) => {
                            const result = z
                              .string()
                              .min(1, "Relación es requerida")
                              .safeParse(value);
                            return result.success
                              ? undefined
                              : result.error.issues[0]?.message;
                          },
                        }}
                        children={(subField) => (
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Relación
                            </label>
                            <select
                              value={subField.state.value}
                              onBlur={subField.handleBlur}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                              className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                            >
                              <option value="">Selecciona la relación</option>
                              <option value="Padre">Padre</option>
                              <option value="Madre">Madre</option>
                              <option value="Hermano/a">Hermano/a</option>
                              <option value="Esposo/a">Esposo/a</option>
                              <option value="Hijo/a">Hijo/a</option>
                              <option value="Abuelo/a">Abuelo/a</option>
                              <option value="Tío/a">Tío/a</option>
                              <option value="Primo/a">Primo/a</option>
                              <option value="Amigo/a">Amigo/a</option>
                              <option value="Otro">Otro</option>
                            </select>
                            {subField.state.meta.errors.length > 0 && (
                              <p className="mt-1 text-sm text-red-600">
                                {subField.state.meta.errors[0]?.toString()}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      <form.Field
                        name={`emergencyContacts[${i}].phone`}
                        validators={{
                          onChange: ({ value }) => {
                            const result = z
                              .string()
                              .min(1, "Teléfono es requerido")
                              .safeParse(value);
                            return result.success
                              ? undefined
                              : result.error.issues[0]?.message;
                          },
                        }}
                        children={(subField) => (
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Teléfono
                            </label>
                            <input
                              type="tel"
                              value={subField.state.value}
                              onBlur={subField.handleBlur}
                              onChange={(e) =>
                                subField.handleChange(e.target.value)
                              }
                              className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                              placeholder="+1 (555) 123-4567"
                            />
                            {subField.state.meta.errors.length > 0 && (
                              <p className="mt-1 text-sm text-red-600">
                                {subField.state.meta.errors[0]?.toString()}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    field.pushValue({ name: "", relationship: "", phone: "" })
                  }
                  className="bg-brand hover:bg-brand-hover text-brand-foreground rounded-md px-4 py-2 text-sm font-medium transition-colors"
                >
                  Agregar Contacto de Emergencia
                </button>
              </div>
            )}
          />
        </div>

        {/* Insurance Information Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Información del Seguro
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <form.Field
              name="insurance.company"
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Compañía de Seguros
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Nombre de la aseguradora"
                  />
                </div>
              )}
            />

            <form.Field
              name="insurance.policyNumber"
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Número de Póliza
                  </label>
                  <input
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                    placeholder="Número de la póliza"
                  />
                </div>
              )}
            />

            <form.Field
              name="insurance.validFrom"
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Vigencia Desde
                  </label>
                  <input
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                  />
                </div>
              )}
            />

            <form.Field
              name="insurance.validTo"
              children={(field) => (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Vigencia Hasta
                  </label>
                  <input
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                  />
                </div>
              )}
            />

            <div className="sm:col-span-2">
              <form.Field
                name="insurance.coverages"
                children={(field) => (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Coberturas
                    </label>
                    <textarea
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      rows={3}
                      className="focus:border-brand focus:ring-brand w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1"
                      placeholder="Describe las coberturas del seguro"
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="focus:ring-brand rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit}
                className="bg-brand hover:bg-brand-hover text-brand-foreground focus:ring-brand flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting && (
                  <LoadingSpinner
                    inline
                    size="sm"
                    className="border-brand-foreground"
                  />
                )}
                {mode === "create" ? "Crear Miembro" : "Actualizar Miembro"}
              </button>
            )}
          />
        </div>
      </form>
    </div>
  );
}
