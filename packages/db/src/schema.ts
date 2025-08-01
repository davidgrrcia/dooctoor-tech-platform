// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { desc } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import {
  TRIP_ORG_ORGREF_UNIQUE_CONSTRAINT,
  TRIP_ORG_SLUG_UNIQUE_CONSTRAINT,
} from "./constraint-names";

//
// SCHEMA HELPERS
//
const ids = {
  id: uuid().primaryKey().defaultRandom(),
  organizationId: uuid().notNull(),
};

const timestamps = {
  version: integer().notNull().default(1),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp({ withTimezone: true }),

  // Future, when having users table (only for organization members)
  // createdByUserId: uuid().notNull(),
  // updatedByUserId: uuid().notNull(),
  // deletedByUserId: uuid(),
};

//
// ENUMS
//
export enum LanguageEnum {
  EN = "en",
  ES = "es",
}

export enum CurrencyEnum {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}
export const supportedCurrenciesEnum = pgEnum("supported_currencies", [
  CurrencyEnum.USD,
  CurrencyEnum.EUR,
  CurrencyEnum.GBP,
]);

export enum OrganizationMemberRoleEnum {
  ADMIN = "ADMIN",
  BOOKING_MANAGER = "BOOKING_MANAGER",
  TRIP_MANAGER = "TRIP_MANAGER",
}
export const organizationMemberRoleEnum = pgEnum("organization_member_role", [
  OrganizationMemberRoleEnum.ADMIN,
  OrganizationMemberRoleEnum.BOOKING_MANAGER,
  OrganizationMemberRoleEnum.TRIP_MANAGER,
]);

export enum RegionsEnum {
  EUROPE = "EUROPE",
  NORTH_AMERICA = "NORTH_AMERICA",
  SOUTH_AMERICA = "SOUTH_AMERICA",
  CENTRAL_AMERICA = "CENTRAL_AMERICA",
  AFRICA = "AFRICA",
  ASIA = "ASIA",
  OCEANIA = "OCEANIA",
  ANTARCTICA = "ANTARCTICA",
  MIDDLE_EAST = "MIDDLE_EAST",
}
export const regionsEnum = pgEnum("regions", [
  RegionsEnum.EUROPE,
  RegionsEnum.NORTH_AMERICA,
  RegionsEnum.SOUTH_AMERICA,
  RegionsEnum.CENTRAL_AMERICA,
  RegionsEnum.AFRICA,
  RegionsEnum.ASIA,
  RegionsEnum.OCEANIA,
  RegionsEnum.ANTARCTICA,
  RegionsEnum.MIDDLE_EAST,
]);

// New enums for countries table based on countries.json structure
export enum CountryRegionEnum {
  AFRICA = "Africa",
  ANTARCTICA = "Antarctica",
  ASIA = "Asia",
  EUROPE = "Europe",
  NORTH_AMERICA = "North America",
  OCEANIA = "Oceania",
  SOUTH_AMERICA = "South America",
}
export const countryRegionEnum = pgEnum("country_region", [
  CountryRegionEnum.AFRICA,
  CountryRegionEnum.ANTARCTICA,
  CountryRegionEnum.ASIA,
  CountryRegionEnum.EUROPE,
  CountryRegionEnum.NORTH_AMERICA,
  CountryRegionEnum.OCEANIA,
  CountryRegionEnum.SOUTH_AMERICA,
]);

export enum CountrySubRegionEnum {
  NORTH_AFRICA = "North Africa",
  WEST_AFRICA = "West Africa",
  EAST_AFRICA = "East Africa",
  CENTRAL_AFRICA = "Central Africa",
  SOUTHERN_AFRICA = "Southern Africa",
  EAST_ASIA = "East Asia",
  SOUTH_ASIA = "South Asia",
  SOUTHEAST_ASIA = "Southeast Asia",
  SOUTH_EAST_ASIA = "South East Asia",
  CENTRAL_ASIA = "Central Asia",
  WESTERN_ASIA = "Western Asia",
  MIDDLE_EAST = "Middle East",
  NORTHERN_EUROPE = "Northern Europe",
  SOUTHERN_EUROPE = "Southern Europe",
  EASTERN_EUROPE = "Eastern Europe",
  WESTERN_EUROPE = "Western Europe",
  NORTH_AMERICA = "North America",
  CENTRAL_AMERICA = "Central America",
  CARIBBEAN = "Caribbean",
  AUSTRALIA_AND_NEW_ZEALAND = "Australia and New Zealand",
  MELANESIA = "Melanesia",
  MICRONESIA = "Micronesia",
  POLYNESIA = "Polynesia",
  SOUTH_AMERICA = "South America",
  ANTARCTICA = "Antarctica",
}
export const countrySubRegionEnum = pgEnum("country_sub_region", [
  CountrySubRegionEnum.NORTH_AFRICA,
  CountrySubRegionEnum.WEST_AFRICA,
  CountrySubRegionEnum.EAST_AFRICA,
  CountrySubRegionEnum.CENTRAL_AFRICA,
  CountrySubRegionEnum.SOUTHERN_AFRICA,
  CountrySubRegionEnum.EAST_ASIA,
  CountrySubRegionEnum.SOUTH_ASIA,
  CountrySubRegionEnum.SOUTHEAST_ASIA,
  CountrySubRegionEnum.SOUTH_EAST_ASIA,
  CountrySubRegionEnum.CENTRAL_ASIA,
  CountrySubRegionEnum.WESTERN_ASIA,
  CountrySubRegionEnum.MIDDLE_EAST,
  CountrySubRegionEnum.NORTHERN_EUROPE,
  CountrySubRegionEnum.SOUTHERN_EUROPE,
  CountrySubRegionEnum.EASTERN_EUROPE,
  CountrySubRegionEnum.WESTERN_EUROPE,
  CountrySubRegionEnum.NORTH_AMERICA,
  CountrySubRegionEnum.CENTRAL_AMERICA,
  CountrySubRegionEnum.CARIBBEAN,
  CountrySubRegionEnum.AUSTRALIA_AND_NEW_ZEALAND,
  CountrySubRegionEnum.MELANESIA,
  CountrySubRegionEnum.MICRONESIA,
  CountrySubRegionEnum.POLYNESIA,
  CountrySubRegionEnum.SOUTH_AMERICA,
  CountrySubRegionEnum.ANTARCTICA,
]);

export enum TripStatusEnum {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}
export const tripStatusEnum = pgEnum("trip_status", [
  TripStatusEnum.DRAFT,
  TripStatusEnum.PUBLISHED,
  TripStatusEnum.ARCHIVED,
]);

export enum ItineraryTypeEnum {
  TEXT = "TEXT",
  STRUCTURED = "STRUCTURED",
}
export const itineraryTypeEnum = pgEnum("itinerary_type", [
  ItineraryTypeEnum.TEXT,
  ItineraryTypeEnum.STRUCTURED,
]);

export enum CustomerGenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export const genderEnum = pgEnum("customer_gender", [
  CustomerGenderEnum.MALE,
  CustomerGenderEnum.FEMALE,
]);

export enum CustomerTypeEnum {
  NEWBIE = "NEWBIE",
  REPEATER = "REPEATER",
  VIP = "VIP",
  BLACKLIST = "BLACKLIST",
}
export const customerTypeEnum = pgEnum("customer_type", [
  CustomerTypeEnum.NEWBIE,
  CustomerTypeEnum.REPEATER,
  CustomerTypeEnum.VIP,
  CustomerTypeEnum.BLACKLIST,
]);

export enum FormQuestionTypeEnum {
  SHORT_TEXT = "SHORT_TEXT",
  LONG_TEXT = "LONG_TEXT",
  SINGLE_OPTION = "SINGLE_OPTION",
  MULTIPLE_OPTIONS = "MULTIPLE_OPTIONS",
  DATE = "DATE",
  FILE = "FILE",
  SIGNATURE = "SIGNATURE",
  CONSENT = "CONSENT",
  HTML = "HTML",
  PHONE = "PHONE",
  EMAIL = "EMAIL",
}
export const formQuestionTypeEnum = pgEnum("form_question_type", [
  FormQuestionTypeEnum.SHORT_TEXT,
  FormQuestionTypeEnum.LONG_TEXT,
  FormQuestionTypeEnum.SINGLE_OPTION,
  FormQuestionTypeEnum.MULTIPLE_OPTIONS,
  FormQuestionTypeEnum.DATE,
  FormQuestionTypeEnum.FILE,
  FormQuestionTypeEnum.SIGNATURE,
  FormQuestionTypeEnum.CONSENT,
  FormQuestionTypeEnum.HTML,
  FormQuestionTypeEnum.PHONE,
  FormQuestionTypeEnum.EMAIL,
]);

export enum ApplicationStatusEnum {
  SUBMITTED = "SUBMITTED",
  NEXT_PHASE = "NEXT_PHASE",
  REMINDER = "REMINDER",
  PAYMENT_PENDING = "PAYMENT_PENDING",
  READY_TO_BOOK = "READY_TO_BOOK",
  SELECTED = "SELECTED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  ARCHIVED = "ARCHIVED",
}
export const applicationStatusEnum = pgEnum("application_status", [
  ApplicationStatusEnum.SUBMITTED, // Applicant has submitted new information and is awaiting staff review
  ApplicationStatusEnum.NEXT_PHASE, // Staff has reviewed the application and applicant can continue to next phase
  ApplicationStatusEnum.REMINDER, // Added REMINDER status
  ApplicationStatusEnum.PAYMENT_PENDING, // Staff has accepted the application and applicant can now pay for the trip
  ApplicationStatusEnum.READY_TO_BOOK, // Applicant is ready to book
  ApplicationStatusEnum.SELECTED, // Applicant has been selected for the trip and is now a participant
  ApplicationStatusEnum.REJECTED, // Staff has rejected the application and applicant cannot continue
  ApplicationStatusEnum.CANCELLED, // Applicant has cancelled their application
  ApplicationStatusEnum.ARCHIVED, // Applicant has been archived

  // Future
  // "PAYMENT_CONFIRMED", // Staff has confirmed the payment and the trip is now booked
  // "PAYMENT_FAILED", // Participant's payment has failed and the trip is not booked
]);

export enum PaymentStatusEnum {
  NOT_APPLICABLE = "NOT_APPLICABLE",
  PENDING = "PENDING",
  DEPOSIT_PAID = "DEPOSIT_PAID",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}
export const paymentStatusEnum = pgEnum("payment_status", [
  PaymentStatusEnum.NOT_APPLICABLE,
  PaymentStatusEnum.PENDING,
  PaymentStatusEnum.DEPOSIT_PAID,
  PaymentStatusEnum.PAID,
  PaymentStatusEnum.FAILED,
  PaymentStatusEnum.REFUNDED,
]);

export enum NotificationChannelEnum {
  EMAIL = "EMAIL",
  WHATSAPP = "WHATSAPP",
}
export const notificationChannelEnum = pgEnum("notification_channel", [
  NotificationChannelEnum.EMAIL,
  NotificationChannelEnum.WHATSAPP,
]);

export enum ReviewStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}
export const reviewStatusEnum = pgEnum("review_status", [
  ReviewStatusEnum.PENDING,
  ReviewStatusEnum.APPROVED,
  ReviewStatusEnum.REJECTED,
]);

export enum AwardTypeEnum {
  MVP = "MVP",
  UNANIMOUS_MVP = "UNANIMOUS_MVP",
}
export const awardTypeEnum = pgEnum("platform_award_type", [
  AwardTypeEnum.MVP,
  AwardTypeEnum.UNANIMOUS_MVP,
]);

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `paytravel_${name}`);

export const organizations = createTable("organizations", {
  id: uuid().primaryKey().defaultRandom(),
  externalId: text().notNull(), // Clerk ID

  // Required
  name: text().notNull(),
  slug: text().notNull().unique(),

  // Optional
  customDomain: text().unique(),
  priceVisibleAfterPhaseId: uuid(), // If null, price is visible for everyone.

  branding: jsonb().$type<{
    logoUrl: string;
    avatarUrl: string;
    primaryColor: string;
    backgroundColor: string;
  }>(),

  settings: jsonb().$type<{
    tripsUrl: string;
    language: LanguageEnum;
    description: string;
    homepageTitle: string;
    homepageDescription: string;
    seoTitle: string;
    seoDescription: string;
    tripSingularName: string;
    tripPluralName: string;
    companyName: string;
    companyShortName: string;
    gamificationClubName: string;
    companyAddress: string;
    foundedAt: Date;
    defaultCurrency: CurrencyEnum;
    fromEmail: string;
    supportEmail: string;
    whatsapp: string;
    instagram: string;
    socialLinks: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
      youtube?: string;
    };
    navigationMenu: {
      label: string;
      url: string;
    }[];
    termsUrl: string;
    privacyPolicyUrl: string;
    cookiesPolicyUrl: string;
  }>(),

  ...timestamps,
});

export const organizationMembers = createTable(
  "organization_members",
  {
    ...ids,

    // Required
    externalId: text().notNull(), // Clerk ID
    name: text().notNull(),
    email: text().notNull(),
    role: organizationMemberRoleEnum().notNull(),

    ...timestamps,
  },
  (t) => ({
    // Unique constraints within an organization
    externalIdUnique: unique().on(t.organizationId, t.externalId),
  }),
);

export const trips = createTable(
  "trips",
  {
    ...ids,

    // Required
    slug: text().notNull(),
    title: text().notNull(),
    startDate: date({ mode: "date" }).notNull(),
    endDate: date({ mode: "date" }).notNull(),

    isOpen: boolean().notNull().default(true),
    isHidden: boolean().notNull().default(false),
    isVIP: boolean().notNull().default(false),
    status: tripStatusEnum().notNull().default(TripStatusEnum.PUBLISHED),

    // Optional
    externalId: text(),
    description: text(), // required in the UI
    startLocation: text(),
    endLocation: text(),
    itineraryType: itineraryTypeEnum(), // required in the UI
    itineraryText: text(), // required in the UI
    itinerary: jsonb().$type<
      {
        photoUrl: string;
        title: string;
        description: string;
      }[]
    >(), // required in the UI
    organizerReference: text(),
    destination: text(), // required in the UI
    pricePerParticipant: integer(), // required in the UI
    currency: supportedCurrenciesEnum(), // required in the UI
    countries: jsonb().$type<string[]>(),
    galleryUrls: jsonb().$type<string[]>(), // required in the UI
    checkoutUrl: text(),

    inclusions: jsonb().$type<
      {
        title: string;
        description: string;
      }[]
    >(),

    exclusions: jsonb().$type<
      {
        title: string;
        description: string;
      }[]
    >(),

    faqs: jsonb().$type<
      {
        question: string;
        answer: string;
      }[]
    >(),

    leaderIds: jsonb().$type<string[]>(),

    // Future
    // maxParticipants: integer(),
    // minParticipants: integer(),
    // maxAge: integer(),
    // minAge: integer(),
    // maxApplications: integer(),

    ...timestamps,
  },
  (t) => ({
    // Create indexes for fast filtering
    organizationIdIdx: index("organization_id_idx").on(t.organizationId),
    recentTripsIdx: index("recent_trips_idx").on(
      t.organizationId,
      desc(t.updatedAt),
    ),
    startDateIdx: index("start_date_idx").on(t.organizationId, t.startDate),

    // Unique constraints within an organization
    slugUnique: unique(TRIP_ORG_SLUG_UNIQUE_CONSTRAINT).on(
      t.organizationId,
      t.slug,
    ),
    orgRefUnique: unique(TRIP_ORG_ORGREF_UNIQUE_CONSTRAINT).on(
      t.organizationId,
      t.organizerReference,
    ),
  }),
);

export const leaders = createTable(
  "leaders",
  {
    ...ids,

    // Required
    name: text().notNull(),
    isActive: boolean().notNull().default(true),

    // Optional - Important fields
    bio: text(),
    avatarUrl: text(),

    // Optional - Profile data (less important fields stored as JSON)
    profile: jsonb().$type<{
      alias?: string;
      nationality?: string;
      languages?: string[];
      specialties?: string[];
      yearsOfExperience?: number;
      certifications?: {
        name: string;
        issuedBy: string;
        issuedAt: Date;
        expiresAt?: Date;
      }[];
      socialLinks?: {
        instagram?: string;
        facebook?: string;
        linkedin?: string;
        website?: string;
      };
    }>(),

    ...timestamps,
  },
  (t) => ({
    // Create indexes for fast filtering
    organizationIdIdx: index("leaders_organization_id_idx").on(
      t.organizationId,
    ),
    activeIdx: index("leaders_active_idx").on(t.organizationId, t.isActive),
  }),
);

export const customers = createTable(
  "customers",
  {
    ...ids,

    // Required
    email: text().notNull(),
    publicId: text().notNull(),
    type: customerTypeEnum().notNull().default(CustomerTypeEnum.NEWBIE),
    isHidden: boolean().notNull().default(false),

    // Optional
    userId: text(), // Supabase auth ID
    externalId: text(), // e.g WordPress ID
    mergedExternalIds: jsonb().$type<string[]>(), // e.g WordPress IDs merged from different profiles

    firstName: text(),
    lastName: text(),
    alias: text(),
    avatarUrl: text(),

    phone: text(),
    country: text(),
    dateOfBirth: date({ mode: "date" }),
    nationality: text(),
    gender: genderEnum(),
    visitedCountries: jsonb().$type<string[]>(),
    wishlistCountries: jsonb().$type<string[]>(),

    publicProfile: jsonb().$type<{
      favoriteCountry: string;
      worstCountry: string;
    }>(),

    // Future
    // subscriptionPlan: subscriptionPlanEnum(),

    ...timestamps,
  },
  (t) => ({
    // Unique constraints within an organization
    emailUnique: unique().on(t.organizationId, t.email),
    phoneUnique: unique().on(t.organizationId, t.phone),
    userIdUnique: unique().on(t.organizationId, t.userId),
    publicIdUnique: unique().on(t.organizationId, t.publicId),
  }),
);

export const phases = createTable(
  "phases",
  {
    ...ids,

    // Required
    name: text().notNull(),
    requiresPayment: boolean().notNull().default(false),

    // Optional
    order: integer(),
    formId: uuid(),

    ...timestamps,
  },
  (t) => ({
    // Create indexes for fast filtering
    organizationIdIdx: index("phases_organization_id_idx").on(t.organizationId),

    // Unique constraints within an organization
    orderUnique: unique().on(t.organizationId, t.order),
  }),
);

export const forms = createTable("forms", {
  ...ids,

  // Required
  title: text().notNull(),

  // Optional
  settings: jsonb().$type<{
    description: string;
    buttonText: string;
    thankYouMessage: string;
  }>(),

  ...timestamps,
});

export const formQuestions = createTable(
  "form_questions",
  {
    ...ids,

    // Required
    formId: uuid().notNull(),
    label: text().notNull(),
    type: formQuestionTypeEnum().notNull(),
    order: integer().notNull(),
    page: integer().notNull().default(1),
    isHidden: boolean().notNull().default(false),
    isRequired: boolean().notNull().default(true),
    allowOtherOption: boolean().notNull().default(false),

    description: text(),
    htmlContent: text(),

    // Optional
    options: jsonb().$type<{ label: string; value: string }[]>(),
    placeholder: text(),

    ...timestamps,
  },
  (t) => ({
    // Create indexes for fast filtering
    formIdIdx: index("form_questions_form_id_idx").on(t.formId),

    // Unique constraints within an organization
    orderUnique: unique().on(t.formId, t.page, t.order),
  }),
);

export const notifications = createTable("notifications", {
  ...ids,

  // Required
  applicationId: uuid().notNull(),
  channel: notificationChannelEnum().notNull(),

  // Optional
  templateId: uuid(),
  applicationStatus: applicationStatusEnum(),
  phaseId: uuid(),

  isSent: boolean().notNull().default(false),
  sentAt: timestamp({ withTimezone: true }),
  errorMessage: text(),

  ...timestamps,
});

export const notificationTemplates = createTable("notification_templates", {
  ...ids,

  // Required
  applicationStatus: applicationStatusEnum().notNull(),

  // Optional
  phaseId: uuid(),

  isEmailEnabled: boolean().notNull().default(false),
  emailSubject: text(),
  emailBody: text(),

  isWhatsappEnabled: boolean().notNull().default(false),
  whatsappSubject: text(),
  whatsappBody: text(),

  ...timestamps,
});

export const applications = createTable(
  "applications",
  {
    ...ids,

    // Required
    tripId: uuid().notNull(),
    customerId: uuid().notNull(),
    isParticipant: boolean().notNull().default(false),
    status: applicationStatusEnum()
      .notNull()
      .default(ApplicationStatusEnum.SUBMITTED),

    // Optional
    currentPhaseId: uuid(),
    paymentStatus: paymentStatusEnum()
      .notNull()
      .default(PaymentStatusEnum.NOT_APPLICABLE),
    submittedAt: timestamp({ withTimezone: true }),

    ...timestamps,
  },
  (t) => ({
    // Create indexes for fast filtering
    orgTripIdx: index("applications_org_trip_idx").on(
      t.organizationId,
      t.tripId,
    ),
    orgCustomerIdx: index("applications_org_customer_idx").on(
      t.organizationId,
      t.customerId,
    ),
    tripCustomerIdx: index("applications_trip_customer_idx").on(
      t.organizationId,
      t.tripId,
      t.customerId,
    ),
    statusIdx: index("applications_status_idx").on(t.status),
    submittedAtIdx: index("applications_submitted_at_idx").on(
      t.organizationId,
      t.submittedAt,
    ),
    currentPhaseIdx: index("applications_current_phase_idx").on(
      t.organizationId,
      t.tripId,
      t.customerId,
      t.currentPhaseId,
    ),

    // Unique constraints within an organization
    tripCustomerUnique: unique().on(t.organizationId, t.tripId, t.customerId), // A customer can only apply to a trip once

    currentPhaseUnique: unique().on(
      t.organizationId,
      t.tripId,
      t.customerId,
      t.currentPhaseId,
    ), // A customer can only have one current phase per trip
  }),
);

export const applicationResponses = createTable(
  "application_responses",
  {
    ...ids,

    // Required
    applicationId: uuid().notNull(),
    phaseId: uuid().notNull(),

    // Optional
    submittedAt: timestamp({ withTimezone: true }),
    answers: jsonb().$type<
      {
        formQuestionId: string;
        answer: string | string[] | boolean | number | null;
      }[]
    >(),

    ...timestamps,
  },
  (t) => ({
    // Create indexes for fast filtering
    applicationIdIdx: index("application_responses_application_id_idx").on(
      t.organizationId,
      t.applicationId,
    ),

    // Unique constraints within an organization
    applicationPhaseUnique: unique().on(
      t.organizationId,
      t.applicationId,
      t.phaseId,
    ),
  }),
);

export const reviews = createTable(
  "reviews",
  {
    ...ids,

    // Make FKs nullable to accommodate imported reviews
    tripId: uuid(),
    customerId: uuid(),

    rating: integer().notNull(), // 1-5
    content: text().notNull(),
    status: reviewStatusEnum().notNull().default(ReviewStatusEnum.PENDING),

    ...timestamps,
  },
  (t) => ({
    // Create indexes for fast filtering
    orgTripIdx: index("review_org_trip_idx").on(t.organizationId, t.tripId),
    orgCustomerIdx: index("review_org_customer_idx").on(
      t.organizationId,
      t.customerId,
    ),
    ratingIdx: index("review_rating_idx").on(t.rating),

    // Unique constraints within an organization
    tripCustomerUnique: unique().on(t.organizationId, t.tripId, t.customerId), // A customer can only review a trip once
  }),
);

export const awards = createTable(
  "awards",
  {
    ...ids,

    // Required
    type: awardTypeEnum().notNull(),
    name: text().notNull(), // e.g. "MVP"

    // Optional
    description: text(),
    iconUrl: text(),
    isPublic: boolean().notNull().default(true),

    ...timestamps,
  },
  (t) => ({
    // Unique constraints within an organization
    nameUnique: unique("award_org_name_uq").on(t.organizationId, t.name),
  }),
);

export const customerAwards = createTable(
  "customer_awards",
  {
    ...ids,

    // Required
    customerId: uuid().notNull(),
    awardId: uuid().notNull(),

    // Optional
    tripId: uuid(), // Optional, if the award is for a specific trip

    ...timestamps,
  },
  (t) => ({
    // Unique constraints within an organization
    customerTripAwardUnique: unique("customer_award_per_trip_uq").on(
      t.organizationId,
      t.customerId,
      t.tripId,
      t.awardId,
    ),
  }),
);

export const countries = createTable(
  "countries",
  {
    id: uuid().primaryKey().defaultRandom(),

    // Required
    name: text().notNull(),
    code: text().notNull(), // 3-letter country code (e.g., "USA", "GBR")
    iso2: text().notNull(), // 2-letter ISO code (e.g., "US", "GB")
    region: countryRegionEnum().notNull(),
    subRegion: countrySubRegionEnum().notNull(),
    flag: text().notNull(), // Unicode flag emoji

    // Optional
    isActive: boolean().notNull().default(true),

    ...timestamps,
  },
  (t) => ({
    // Unique constraints
    codeUnique: unique("country_code_uq").on(t.code),
    iso2Unique: unique("country_iso2_uq").on(t.iso2),
    nameUnique: unique("country_name_uq").on(t.name),

    // Indexes for fast filtering
    regionIdx: index("countries_region_idx").on(t.region),
    subRegionIdx: index("countries_sub_region_idx").on(t.subRegion),
    activeIdx: index("countries_active_idx").on(t.isActive),
  }),
);

// Define relations
import { relations } from "drizzle-orm";

export const tripsRelations = relations(trips, ({ many, one }) => ({
  organization: one(organizations, {
    fields: [trips.organizationId],
    references: [organizations.id],
  }),
  applications: many(applications),
  leaders: many(leaders),
}));

export const leadersRelations = relations(leaders, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [leaders.organizationId],
    references: [organizations.id],
  }),
  trips: many(trips),
}));

export const customersRelations = relations(customers, ({ many, one }) => ({
  organization: one(organizations, {
    fields: [customers.organizationId],
    references: [organizations.id],
  }),
  applications: many(applications),
}));

export const phasesRelations = relations(phases, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [phases.organizationId],
    references: [organizations.id],
  }),
  form: one(forms, {
    fields: [phases.formId],
    references: [forms.id],
  }),
  responses: many(applicationResponses),
}));

export const formsRelations = relations(forms, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [forms.organizationId],
    references: [organizations.id],
  }),
  phases: many(phases),
  questions: many(formQuestions),
}));

export const formQuestionsRelations = relations(formQuestions, ({ one }) => ({
  organization: one(organizations, {
    fields: [formQuestions.organizationId],
    references: [organizations.id],
  }),
  form: one(forms, {
    fields: [formQuestions.formId],
    references: [forms.id],
  }),
}));

export const applicationsRelations = relations(
  applications,
  ({ one, many }) => ({
    organization: one(organizations, {
      fields: [applications.organizationId],
      references: [organizations.id],
    }),
    trip: one(trips, {
      fields: [applications.tripId],
      references: [trips.id],
    }),
    customer: one(customers, {
      fields: [applications.customerId],
      references: [customers.id],
    }),
    responses: many(applicationResponses),
  }),
);

export const applicationResponsesRelations = relations(
  applicationResponses,
  ({ one }) => ({
    organization: one(organizations, {
      fields: [applicationResponses.organizationId],
      references: [organizations.id],
    }),
    application: one(applications, {
      fields: [applicationResponses.applicationId],
      references: [applications.id],
    }),
    phase: one(phases, {
      fields: [applicationResponses.phaseId],
      references: [phases.id],
    }),
  }),
);

// Update Organization relations
export const organizationsRelations = relations(organizations, ({ many }) => ({
  trips: many(trips),
  customers: many(customers),
  phases: many(phases),
  forms: many(forms),
  formQuestions: many(formQuestions),
  applications: many(applications),
  applicationResponses: many(applicationResponses),
  reviews: many(reviews),
  organizationMembers: many(organizationMembers),
  leaders: many(leaders),
  // achievements: many(achievements),
  // achievementTiers: many(achievementTiers), // New: if direct access needed
  // perks: many(perks), // New: if direct access needed
}));

export const countriesRelations = relations(countries, ({ many }) => ({
  // Future: Add relations when countries are referenced by other tables
  // customers: many(customers), // If customers have nationality/country fields
  // trips: many(trips), // If trips have destination country fields
}));
