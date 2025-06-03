import dayjs, { Dayjs } from "dayjs";
import { ActivityType, Visit, VisitType } from "../../services/visits/type";
import { BadgeProps } from "antd";

export function getMonthlyVisits(visits: Visit[], date: Dayjs) {
  const formattedCurrentDate = date.format("MM");
  return visits.filter(
    ({ scheduledAt }) =>
      dayjs(scheduledAt).format("MM") === formattedCurrentDate
  );
}

export function getDailyVisits(visits: Visit[], date: Dayjs) {
  const formattedCurrentDate = date.format("YYYY-MM-DD");
  return visits.filter(
    ({ scheduledAt }) =>
      dayjs(scheduledAt).format("YYYY-MM-DD") === formattedCurrentDate
  );
}

export function getVisitBadgeColor(type: VisitType): BadgeProps["status"] {
  //
  switch (type) {
    case VisitType.AUDIT:
      return "error";

    case VisitType.SUPPORT:
      return "processing";

    case VisitType.MERCHANDISING:
      return "default";

    case VisitType.OTHER:
      return "success";

    case VisitType.SALES:
      return "warning";
  }
}

export function getActivityLabel(action: ActivityType): string {
  switch (action) {
    case ActivityType.CHECK_PRODUCTS:
      return "Check Products";
    case ActivityType.DISCUSS_PROMOTIONS:
      return "Discuss Promotions";
    case ActivityType.PLACE_ORDER:
      return "Place Order";
    case ActivityType.SCHEDULE_FOLLOW_UP:
      return "Schedule Follow-Up";
    case ActivityType.ADD_CONTACT_INFO:
      return "Add Contact Info";
    case ActivityType.OTHER:
      return "Other";
    default:
      return "Unknown Action";
  }
}

export function getActivityColor(action: ActivityType): string {
  switch (action) {
    case ActivityType.CHECK_PRODUCTS:
      return "#3498db"; // Blue
    case ActivityType.DISCUSS_PROMOTIONS:
      return "#e67e22"; // Orange
    case ActivityType.PLACE_ORDER:
      return "#2ecc71"; // Green
    case ActivityType.SCHEDULE_FOLLOW_UP:
      return "#9b59b6"; // Purple
    case ActivityType.ADD_CONTACT_INFO:
      return "#f1c40f"; // Yellow
    case ActivityType.OTHER:
      return "#95a5a6"; // Gray
    default:
      return "#7f8c8d"; // Default Gray
  }
}
