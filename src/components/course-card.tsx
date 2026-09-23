import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onUnregister?: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  onUnregister,
}: CourseCardProps) {
  const isEnrolled =
    student.courses?.includes(course.courseId) ?? false;

  const formattedDate = enrolledAt
    ? new Date(enrolledAt).toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base">
            {course.courseTitle}
          </CardTitle>

          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
            {course.instructors.join(", ")}
          </CardDescription>
        </div>

        {isEnrolled ? (
          <Badge className="bg-amber-500 text-white hover:bg-amber-500 dark:bg-purple-600 dark:text-white dark:hover:bg-purple-600">
             ลงทะเบียนแล้ว
          </Badge>
        ) : (
          <Badge className="bg-purple-600 text-white hover:bg-purple-600 dark:bg-amber-500 dark:text-white dark:hover:bg-amber-500">
            เปิดรับ
          </Badge>
        )}
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>

            <p>โปรแกรม: {student.program}</p>

            <p>
              ลงทะเบียนเมื่อ: {formattedDate}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUnregister?.(course.courseId)}
          >
            <Trash2 className="text-red-500" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}