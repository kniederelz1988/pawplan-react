import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        "background": {
          "50"  : { value: "#fdfcfb" },
          "100" : { value: "#fdfbfa" },
          "200" : { value: "#fcfaf8" },
          "300" : { value: "#fbf9f6" },
          "400" : { value: "#faf7f4" },
          "500" : { value: "#f9f6f2" },
          "600" : { value: "#decdb7" },
          "700" : { value: "#ba9769" },
          "800" : { value: "#795d38" },
          "900" : { value: "#2b2114" }
        },
        "primary": {
          "50"  : { value: "#ebe5e2" },
          "100" : { value: "#e2dad5" },
          "200" : { value: "#d6cbc5" },
          "300" : { value: "#cabdb4" },
          "400" : { value: "#bfaea3" },
          "500" : { value: "#b6a397" },
          "600" : { value: "#a48d7e" },
          "700" : { value: "#897060" },
          "800" : { value: "#685549" },
          "900" : { value: "#463a31" }
        },
        "secondary": {
          "50"  : { value: "#f4f2ef" },
          "100" : { value: "#f0ece8" },
          "200" : { value: "#eae4df" },
          "300" : { value: "#e4dcd6" },
          "400" : { value: "#ded5cd" },
          "500" : { value: "#d9cfc6" },
          "600" : { value: "#c0afa0" },
          "700" : { value: "#9e856e" },
          "800" : { value: "#6e5b49" },
          "900" : { value: "#3c3128" }
        },
        "accent": {
          "50"  : { value: "#e0d6cf" },
          "100" : { value: "#d2c4bb" },
          "200" : { value: "#c1ad9f" },
          "300" : { value: "#af9584" },
          "400" : { value: "#9d7d69" },
          "500" : { value: "#8a6d5a" },
          "600" : { value: "#79604f" },
          "700" : { value: "#634e41" },
          "800" : { value: "#4d3d32" },
          "900" : { value: "#372c24" }
        }
      },
      /*
      spacing: {
        "1"   : { value: "0.25rem"  },
        "2"   : { value: "0.5rem"   },
        "3"   : { value: "0.75rem"  },
        "4"   : { value: "1rem"     },
        "5"   : { value: "1.25rem"  },
        "6"   : { value: "1.5rem"   },
        "7"   : { value: "1.75rem"  },
        "8"   : { value: "2rem"     },
        "9"   : { value: "2.25rem"  },
        "10"  : { value: "2.5rem"   },
        "12"  : { value: "3rem"     },
        "14"  : { value: "3.5rem"   },
        "16"  : { value: "4rem"     },
        "20"  : { value: "5rem"     },
        "24"  : { value: "6rem"     },
        "28"  : { value: "7rem"     },
        "32"  : { value: "8rem"     },
        "36"  : { value: "9rem"     },
        "40"  : { value: "10rem"    },
        "44"  : { value: "11rem"    },
        "48"  : { value: "12rem"    },
        "52"  : { value: "13rem"    },
        "56"  : { value: "14rem"    },
        "60"  : { value: "15rem"    },
        "64"  : { value: "16rem"    },
        "72"  : { value: "18rem"    },
        "80"  : { value: "20rem"    },
        "96"  : { value: "24rem"    },
        "px"  : { value: "1px"      },
        "0.5" : { value: "0.125rem" },
        "1.5" : { value: "0.375rem" },
        "2.5" : { value: "0.625rem" },
        "3.5" : { value: "0.875rem" },
        "xs"  : { value: "0.75rem"  },
        "sm"  : { value: "0.875rem" },
        "md"  : { value: "1rem"     },
        "lg"  : { value: "1.125rem" },
        "xl"  : { value: "1.25rem"  },
        "2xl" : { value: "1.5rem"   },
        "3xl" : { value: "1.875rem" },
        "4xl" : { value: "2.25rem"  },
        "5xl" : { value: "3rem"     },
        "6xl" : { value: "3.75rem"  },
        "7xl" : { value: "4.5rem"   },
        "8xl" : { value: "6rem"     },
        "9xl" : { value: "8rem"     }
      },
      
      radii: {
        "none"  : { value: "0"        },
        "sm"    : { value: "0.125rem" },
        "base"  : { value: "0.25rem"  },
        "md"    : { value: "0.375rem" },
        "lg"    : { value: "0.5rem"   },
        "xl"    : { value: "0.75rem"  },
        "2xl"   : { value: "1rem"     },
        "3xl"   : { value: "1.5rem"   },
        "full"  : { value: "9999px"   }
      },
      
      shadows: {
        "xs"      : { value: "0 0 0 1px rgba(0, 0, 0, 0.05)" },
        "sm"      : { value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
        "base"    : { value: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" },
        "md"      : { value: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
        "lg"      : { value: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" },
        "xl"      : { value: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
        "2xl"     : { value: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" },
        "outline" : { value: "0 0 0 3px rgba(66, 153, 225, 0.6)" },
        "inner"   : { value: "inset 0 2px 4px 0 rgba(0,0,0,0.06)" },
        "none"    : { value: "none" },
        "dark-lg" : { value: "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px" }
      },
      */
      fonts: {
        "body"    : { value: "DM Sans, sans-serif"    },
        "heading" : { value: "Playfair Display, serif" },
        "mono"    : { value: "Inconsolata"            }
      },
      /*
      fontWeights: {
        "hairline"  : { value: 100  },
        "thin"      : { value: 200  },
        "light"     : { value: 300  },
        "normal"    : { value: 400  },
        "medium"    : { value: 500  },
        "semibold"  : { value: 600  },
        "bold"      : { value: 700  },
        "extrabold" : { value: 800  },
        "black"     : { value: 900  }
      },

      fontSizes: {
        "xs"    : { value: "0.75rem"  },
        "sm"    : { value: "0.875rem" },
        "md"    : { value: "1rem"     },
        "lg"    : { value: "1.125rem" },
        "xl"    : { value: "1.25rem"  },
        "2xl"   : { value: "1.5rem"   },
        "3xl"   : { value: "1.875rem" },
        "4xl"   : { value: "2.25rem"  },
        "5xl"   : { value: "3rem"     },
        "6xl"   : { value: "3.75rem"  }
      }
      */
    },
  
    semanticTokens: {
      colors: {
        accent: { 
          bg: {
            value: {
              _light: "{colors.accent.900}",
              _dark: "{colors.accent.50"
            }
          },
          fg: {
            value: {
              _light: "{colors.accent.50}",
              _dark: "{color.accent.900}"
            }
          }
        },
        softAccent: {
          bg: {
            value: {
              _light: "{colors.accent.600}",
              _dark:  "{colors.accent.400}"
            }
          },
          fg: {
            value: {
              _light: "{colors.accent.800}",
              _dark:  "{color.accent.200}"
            }
          }
        },
        secondary: {
          bg: {
            value: {
              _light: "{colors.secondary.50}",
              _dark:  "{colors.secondary.900}"
            }
          },
          fg: {
            value: {
              _light: "{color.primary.700}",
              _dark:  "{color.primary.300}"
            }
          }
        }
      }
    },
    recipes: {
      button: {
        base: {
          borderRadius: "3xl"
        },
        variants: {
          variant: {
            solid: {
              bg: "accent.bg",
              color: "accent.fg",
              _hover: {
                bg: "accent.bg/90"
              },
              _expanded: {
                bg: "accent.bg/90"
              }
            },
            subtle: {
              bg: "accent.bg/30",
              color: "accent.fg/900",
              _hover: {
                bg: "accent.bg/20"
              }
            }

          }
        }
      },
      input: {
        variants: {
          variant: {
            outline: {
              bg: "background.200",
              color: "secondary.fg",
              fontWeight: "medium"
            }
          }
        }
      },
      textarea: {
        variants: {
          variant: {
            outline: {
              bg: "background.200",
              color: "secondary.fg",
              fontWeight: "medium"
            }
          }
        }
      }
    },
    slotRecipes: {
      dialog: {
        slots: [],
        base: {
          content: {
            bg: "background.300",
            color: "secondary.fg",
            borderRadius: "3xl"
          }
        }
      },
      card: {
        slots: [],
        base: {
          root: {
            borderRadius: "3xl",
          }  
        },
        variants: {
          variant: {
            elevated: {
              root: {
                bg: "secondary.bg",
                color: "secondary.fg"
              }
            },
            outline: {
              root: {
                bg: "secondary.bg",
                color: "secondary.fg",
                borderColor: "accent.fg"
              }
            }
          }
        }  
      },
      radioCard: {
        slots: [],
        base: {
          itemControl: {
            color: "accent.fg",
            bgColor: "accent.bg",
          }
        },
        variants: {
          variant: {
            outline: {
              item: {
                borderWidth: "2px",
                _hover: {
                  bg: "accent.bg/30"
                },
                _checked: {
                  bg: "accent.bg/90",
                  borderColor: "accent.fg"
                }
              },
              itemControl: {
                _hover: {
                  bg: "accent.bg/90",
                },
                _checked: {
                  bg: "accent.bg/90",
                  borderColor: "accent.fg"
                }
              },
              itemIndicator: {
                borderWidth: "2px",
              },
            }
          }
        }
      },
      select: {
        slots: [],
        base: {
          content: {
            bg: "background.200"
          }
        }
      }
    }
  },
  globalCss: {
    html: {
      color: "primary.900",
      bg: "background.500",
      lineHeight: "1.5",
      colorPalette: "gray",
    },
  }
});

export default system;