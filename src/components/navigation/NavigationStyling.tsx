export const NavigationItemStyles = {
    width: "100%",
    height: "auto",

    lineHeight: "unset",

    px: 4,
    py: 2,

    border: 0,
    borderRadius: 32,

    justifyContent: "flex-start",
    fontSize: "small",

    gap: 2,

    "& svg": {
        width: "1em",
        height: "1em",
        fontSize: "inherit",
    },

    bgColor: "accent.bg",
    color: "accent.fg",
            
    _hover: {
        textDecoration: "none",
    },
    _focusVisible: {
        outline: "2px solid",
        outlineColor: "blue.500",
        outlineOffset: "2px",
    },
}