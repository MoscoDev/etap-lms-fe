/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import useSubjects from "./use-subject";
type Props = {};

const SubjectPage = (props: Props) => {
  const { subjects, coursesPerPage, currentPage, setCurrentPage, totalPages } =
    useSubjects();

  const indexOfLastCourse = coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = subjects.slice(indexOfFirstCourse, indexOfLastCourse);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);
  return (
    <section className="py-10 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:gap-12">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Explore Available Subjects
            </h1>
            <p className="text-muted-foreground">
              Find the perfect subject to take your skills to the next level.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {currentCourses.map((course) => (
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
                      <div className="text-primary font-semibold">FREE</div>
                      <Button variant="outline" size="sm">
                        {course.isCompleted ? "Completed" : "Enroll"}
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {currentCourses.length > 0 && (
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => paginate(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubjectPage;
