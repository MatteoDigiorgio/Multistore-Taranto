"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectGoogleValue } from "@/slices/googleSlice";

interface GoogleData {
  result?: {
    reviews: [
      {
        rating: number;
        text: string;
        profile_photo_url: string;
        author_name: string;
        relative_time_description: string;
      }
    ];
  };
}

const Stars = ({ starsNumber }: { starsNumber: number }) => {
  const starCount = 5; // Total number of stars

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      if (i < starsNumber) {
        stars.push(
          <Image
            key={i}
            src="/Star.png"
            width={20}
            height={20}
            alt=""
            unoptimized={true}
            className="h-3 w-3 xl:h-5 xl:w-5"
          />
        );
      } else {
        stars.push(
          <Image
            key={i}
            src="/gray_star.png"
            width={20}
            height={20}
            alt=""
            unoptimized={true}
            className="h-3 w-3 xl:h-5 xl:w-5 opacity-50"
          />
        );
      }
    }
    return stars;
  };

  return <div className="flex gap-1">{renderStars()}</div>;
};

function Reviews() {
  const googleData: GoogleData = useSelector(selectGoogleValue);
  const ReviewsData = googleData?.result?.reviews;
  const [currentReview, setCurrentReview] = useState(0);

  const handleNextReview = () => {
    setCurrentReview((prevReview) => {
      const nextReview = prevReview + 1;
      return nextReview >= ReviewsData!.length ? 0 : nextReview;
    });
  };

  const handlePreviousReview = () => {
    setCurrentReview((prevReview) => {
      const previousReview = prevReview - 1;
      return previousReview < 0 ? ReviewsData!.length - 1 : previousReview;
    });
  };

  const review = ReviewsData![currentReview];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 mx-auto my-12 md:my-24 max-w-2xl xl:max-w-7xl gap-14">
      <div className="flex flex-col gap-8 mx-6 xl:mx-0 xl:gap-12 justify-center">
        <Stars starsNumber={review.rating} />
        {/* Testimonial Review */}
        <div>
          <h1 className="font-semibold text-2xl leading-7 xl:text-4xl xl:leading-[44px]">
            {review.text}
          </h1>
        </div>
        {/* Testimonial User */}
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={review.profile_photo_url}
              width={56}
              height={56}
              alt=""
              unoptimized={true}
              className="rounded-full h-9 w-9 xl:h-14 xl:w-14"
            />
            <div className="flex flex-col gap-[2px] xl:gap-1">
              <p className="font-semibold text-base xl:text-lg">
                {review.author_name}
              </p>
              <p className="font-medium text-xs xl:text-base text-gray-500">
                {review.relative_time_description}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-5 xl:gap-8">
            <button
              className="flex rounded-full h-9 w-9 xl:h-14 xl:w-14 justify-center items-center border border-gray-200"
              onClick={handlePreviousReview}
            >
              <Image
                src="/arrow_left.png"
                alt=""
                width={14}
                height={14}
                unoptimized={true}
                className="h-2 w-2 xl:h-4 xl:w-4"
              />
            </button>
            <button
              className="flex rounded-full h-9 w-9 xl:h-14 xl:w-14 justify-center items-center border border-gray-200"
              onClick={handleNextReview}
            >
              <Image
                src="/arrow_right.png"
                alt=""
                width={14}
                height={14}
                unoptimized={true}
                className="h-2 w-2 xl:h-4 xl:w-4"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden xl:flex h-[585px] w-[585px]">
        <Image
          src={review.profile_photo_url}
          alt=""
          width={38}
          height={38}
          unoptimized={true}
          className="w-full rounded-[10px]"
        />
      </div>
    </div>
  );
}

export default Reviews;
