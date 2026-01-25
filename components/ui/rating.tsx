"use client"

import React, { createContext, useContext, useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

// Context
type RatingContextValue = {
    value: number
    hoverValue: number | null
    setHoverValue: (value: number | null) => void
    setValue: (value: number) => void
    max: number
    readOnly: boolean
    disabled: boolean
}

const RatingContext = createContext<RatingContextValue | undefined>(undefined)

function useRatingContext() {
    const context = useContext(RatingContext)
    if (!context) {
        throw new Error("RatingButton must be used within a Rating component")
    }
    return context
}

// Rating Container
interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue?: number
    value?: number
    onValueChange?: (value: number) => void
    max?: number
    readOnly?: boolean
    disabled?: boolean
    name?: string
    required?: boolean
    children: React.ReactNode
}

const RatingProvider = ({
    defaultValue = 0,
    value: controlledValue,
    onValueChange,
    max = 5,
    readOnly = false,
    disabled = false,
    name,
    required,
    className,
    children,
    ...props
}: RatingProps) => {
    const [localValue, setLocalValue] = useState(defaultValue)
    const [hoverValue, setHoverValue] = useState<number | null>(null)

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : localValue

    const setValue = (newValue: number) => {
        if (readOnly || disabled) return
        if (!isControlled) {
            setLocalValue(newValue)
        }
        onValueChange?.(newValue)
    }

    return (
        <RatingContext.Provider
            value={{
                value,
                hoverValue,
                setHoverValue,
                setValue,
                max,
                readOnly,
                disabled,
            }}
        >
            <div
                className={cn("flex items-center gap-1", className)}
                role={readOnly ? "img" : "radiogroup"}
                aria-label={readOnly ? `Rating: ${value} out of ${max}` : "Rate this"}
                aria-disabled={disabled}
                aria-readonly={readOnly}
                dir="rtl" // Force RTL so stars go Right (1) -> Left (5)
                {...props}
            >
                {children}
                {name && (
                    <input
                        type="hidden"
                        name={name}
                        value={value}
                        required={required}
                    />
                )}
            </div>
        </RatingContext.Provider>
    )
}

// Rating wrapper that clones children to inject index
export function Rating(props: RatingProps) {
    const { children, ...rest } = props

    return (
        <RatingProvider {...rest}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement<any>, {
                        value: index + 1,
                    })
                }
                return child
            })}
        </RatingProvider>
    )
}

// Rating Button
interface RatingButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
    value?: number
    size?: number
    icon?: React.ElementType
    filledIcon?: React.ElementType
    emptyIcon?: React.ElementType
}

export const RatingButton = React.forwardRef<
    HTMLButtonElement,
    RatingButtonProps
>(
    (
        {
            value: starValue = 1,
            size = 24,
            className,
            icon: Icon = Star,
            filledIcon: FilledIcon = Star,
            emptyIcon: EmptyIcon = Star,
            ...props
        },
        ref
    ) => {
        const { value, hoverValue, setHoverValue, setValue, readOnly, disabled } =
            useRatingContext()

        const effectiveValue = hoverValue !== null ? hoverValue : value
        const isFilled = effectiveValue >= starValue

        const CurrentIcon = isFilled ? FilledIcon : EmptyIcon

        return (
            <button
                ref={ref}
                type="button"
                role="radio"
                aria-checked={value === starValue}
                aria-label={`${starValue} stars`}
                disabled={disabled || readOnly}
                className={cn(
                    "transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    readOnly && "cursor-default",
                    !readOnly && "cursor-pointer hover:scale-110",
                    // Apply color to the button text - using a deeper Metallic Gold color
                    isFilled ? "text-[#FFD700]" : "text-muted-foreground",
                    className
                )}
                onMouseEnter={() => !readOnly && !disabled && setHoverValue(starValue)}
                onMouseLeave={() => !readOnly && !disabled && setHoverValue(null)}
                onClick={() => setValue(starValue)}
                {...props}
            >
                <CurrentIcon
                    size={size}
                    className={cn(
                        "transition-colors duration-200",
                        // Icon uses current text color for fill and stroke
                        isFilled ? "fill-current" : "fill-transparent"
                    )}
                    strokeWidth={isFilled ? 0 : 2}
                />
            </button>
        )
    }
)
RatingButton.displayName = "RatingButton"
