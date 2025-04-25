import React from "react";
import { Link } from "next-view-transitions";

function BackHomeButton() {
  return (
    <Link href="/">
      <p className="-mb-6 text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800">
        ← Zurück
      </p>
    </Link>
  );
}

export default BackHomeButton;
