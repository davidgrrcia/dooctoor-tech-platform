import type { z } from "zod";
import type {
  applicationDBSchema,
  applicationResponseDBSchema,
  awardDBSchema,
  createApplicationDBSchema,
  createApplicationResponseDBSchema,
  createAwardDBSchema,
  createCustomerAwardDBSchema,
  createCustomerDBSchema,
  createFormDBSchema,
  createFormQuestionDBSchema,
  createLeaderDBSchema,
  createNotificationDBSchema,
  createNotificationTemplateDBSchema,
  createOrganizationDBSchema,
  createOrganizationMembersDBSchema,
  createPhaseDBSchema,
  createReviewDBSchema,
  createTripDBSchema,
  customerAwardDBSchema,
  customerDBSchema,
  formDBSchema,
  formQuestionDBSchema,
  leaderDBSchema,
  notificationDBSchema,
  notificationTemplateDBSchema,
  organizationDBSchema,
  organizationMembersDBSchema,
  phaseDBSchema,
  reviewDBSchema,
  tripDBSchema,
  updateApplicationDBSchema,
  updateApplicationResponseDBSchema,
  updateAwardDBSchema,
  updateCustomerAwardDBSchema,
  updateCustomerDBSchema,
  updateFormDBSchema,
  updateFormQuestionDBSchema,
  updateLeaderDBSchema,
  updateNotificationDBSchema,
  updateNotificationTemplateDBSchema,
  updateOrganizationDBSchema,
  updateOrganizationMembersDBSchema,
  updatePhaseDBSchema,
  updateReviewDBSchema,
  updateTripDBSchema,
} from "./consts";

// Schema Types
export type OrganizationDB = z.infer<typeof organizationDBSchema>;
export type CreateOrganizationDBInput = z.infer<
  typeof createOrganizationDBSchema
>;
export type UpdateOrganizationDBInput = z.infer<
  typeof updateOrganizationDBSchema
>;

export type OrganizationMembersDB = z.infer<typeof organizationMembersDBSchema>;
export type CreateOrganizationMembersDBInput = z.infer<
  typeof createOrganizationMembersDBSchema
>;
export type UpdateOrganizationMembersDBInput = z.infer<
  typeof updateOrganizationMembersDBSchema
>;

export type TripDB = z.infer<typeof tripDBSchema>;
export type CreateTripDBInput = z.infer<typeof createTripDBSchema>;
export type UpdateTripDBInput = z.infer<typeof updateTripDBSchema>;

export type ApplicationDB = z.infer<typeof applicationDBSchema>;
export type CreateApplicationDBInput = z.infer<
  typeof createApplicationDBSchema
>;
export type UpdateApplicationDBInput = z.infer<
  typeof updateApplicationDBSchema
>;

export type CustomerDB = z.infer<typeof customerDBSchema>;
export type CreateCustomerDBInput = z.infer<typeof createCustomerDBSchema>;
export type UpdateCustomerDBInput = z.infer<typeof updateCustomerDBSchema>;

export type LeaderDB = z.infer<typeof leaderDBSchema>;
export type CreateLeaderDBInput = z.infer<typeof createLeaderDBSchema>;
export type UpdateLeaderDBInput = z.infer<typeof updateLeaderDBSchema>;

export type PhaseDB = z.infer<typeof phaseDBSchema>;
export type CreatePhaseDBInput = z.infer<typeof createPhaseDBSchema>;
export type UpdatePhaseDBInput = z.infer<typeof updatePhaseDBSchema>;

export type FormDB = z.infer<typeof formDBSchema>;
export type CreateFormDBInput = z.infer<typeof createFormDBSchema>;
export type UpdateFormDBInput = z.infer<typeof updateFormDBSchema>;

export type FormQuestionDB = z.infer<typeof formQuestionDBSchema>;
export type CreateFormQuestionDBInput = z.infer<
  typeof createFormQuestionDBSchema
>;
export type UpdateFormQuestionDBInput = z.infer<
  typeof updateFormQuestionDBSchema
>;

export type ApplicationResponseDB = z.infer<typeof applicationResponseDBSchema>;
export type CreateApplicationResponseDBInput = z.infer<
  typeof createApplicationResponseDBSchema
>;
export type UpdateApplicationResponseDBInput = z.infer<
  typeof updateApplicationResponseDBSchema
>;

export type NotificationDB = z.infer<typeof notificationDBSchema>;
export type CreateNotificationDBInput = z.infer<
  typeof createNotificationDBSchema
>;
export type UpdateNotificationDBInput = z.infer<
  typeof updateNotificationDBSchema
>;

export type NotificationTemplateDB = z.infer<
  typeof notificationTemplateDBSchema
>;
export type CreateNotificationTemplateDBInput = z.infer<
  typeof createNotificationTemplateDBSchema
>;
export type UpdateNotificationTemplateDBInput = z.infer<
  typeof updateNotificationTemplateDBSchema
>;

export type ReviewDB = z.infer<typeof reviewDBSchema>;
export type CreateReviewDBInput = z.infer<typeof createReviewDBSchema>;
export type UpdateReviewDBInput = z.infer<typeof updateReviewDBSchema>;

// Award Types
export type AwardDB = z.infer<typeof awardDBSchema>;
export type CreateAwardDBInput = z.infer<typeof createAwardDBSchema>;
export type UpdateAwardDBInput = z.infer<typeof updateAwardDBSchema>;

export type CustomerAwardDB = z.infer<typeof customerAwardDBSchema>;
export type CreateCustomerAwardDBInput = z.infer<
  typeof createCustomerAwardDBSchema
>;
export type UpdateCustomerAwardDBInput = z.infer<
  typeof updateCustomerAwardDBSchema
>;

export interface CustomerProfileStats {
  tripCount: number;
  reviewCount: number;
  customerCreatedAt: Date | null;
  mvpAwardCount: number;
  mvpIconUrl: string | null;
}
