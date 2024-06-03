import { Button } from "./ui/button";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles: string;
  isLoading: boolean;
  variant: ButtonVariant; // replace with the actual type of variant
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  variant,
}: CustomButtonProps) => {
  return (
    <Button
      onClick={handlePress}
      className={`bg-teal-400 rounded-lg w-full min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      variant={variant}
    >
      <h2
        className={`text-primary font-semibold font-psemibold text-lg ${textStyles}`}
      >
        {title}
      </h2>
    </Button>
  );
};

export default CustomButton;
