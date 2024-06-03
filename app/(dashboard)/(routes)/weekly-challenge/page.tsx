"use client";
import { getLatestWeeklyChallenge } from "@/lib/appwrite";
import { Models } from "appwrite";
import { CheckCircle, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ChallengeData {
  topic: string;
  description: string;
  // Add any other properties returned by getLatestWeeklyChallenge
}

const WeeklyChallenge = () => {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const latestChallenge: Models.Document =
          await getLatestWeeklyChallenge();
        const { topic, description } = latestChallenge;

        // Create a new ChallengeData object with the extracted data
        const challengeData: ChallengeData = {
          topic,
          description,
          // Add any other properties needed for ChallengeData
        };

        setChallenge(challengeData);
      } catch (error) {
        console.error("Error fetching weekly challenge:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, []);
  return (
    <div className="w-full h-full lg:h-screen md:h-screen px-4 flex flex-col items-center ">
      <div className="w-full max-w-3xl mt-10 bg-slate-900 rounded-lg p-6 shadow-lg">
        <h2 className="text-white text-center text-2xl font-bold">
          Weekly Challenge
        </h2>
        {/* Display the challenge data here */}
        {loading && (
          <div className="w-full flex justify-center items-center mt-5">
            <LoaderCircle className="w-6 h-6 text-teal-300 animate-spin" />
          </div>
        )}
        {challenge && !loading && (
          <>
            <h3 className="font-pregular text-red-300 mt-4 font-bold text-xl bg-black-100 w-full text-center rounded-lg p-2">
              {challenge.topic}
            </h3>
            <p className="font-pregular text-teal-600 text-lg bg-black-100 w-full text-center rounded-lg p-2 mt-2">
              {challenge.description}
            </p>
          </>
        )}
      </div>

      <div className="text-gray-300 mt-8 text-xl w-full max-w-3xl mb-6">
        <ul className="flex flex-col gap-4 p-4 bg-slate-800 rounded-lg shadow-lg">
          <li className="flex items-start list-disc">
            <span>Generate only with AI.</span>
          </li>
          <li className="flex items-start">
            <span>
              By participating in this challenge, you not only get to showcase
              your talent but also have the chance to inspire others and
              potentially catch the eye of fashion brands looking for creative
              talent. Happy creating!
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeeklyChallenge;
