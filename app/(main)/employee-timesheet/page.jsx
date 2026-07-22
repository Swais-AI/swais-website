"use client";

export default function EmployeeTimesheetPage() {
  const timesheetUrl =
    process.env.NEXT_PUBLIC_EMPLOYEE_TIMESHEET_URL ||
    "http://localhost:2005";

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 80px)",
        overflow: "hidden",
      }}
    >
      <iframe
        src={timesheetUrl}
        title="Employee Timesheet"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="camera; microphone; clipboard-read; clipboard-write"
      />
    </div>
  );
}