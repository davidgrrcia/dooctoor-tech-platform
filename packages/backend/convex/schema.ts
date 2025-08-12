import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // -------------------------
  // A. Organization & Structure
  // -------------------------
  organizations: defineTable({
    slug: v.string(),
    name: v.string(),
    cif: v.string(),
    billingAddress: v.string(),
    socialAddress: v.string(),
    billingContactName: v.string(),
    billingContactEmail: v.string(),
    billingContactPhone: v.string(),
    technicalContactName: v.string(),
    technicalContactEmail: v.string(),
    technicalContactPhone: v.string(),
  }),

  // A center only belongs to one organization
  centers: defineTable({
    slug: v.string(),
    organizationId: v.id("organizations"),
    name: v.string(),
    address: v.string(),
    contactName: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
  }).index("by_organization", ["organizationId"]),

  // A Professional can be associated with multiple centers
  professionals: defineTable({
    centerId: v.id("centers"),
    username: v.string(),
    name: v.string(),
    surname: v.string(),
    licenseNumber: v.string(),
    email: v.string(),
    phone: v.string(),
  }).index("by_center", ["centerId"]),

  // -------------------------
  // B. Customer & Person
  // -------------------------
  persons: defineTable({
    username: v.string(),
    photo: v.string(),
    nickname: v.string(),
    name: v.string(),
    surname1: v.string(),
    surname2: v.string(),
    gender: v.string(),
    dateOfBirth: v.string(),
    role: v.string(),
    doctorId: v.string(),
    documentType: v.string(),
    documentNumber: v.string(),

    // Contact information
    email: v.string(),
    mobilePhone: v.string(),
    address: v.string(),
    postalCode: v.string(),
    city: v.string(),
    country: v.string(),
  }),

  customers: defineTable({
    personId: v.id("persons"), // The person who is the payer
    name: v.string(),
    surname1: v.string(),
    surname2: v.string(),
    documentType: v.string(), // DNI, NIE, etc. ?
    documentNumber: v.string(),
    email: v.string(),
    address: v.string(),
    postalCode: v.string(),
    city: v.string(),
    country: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_document", ["documentType", "documentNumber"]),

  customerPersonRelations: defineTable({
    customerId: v.id("customers"), // The payer
    personId: v.id("persons"), // The dependent or covered person
  }),

  personEmergencyContacts: defineTable({
    personId: v.id("persons"),
    priorityOrder: v.number(),
    name: v.string(),
    surname: v.string(),
    mobilePhone: v.string(),
    email: v.string(),
    relationship: v.string(),
  }),

  personInsurances: defineTable({
    personId: v.id("persons"),
    company: v.string(),
    cardNumber: v.string(),
    dueDate: v.string(),
    cardPhoto: v.string(),
    cardName: v.string(),
  }),

  // -------------------------
  // C. Health Summary
  // -------------------------
  healthSummaries: defineTable({
    personId: v.id("persons"),
    bloodType: v.string(),
    rh: v.string(),
    background: v.string(),
    majorDiseases: v.string(),
    medication: v.string(),
  }),

  allergies: defineTable({
    personId: v.id("persons"),
    allergyTypeId: v.id("allergyTypes"), // e.g., "allergy", "intolerance", "food_preference", "other"
    description: v.string(),
    treatment: v.string(),
    comments: v.string(),
  }),

  // TODO: if values are not known, we can use a enum instead of a table
  allergyTypes: defineTable({
    name: v.string(),
  }),

  // -------------------------
  // D. Measurements
  // -------------------------
  measurements: defineTable({
    personId: v.id("persons"),
    measurementTypeId: v.id("measurementTypes"),
    value1: v.string(),
    value2: v.string(),
    date: v.string(),
    time: v.string(),
    comments: v.string(),
  }),

  measurementTypes: defineTable({
    name: v.string(),
    unit: v.string(),
    decimalPrecision: v.number(),
  }),

  // -------------------------
  // E. Medical Record
  // -------------------------
  medicalRecords: defineTable({
    personId: v.id("persons"),
    title: v.string(),
    date: v.string(),
    medicalServiceId: v.id("medicalServices"),
    typeId: v.id("historyTypes"),
    diagnostic: v.string(),
    treatment: v.string(),
    medicalCenter: v.string(),
    tags: v.string(),
    comments: v.string(),
    favorite: v.boolean(),
    chronic: v.boolean(),
  }),

  medicalRecordFiles: defineTable({
    medicalRecordId: v.id("medicalRecords"),
    fileType: v.string(),
    filePath: v.string(),
    comments: v.string(),
  }),

  medicalServices: defineTable({
    name: v.string(),
  }),

  medicalRecordTypes: defineTable({
    name: v.string(),
  }),

  // -------------------------
  // F. Medicines
  // -------------------------
  medicines: defineTable({
    personId: v.id("persons"),
    name: v.string(),
    fullName: v.string(),
    cnCode: v.string(),
    registerNumber: v.string(),
    prescriptionDate: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    doseRegime: v.string(),
    doseUnit: v.string(),
    doseQuantity: v.string(),
    comments: v.string(),
    favorite: v.boolean(),
    chronic: v.boolean(),
  }),

  medicineFiles: defineTable({
    medicineId: v.id("medicines"),
    fileType: v.string(),
    filePath: v.string(),
    comments: v.string(),
  }),

  medicalRecordMedicines: defineTable({
    medicalRecordId: v.id("medicalRecords"),
    medicineId: v.id("medicines"),
  }),

  // -------------------------
  // G. Vaccines
  // -------------------------
  vaccines: defineTable({
    personId: v.id("persons"),
    vaccineTypeId: v.id("vaccineTypes"),
    administrationDate: v.string(),
    lotNumber: v.string(),
    comments: v.string(),
    favorite: v.boolean(),
    chronic: v.boolean(),
  }),

  vaccineFiles: defineTable({
    vaccineId: v.id("vaccines"),
    fileType: v.string(),
    filePath: v.string(),
    comments: v.string(),
  }),

  vaccineTypes: defineTable({
    name: v.string(),
  }),

  medicalRecordVaccines: defineTable({
    medicalRecordId: v.id("medicalRecords"),
    vaccineId: v.id("vaccines"),
  }),

  // KEEP COMMENTED FOR NOW
  // -------------------------
  // H. Child-Specific Data
  // -------------------------
  // birthDetails: defineTable({
  //   personId: v.id("persons"),
  //   birthCenter: v.string(),
  //   birthWeight: v.string(),
  //   birthHeight: v.string(),
  //   birthCephalicPerimeter: v.string(),
  //   incubator: v.boolean(),
  //   apgar1: v.number(),
  //   apgar5: v.number(),
  //   resuscitation: v.boolean(),
  //   generalExploration: v.string(),
  //   preventiveVitK: v.boolean(),
  //   preventiveOcularProphylaxis: v.boolean(),
  //   metabolicScreening: v.string(),
  //   hearingScreening: v.string(),
  // }),

  // developmentMilestones: defineTable({
  //   personId: v.id("persons"),
  //   milestoneTypeId: v.id("milestoneTypes"),
  //   month: v.number(),
  //   year: v.number(),
  // }),

  // milestoneTypes: defineTable({
  //   name: v.string(),
  // }),

  // feedings: defineTable({
  //   personId: v.id("persons"),
  //   foodTypeId: v.id("foodTypes"),
  //   month: v.number(),
  //   year: v.number(),
  // }),

  // foodTypes: defineTable({
  //   name: v.string(),
  // }),

  // dentitions: defineTable({
  //   personId: v.id("persons"),
  //   toothName: v.string(),
  //   appearedMonth: v.number(),
  //   appearedYear: v.number(),
  //   fellMonth: v.number(),
  //   fellYear: v.number(),
  // }),

  // -------------------------
  // I. Alerts
  // -------------------------
  // alerts: defineTable({
  //   linkedEntityType: v.string(), // e.g., "history", "medicine", "vaccine"
  //   linkedEntityId: v.string(),
  //   message: v.string(),
  //   status: v.string(),
  //   comments: v.string(),
  //   createdBy: v.id("systemUsers"),
  // }),

  // -------------------------
  // J. System & Access
  // -------------------------
  systemUsers: defineTable({
    name: v.string(),
    surname: v.string(),
    email: v.string(),
    password: v.string(),
    roleId: v.id("roles"),
    status: v.string(),
    profileImage: v.string(),
  }),

  roles: defineTable({
    name: v.string(),
  }),

  permissions: defineTable({
    name: v.string(),
  }),

  rolePermissions: defineTable({
    roleId: v.id("roles"),
    permissionId: v.id("permissions"),
  }),

  // -------------------------
  // K. Subscriptions
  // -------------------------
  subscriptionPlans: defineTable({
    title: v.string(),
    price: v.number(),
    duration: v.string(),
    status: v.string(),
  }),

  subscriptions: defineTable({
    userId: v.id("systemUsers"),
    stripeId: v.string(),
    status: v.string(),
    price: v.number(),
    quantity: v.number(),
    trialEnd: v.string(),
    endDate: v.string(),
  }),

  subscriptionItems: defineTable({
    subscriptionId: v.id("subscriptions"),
    stripeProduct: v.string(),
    stripePrice: v.string(),
    quantity: v.number(),
  }),
});
