export enum ReportStatus {
  REPORT_STATUS_CREATED = "REPORT_STATUS_CREATED",
  REPORT_STATUS_ON_PROGRESS_BY_CONSUNTANT = "REPORT_STATUS_ON_PROGRESS_BY_CONSUNTANT",
  REPORT_STATUS_ON_PROGRESS_BY_ADMIN = "REPORT_STATUS_ON_PROGRESS_BY_ADMIN",
  REPORT_STATUS_FINISHED = "REPORT_STATUS_FINISHED",
}

export enum ReportResolution {
  REPORT_RESOLUTION_APPROVED = "REPORT_RESOLUTION_APPROVED",
  REPORT_RESOLUTION_DECLINED = "REPORT_RESOLUTION_DECLINED",
  REPORT_RESOLUTION_ON_PROGRESS_BY_CONSUNTANT = "REPORT_RESOLUTION_ON_PROGRESS_BY_CONSUNTANT",
  REPORT_RESOLUTION_ON_PROGRESS_BY_ADMIN = "REPORT_RESOLUTION_ON_PROGRESS_BY_ADMIN",
}

export const renderReportStatus = (status: ReportStatus) => {
  if (status === ReportStatus.REPORT_STATUS_CREATED) {
    return "Created";
  }
  if (status === ReportStatus.REPORT_STATUS_FINISHED) {
    return "Finished";
  }
  if (status === ReportStatus.REPORT_STATUS_ON_PROGRESS_BY_ADMIN) {
    return "Progress By Admin";
  }
  if (status === ReportStatus.REPORT_STATUS_ON_PROGRESS_BY_CONSUNTANT) {
    return "Progress By Consultant";
  }
};

export const renderReportResolution = (status: ReportResolution) => {
  if (status === ReportResolution.REPORT_RESOLUTION_APPROVED) {
    return "Approved";
  }
  if (status === ReportResolution.REPORT_RESOLUTION_DECLINED) {
    return "Declined";
  }
  if (status === ReportResolution.REPORT_RESOLUTION_ON_PROGRESS_BY_CONSUNTANT) {
    return "Progress by Consultant";
  }
  if (status === ReportResolution.REPORT_RESOLUTION_ON_PROGRESS_BY_ADMIN) {
    return "Progress by Admin";
  }
};
