import { useState } from "react";

import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";

import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";

export default function EnrollmentPage() {
  const [student, setStudent] = useState(currentStudent);

  const [enrollmentList, setEnrollmentList] = useState(
    initialEnrollments,
  );

  function handleRegister(
    courseId: string,
    time: string,
  ) {
    const now = new Date();

    const [hours, minutes] = time
      .split(":")
      .map(Number);

    now.setHours(hours, minutes, 0, 0);

    setStudent((prev) => ({
      ...prev,
      courses: [
        ...(prev.courses ?? []),
        courseId,
      ],
    }));

    setEnrollmentList((prev) => [
      ...prev,
      {
        studentId: currentStudent.studentId,
        courseId,
        enrolledAt: now.toISOString(),
      },
    ]);
  }

  function handleUnregister(courseId: string) {
    setStudent((prev) => ({
      ...prev,
      courses: prev.courses?.filter(
        (id) => id !== courseId,
      ),
    }));

    setEnrollmentList((prev) =>
      prev.filter(
        (enrollment) =>
          !(
            enrollment.studentId ===
              currentStudent.studentId &&
            enrollment.courseId === courseId
          ),
      ),
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">
            รายวิชาทั้งหมด
          </h1>

          <p className="text-sm text-muted-foreground">
            {student.firstName} {student.lastName} (
            {student.studentId})
          </p>
        </div>

        <RegisterDialog
          student={student}
          onRegister={handleRegister}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment =
            enrollmentList.find(
              (item) =>
                item.studentId ===
                  student.studentId &&
                item.courseId ===
                  course.courseId,
            );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={student}
              enrolledAt={enrollment?.enrolledAt}
              onUnregister={handleUnregister}
            />
          );
        })}
      </div>
    </div>
  );
}