export const CrossIcon: React.FC<IconProps> = ({
    fillColor,
    height = "24px",
    width = "24px",
    isRadioChecked = false,
    className = ""
  }) => {
    return (
      <svg
        className={className}
        width={width}
        height={width}
        viewBox="0 0 24 24"
        fill={fillColor}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill={isRadioChecked ? "white" : "#EE4B2B"}
        />
        <path
          d="M13.0599 12.0004L15.3599 9.70035C15.6499 9.41035 15.6499 8.93035 15.3599 8.64035C15.0699 8.35035 14.5899 8.35035 14.2999 8.64035L11.9999 10.9404L9.69986 8.64035C9.40986 8.35035 8.92986 8.35035 8.63986 8.64035C8.34986 8.93035 8.34986 9.41035 8.63986 9.70035L10.9399 12.0004L8.63986 14.3004C8.34986 14.5904 8.34986 15.0704 8.63986 15.3604C8.78986 15.5104 8.97986 15.5804 9.16986 15.5804C9.35986 15.5804 9.54986 15.5104 9.69986 15.3604L11.9999 13.0604L14.2999 15.3604C14.4499 15.5104 14.6399 15.5804 14.8299 15.5804C15.0199 15.5804 15.2099 15.5104 15.3599 15.3604C15.6499 15.0704 15.6499 14.5904 15.3599 14.3004L13.0599 12.0004Z"
          fill={isRadioChecked ? "#EE4B2B" : "white"}
        />
      </svg>
    );
  };
  