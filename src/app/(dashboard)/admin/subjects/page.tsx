/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useSubjects, { Subject } from "./use-subject";
import { PlusCircleIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const subjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().url("Invalid URL"),
});
export type CreateSubject = z.infer<typeof subjectSchema>;

const SubjectPage = (props: Props) => {
  const { subjects, coursesPerPage, currentPage, setCurrentPage, totalPages, createSubject } =
    useSubjects();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CreateSubject>({
    resolver: zodResolver(subjectSchema),
  });

  const thumbnailUrl = watch("thumbnail");

  useEffect(() => {
    const validateImageUrl = (url: string) => {
      const img = new Image();
      img.onload = () => setImagePreview(url);
      img.onerror = () => setImagePreview(null);
      img.src = url;
    };

    if (thumbnailUrl) {
      validateImageUrl(thumbnailUrl);
    } else {
      setImagePreview(null);
    }
  }, [thumbnailUrl]);

  const onSubmit = async (data: CreateSubject) => {
    await createSubject(data);
    reset();
  };

  const indexOfLastCourse = coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = subjects.slice(indexOfFirstCourse, indexOfLastCourse);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <section className="py-10 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex gap-4 w-full flex-1 mb-8">
          <AnalyticsCard
            title="Learners Completed Subjects"
            description="Learners Completed Subjects"
            percentage={40}
            value={3000}
          />
          <AnalyticsCard
            title="Learners Completed Topics"
            description="Learners Completed Topics"
            percentage={40}
            value={3000}
          />
        </div>
        <div className="grid gap-8 md:gap-12">
          <div className="flex just gap-2">
            <h1 className="text-xl flex-1 font-bold tracking-tight items-center justify-between">
              All Available Subjects
            </h1>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="flex gap-2 items-center">
                  <PlusCircleIcon />
                  <span>Add new subject</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full max-w-md">
                <SheetHeader>
                  <SheetTitle>Create Subject</SheetTitle>
                  <SheetDescription>
                    Fill out the form to create a new subject.
                  </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="col-span-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter subject name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">
                            {errors.name.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="col-span-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter subject description"
                          className="min-h-[100px]"
                          {...register("description")}
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm">
                            {errors.description.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="col-span-4">
                        <Label htmlFor="thumbnail">Thumbnail URL</Label>
                        <Input
                          id="thumbnail"
                          placeholder="Enter thumbnail image URL"
                          {...register("thumbnail")}
                        />
                        {errors.thumbnail && (
                          <p className="text-red-500 text-sm">
                            {errors.thumbnail.message?.toString()}
                          </p>
                        )}
                        {imagePreview && (
                          <div className="mt-4">
                            <img
                              src={imagePreview}
                              alt="Image Preview"
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button type="submit">Create Subject</Button>
                  </SheetFooter>
                </form>
              </SheetContent>
            </Sheet>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {currentCourses.map((course: Subject) => (
              <div
                key={course.id}
                className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href={`${location.pathname}/${course.id}`}
                  className="block"
                  prefetch={false}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover"
                    style={{ aspectRatio: "400/225", objectFit: "cover" }}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {course.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <Button variant="outline" size="sm">
                        view course
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => paginate(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectPage;

type AnalyticsCardProps = {
  title: string;
  value: number;
  description: string;
  percentage: number;
};

function AnalyticsCard({
  title,
  value,
  description,
  percentage,
}: AnalyticsCardProps): JSX.Element {
  return (
    <Card className="flex-1">
      <CardHeader className="pb-2">
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-4xl">{`${value}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{`+${percentage}% from last week`}</div>
      </CardContent>
      <CardFooter>
        <Progress value={percentage} aria-label={`${percentage}% increase`} />
      </CardFooter>
    </Card>
  );
}
