import dayjs, { Dayjs } from "dayjs";
import { Visit, VisitType } from "../../services/visits/type";
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
