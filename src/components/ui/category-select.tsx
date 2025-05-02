"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { useClickAway } from "@/lib/hooks";

interface CategorySelectOption {
  value: string;
  label: string | React.ReactNode;
}

interface CategorySelectProps {
  options: CategorySelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CategorySelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  disabled = false,
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: CategorySelectOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  useClickAway(ref, () => setIsOpen(false));

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={toggleDropdown}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors",
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-accent/10",
          isOpen && "ring-1 ring-ring"
        )}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-input bg-popover shadow-md">
          <div role="listbox" className="p-1">
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                  value === option.value
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50 hover:text-accent-foreground"
                )}
                onClick={() => handleSelect(option)}
              >
                <span>{option.label}</span>
                {value === option.value && <Check className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
