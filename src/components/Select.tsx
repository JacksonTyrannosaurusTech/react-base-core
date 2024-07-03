import { HTMLAttributes, LegacyRef, ReactNode, forwardRef, useState } from "react";
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import classNames from "classnames";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export type SelectProps = DropdownProps & {
  label?: string,
  labelProps?: HTMLAttributes<HTMLSpanElement>,
  prependItem?: ReactNode,
  appendItem?: ReactNode,
  selectIcon?: ReactNode,
  errorMessage?: string,
}

const Select = forwardRef<HTMLAttributes<Dropdown>, SelectProps>(({
  id,
  className,
  label,
  labelProps,
  prependItem,
  appendItem,
  selectIcon,
  errorMessage,
  onChange,
  ...rest
}, ref) => {
  const [displayValue, setDisplayValue] = useState<string | null>();

  return (
    <label htmlFor={id} {...labelProps} className={classNames("inline-flex flex-col w-full min-w-60", labelProps?.className)}>
      {label && (<span>{label}</span>)}
      <Dropdown value={displayValue} ref={ref as LegacyRef<Dropdown>} id={id} dropdownIcon={
        () => (
          <span className="flex gap-3">
            {appendItem && (
              <span className="flex flex-column items-center justify-center">{appendItem}</span>
            )}
            <span aria-hidden="true">
              {selectIcon || <ChevronDownIcon className="w-6 h-6 text-slate-600" />}
            </span>
          </span>
        )}
        invalid={!!errorMessage}
        pt={{
          panel: "bg-slate-200 rounded-xl",
          header: "rounded-t-xl bg-slate-200",
          filterContainer: "flex flex-row justify-between items-center",
          filterInput: "bg-transparent flex-1 h-12",
          filterIcon: "mx-3",
          item: "p-3 select-none cursor-pointer",
          root: classNames("flex flex-row items-center justify-between w-full outline outline-transparent focus:outline-blue-600 p-3 bg-slate-200 rounded-xl", className),
          wrapper: "bg-slate-200 text-slate-900 rounded-xl w-full h-64 overflow-y-scroll gap-1",
        }}
        onChange={(e) => {
          setDisplayValue(e.value)
          onChange?.(e)
        }}
        {...rest}
      />
      {errorMessage && (
        <div className="text-xs text-red-500">
          <span>{errorMessage}</span>
        </div>
      )}
    </label>
  )
});

export default Select;
