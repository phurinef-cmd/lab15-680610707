import { useState } from "react";
import type { FormEvent } from "react";
import { Select } from "@base-ui/react/select";
import { UserPlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import type { Course, Student } from "@/lib/types";
import { courses, currentStudent } from "@/lib/mock-data";

type RegisterDialogProps = {
  student: Student;
  onRegister: (courseId: string, time: string) => void;
};

export function RegisterDialog({
  student,
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [enrolledAt, setEnrolledAt] = useState(
    new Date().toTimeString().slice(0, 5),
  );

  const availableCourses = courses.filter(
    (course) => !student.courses?.includes(course.courseId),
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!courseId) return;

    onRegister(courseId, enrolledAt);

    setCourseId("");
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          setEnrolledAt(
            new Date().toTimeString().slice(0, 5),
          );
        }

        if (!value) {
          setCourseId("");
        }
      }}
    >
      <DialogTrigger>
        <Button>
          <UserPlus />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลเพื่อลงทะเบียน
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label>วิชา</Label>

            <Select.Root
              value={courseId}
              onValueChange={(value) =>
                setCourseId(value ?? "")
              }
            >
              <Select.Trigger className="flex h-9 w-full items-center justify-between rounded-md border bg-background px-3 text-sm shadow-xs outline-none">
                <Select.Value placeholder="เลือกวิชา" />
                <Select.Icon>⌄</Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Positioner
                  sideOffset={4}
                  alignItemWithTrigger={false}
                  className="z-[100]"
                >
                  <Select.Popup className="min-w-[var(--anchor-width)] rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                    <Select.List>
                      {availableCourses.map(
                        (course: Course) => (
                          <Select.Item
                            key={course.courseId}
                            value={course.courseId}
                            className="cursor-pointer rounded-sm px-3 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                          >
                            <Select.ItemText>
                              {course.courseId} –{" "}
                              {course.courseTitle}
                            </Select.ItemText>
                          </Select.Item>
                        ),
                      )}
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrolledAt">
              เลือกเวลา
            </Label>

            <Input
              id="enrolledAt"
              type="time"
              value={enrolledAt}
              onChange={(event) =>
                setEnrolledAt(event.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">
              ชื่อ นศ.
            </Label>

            <Input
              id="studentName"
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">
              โปรแกรม
            </Label>

            <Input
              id="program"
              value={currentStudent.program}
              readOnly
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={!courseId}
            >
              <UserPlus />
              ลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}