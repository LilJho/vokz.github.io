import { RadioGroup } from '@headlessui/react'

interface IRadioGroupData {
    value?: string
    onChange?: (value: string) => void
    label?: string
    data: string[]
    type?: "option" | "rating"
    readOnly?: boolean
}

const RadioSelectionGroup = ({ readOnly, value, onChange, label = "", data, type = "option" }: IRadioGroupData) => {
    return (
        <RadioGroup disabled={readOnly} value={value} onChange={onChange}>
            <RadioGroup.Label className="sr-only">label</RadioGroup.Label>
            <div className="flex flex-wrap gap-4">
                {data?.map((item) => (
                    <RadioGroup.Option
                        key={item}
                        value={item}
                        className={({ active, checked }) =>
                            `${active
                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-300'
                                : ''
                            }
                  ${checked ? type === "option" ? 'bg-white border border-primary-600 text-primary-600' : "bg-primary-600 border-primary-600 text-white" : 'border bg-white'
                            }
                    relative flex max-w-max cursor-pointer rounded-md h-10 px-3 focus:outline-none ${type === "option" ? "min-w-[120px]" : "min-w-[42px]"}`
                        }
                    >
                        {({ active, checked }) => (
                            <>
                                <div className={`flex w-full items-center ${type === "option" ? "justify-between" : "justify-center"}`}>
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label
                                                as="p"
                                                className={`font-medium  ${checked ? 'text-inherit' : 'text-gray-900'
                                                    }`}
                                            >
                                                {item}
                                            </RadioGroup.Label>
                                        </div>
                                    </div>
                                    {type === "option" && checked && (
                                        <div className="shrink-0 text-primary-600">
                                            <CheckIcon className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}

export default RadioSelectionGroup

function CheckIcon(props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#41614B"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}