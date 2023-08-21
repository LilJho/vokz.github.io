import { RadioGroup } from '@headlessui/react'

interface IRadioGroupData {
    value?: string
    onChange?: (value: string) => void
    label?: string
    data: string[]
}

const RadioSelectionGroup = ({ value, onChange, label = "", data }: IRadioGroupData) => {
    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className="sr-only">label</RadioGroup.Label>
            <div className="flex gap-4">
                {data?.map((item) => (
                    <RadioGroup.Option
                        key={item}
                        value={item}
                        className={({ active, checked }) =>
                            `${active
                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary-300'
                                : ''
                            }
                  ${checked ? 'bg-white border border-primary-600 text-white' : 'border bg-white'
                            }
                    relative flex max-w-max cursor-pointer rounded-md h-10 px-3 focus:outline-none min-w-[120px]`
                        }
                    >
                        {({ active, checked }) => (
                            <>
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label
                                                as="p"
                                                className={`font-medium  ${checked ? 'text-primary-600' : 'text-gray-900'
                                                    }`}
                                            >
                                                {item}
                                            </RadioGroup.Label>
                                        </div>
                                    </div>
                                    {checked && (
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