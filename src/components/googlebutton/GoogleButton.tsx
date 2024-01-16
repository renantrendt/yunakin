import GoogleCircleIcon from "@/assets/icons/GoogleIcon";
import React from "react";

interface GoogleButtonProps {
    onClick: () => void;
}

const GoogleButton = ({ onClick }: GoogleButtonProps) => {
    return (
        <button
            className="flex justify-center gap-4 p-3 w-full    border-sleek-gray border-2 rounded-lg bg-primary text-primary-content"
            onClick={onClick}
            type="button"
        >
            <GoogleCircleIcon />
            <p>Sign In with Google </p>
        </button>
    );
};

export default GoogleButton;
