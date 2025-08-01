import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import {
  applicationResponses,
  applications,
  awards,
  customerAwards,
  customers,
  formQuestions,
  forms,
  leaders,
  notifications,
  notificationTemplates,
  organizationMembers,
  organizations,
  phases,
  reviews,
  trips,
  TripStatusEnum,
} from "./schema";

// Zod Schemas
export const organizationDBSchema = createSelectSchema(organizations);
export const createOrganizationDBSchema = createInsertSchema(organizations);
export const updateOrganizationDBSchema = createUpdateSchema(organizations);

export const organizationMembersDBSchema =
  createSelectSchema(organizationMembers);
export const createOrganizationMembersDBSchema =
  createInsertSchema(organizationMembers);
export const updateOrganizationMembersDBSchema =
  createUpdateSchema(organizationMembers);

export const tripDBSchema = createSelectSchema(trips);
export const createTripDBSchema = createInsertSchema(trips);
export const updateTripDBSchema = createUpdateSchema(trips);

export const applicationDBSchema = createSelectSchema(applications);
export const createApplicationDBSchema = createInsertSchema(applications);
export const updateApplicationDBSchema = createUpdateSchema(applications);

export const customerDBSchema = createSelectSchema(customers);
export const createCustomerDBSchema = createInsertSchema(customers);
export const updateCustomerDBSchema = createUpdateSchema(customers);

export const leaderDBSchema = createSelectSchema(leaders);
export const createLeaderDBSchema = createInsertSchema(leaders);
export const updateLeaderDBSchema = createUpdateSchema(leaders);

export const phaseDBSchema = createSelectSchema(phases);
export const createPhaseDBSchema = createInsertSchema(phases);
export const updatePhaseDBSchema = createUpdateSchema(phases);

export const formDBSchema = createSelectSchema(forms);
export const createFormDBSchema = createInsertSchema(forms);
export const updateFormDBSchema = createUpdateSchema(forms);

export const formQuestionDBSchema = createSelectSchema(formQuestions);
export const createFormQuestionDBSchema = createInsertSchema(formQuestions);
export const updateFormQuestionDBSchema = createUpdateSchema(formQuestions);

export const applicationResponseDBSchema =
  createSelectSchema(applicationResponses);
export const createApplicationResponseDBSchema =
  createInsertSchema(applicationResponses);
export const updateApplicationResponseDBSchema =
  createUpdateSchema(applicationResponses);

export const notificationDBSchema = createSelectSchema(notifications);
export const createNotificationDBSchema = createInsertSchema(notifications);
export const updateNotificationDBSchema = createUpdateSchema(notifications);

export const notificationTemplateDBSchema = createSelectSchema(
  notificationTemplates,
);
export const createNotificationTemplateDBSchema = createInsertSchema(
  notificationTemplates,
);
export const updateNotificationTemplateDBSchema = createUpdateSchema(
  notificationTemplates,
);

export const reviewDBSchema = createSelectSchema(reviews);
export const createReviewDBSchema = createInsertSchema(reviews);
export const updateReviewDBSchema = createUpdateSchema(reviews);

// Award Schemas
export const awardDBSchema = createSelectSchema(awards);
export const createAwardDBSchema = createInsertSchema(awards);
export const updateAwardDBSchema = createUpdateSchema(awards);

export const customerAwardDBSchema = createSelectSchema(customerAwards);
export const createCustomerAwardDBSchema = createInsertSchema(customerAwards);
export const updateCustomerAwardDBSchema = createUpdateSchema(customerAwards);

// TODO: Clean up, and organize.
// Trip filtering and sorting types.
export type TripOrderBy =
  | "startDate"
  | "pricePerParticipant"
  | "createdAt"
  | "duration";
export type OrderDirection = "asc" | "desc";
export type ViewMode = "grid" | "table";

export interface TripFilters {
  orderBy?: "startDate" | "createdAt" | "duration";
  orderDirection?: "asc" | "desc";
  isOpen?: boolean;
  isHidden?: boolean;
  minStartDate?: Date;
  status?: TripStatusEnum;
  countries?: string[];
  months?: number[];
  excludeArchived?: boolean;
}
