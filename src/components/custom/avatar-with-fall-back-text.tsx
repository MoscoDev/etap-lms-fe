import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type AvatarWithFallBackProps = {
  imageUrl: string;
  fallBackText: string;
};

/**
 * Renders an avatar component with a fallback text.
 *
 * @param {{ imageUrl: string, fallBackText: string }} props
 * @returns {JSX.Element}
 */
export default function AvatarWithFallBack({
  imageUrl,
  fallBackText,
}: AvatarWithFallBackProps): JSX.Element {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} />
      <AvatarFallback>{fallBackText}</AvatarFallback>
    </Avatar>
  );
}
