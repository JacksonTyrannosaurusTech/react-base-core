import { BaseSyntheticEvent, HTMLAttributes, MouseEvent } from "react";
import classNames from "classnames";
import TextInput from "../components/TextInput";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Select from "../components/Select";
import { US_STATE_LIST } from "../constants/usStateList";
import Button from "../components/Button";
import { COUNTRIES_LIST } from "../constants/countryList";
import { MARTIAL_STATUS_LIST } from "../constants/martialStatusList";
import Progress from "../components/Progress";
import { SubmitHandler, useForm } from "react-hook-form";

export type LocationFormFields = {
  address: string,
  unit?: string,
  city: string,
  country: string,
  state: string,
  zipcode: string,
  "martial-status": string,
  "annual-income": string,
}

export type LocationFormProps = Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> & {
  onSkip?: (e?: MouseEvent<HTMLButtonElement>) => void,
  onBack?: (e?: MouseEvent<HTMLButtonElement>) => void,
  onNext?: (data: LocationFormFields, e?: BaseSyntheticEvent<object>) => void,
}

function LocationForm({ className, onBack, onNext, onSkip, ...rest }: LocationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormFields>()

  const onSubmit: SubmitHandler<LocationFormFields> = (data, e) => {
    console.log({ data })
    onNext?.(data, e)
  }

  return (
    <div className={classNames("bg-white border border-slate-200 rounded-3xl w-full p-6 max-w-4xl shadow-sm", className)}>
      <form onSubmit={handleSubmit(onSubmit)} {...rest}>
        <div className="flex flex-col gap-6 ">
          <div>
            <h1 className="font-semibold text-xl">Where are you located?</h1>
          </div>
          <div>
            <Progress length={6} step={4} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Kindly provide us with your current location information so that we can tailor our services or content to better suit your specific geographic context and offer a more personalized experience.</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <TextInput
              {...register("address", {
                required: "Please provide an Address"
              })}
              label="Address"
              placeholder="Enter Address"
              errorMessage={errors.address?.message}
            />
            <TextInput
              {...register("unit")}
              label="Unit Or Apt Number"
              placeholder="Enter Unit or Apt"
              errorMessage={errors.unit?.message}
            />
            <TextInput
              {...register("city", {
                required: "Please provide a City"
              })}
              label="City"
              placeholder="Enter City"
              errorMessage={errors.city?.message}
            />
            <Select
              {...register("country",
                { required: "Please select a Country" })}
              label="Country"
              placeholder="Enter Country"
              options={COUNTRIES_LIST.map(state => ({ label: state, value: state }))}
              selectIcon={<MagnifyingGlassIcon className="w-6 text-slate-600" />}
              errorMessage={errors.country?.message}
              filter
            />
            <Select
              {...register("state", {
                required: "Please select a State"
              })}
              label="State"
              placeholder="Enter State"
              options={US_STATE_LIST.map(state => ({ label: state, value: state }))}
              errorMessage={errors.state?.message}
            />
            <TextInput
              {...register("zipcode", {
                required: "Please provide a Zipcode"
              })}
              placeholder="Enter ZIP Code"
              label="ZIP Code"
              errorMessage={errors.zipcode?.message}
            />
          </div>
          <div>
            <h3 className="text-base font-medium">Additional information</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Select
              {...register("martial-status", {
                required: "Please provide a Martial Status"
              })}
              label="Marital Status"
              placeholder="Select"
              options={MARTIAL_STATUS_LIST.map(state => ({ label: state, value: state }))}
              errorMessage={errors["martial-status"]?.message}
            />
            <TextInput
              {...register("annual-income", {
                required: "Please provide your Annual Income"
              })}
              label="Annual Income (USD)"
              placeholder="Enter Income"
              errorMessage={errors['annual-income']?.message}

            />
          </div>
          <div className="flex justify-between pt-28">
            <div>
              <Button variant="ghost" onClick={onSkip}>Skip Step</Button>
            </div>
            <div className="flex gap-6">
              <Button variant="outline" onClick={onBack}>Back</Button>
              <Button type="submit">Next</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LocationForm;